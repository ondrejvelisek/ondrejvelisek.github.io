import React, { useEffect, useRef } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";

type CaptionTrack = { languageCode?: string; [key: string]: unknown };

type Player = {
  getPlayerState(): number;
  /** Names of the loaded player modules that expose options. */
  getOptions(): string[];
  getOption(
    module: "captions",
    option: "tracklist" | "translationLanguages",
  ): CaptionTrack[] | undefined;
  setOption(module: "captions", option: "track", value: CaptionTrack): void;
  destroy(): void;
};

const PLAYING = 1;

type PlayerEvent = { target: Player };

type YouTubeApi = {
  Player: new (
    element: HTMLElement,
    options: {
      events?: {
        onReady?: (event: PlayerEvent) => void;
        onApiChange?: (event: PlayerEvent) => void;
        onStateChange?: (event: PlayerEvent) => void;
      };
    },
  ) => Player;
};

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const API_SRC = "https://www.youtube.com/iframe_api";

let apiPromise: Promise<YouTubeApi> | undefined;

/** Loads the YouTube IFrame API once per page, however many players ask for it. */
function loadYouTubeApi(): Promise<YouTubeApi> {
  apiPromise ??= new Promise<YouTubeApi>((resolve, reject) => {
    // Already loaded by someone else and `onYouTubeIframeAPIReady` already fired.
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve(window.YT!);
    };
    if (!document.querySelector(`script[src="${API_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = API_SRC;
      script.async = true;
      script.onerror = () => {
        apiPromise = undefined;
        reject(new Error("YouTube IFrame API failed to load"));
      };
      document.head.appendChild(script);
    }
  });
  return apiPromise;
}

/** Browser only: the embed has to be told which origin it talks to. */
function embedUrl(videoId: string, captionLang: string): string {
  const params = new URLSearchParams({
    enablejsapi: "1",
    origin: window.location.origin,
    cc_load_policy: "1",
    cc_lang_pref: captionLang,
    hl: captionLang,
    rel: "0",
    playsinline: "1",
  });
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${params}`;
}

function isLanguage(track: CaptionTrack, lang: string): boolean {
  return (
    track.languageCode === lang ||
    track.languageCode?.startsWith(`${lang}-`) === true
  );
}

/**
 * Undocumented YouTube behaviour: ask the captions module to auto-translate
 * the source-language track. May throw or silently stop working whenever
 * YouTube changes the player.
 */
function showTranslatedCaptions(
  player: Player,
  sourceLang: string,
  targetLang: string,
): void {
  // YouTube reports an empty track list even for videos that have captions
  // (seen with auto-generated ones), so the list only refines the request.
  const tracks = player.getOption("captions", "tracklist") ?? [];
  const targetTrack = tracks.find((track) => isLanguage(track, targetLang));
  if (targetTrack) {
    // A real track in the target language beats a machine translation.
    player.setOption("captions", "track", targetTrack);
    return;
  }
  const sourceTrack = tracks.find((track) => isLanguage(track, sourceLang)) ?? {
    languageCode: sourceLang,
  };
  // The player prints the name in a "Czech >> English" notice, and prints
  // "undefined" when the name is missing.
  const translationLanguage = (
    player.getOption("captions", "translationLanguages") ?? []
  ).find((language) => isLanguage(language, targetLang)) ?? {
    languageCode: targetLang,
    languageName: languageName(targetLang),
  };
  player.setOption("captions", "track", { ...sourceTrack, translationLanguage });
}

function languageName(code: string): string {
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(code) ?? code;
  } catch {
    return code;
  }
}

type YouTubeTranslatedProps = {
  /** YouTube video ID, the `v` parameter of the watch URL. */
  videoId: string;
  /** Accessible title of the player. */
  title: string;
  /** Language the video is spoken (and captioned) in. */
  sourceLang?: string;
  /** Language the captions are shown in. */
  targetLang?: string;
};

export default function YouTubeTranslated({
  videoId,
  title,
  sourceLang = "cs",
  targetLang = "en",
}: YouTubeTranslatedProps) {
  // The embed URL carries the page origin, so there is no iframe in the
  // server-rendered HTML; the 16:9 box below reserves its space.
  const isBrowser = useIsBrowser();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | undefined>(undefined);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) {
      return;
    }

    let cancelled = false;
    // True from the moment the captions module (re)loads until the translation
    // has been requested during playback, the only moment it is known to
    // stick. After that the viewer's own caption choice is left alone.
    let pending = false;
    const translate = ({ target }: PlayerEvent) => {
      if (!pending) {
        return;
      }
      try {
        if (!target.getOptions().includes("captions")) {
          return;
        }
        showTranslatedCaptions(target, sourceLang, targetLang);
        if (target.getPlayerState() === PLAYING) {
          pending = false;
        }
      } catch {
        // Leave whatever captions YouTube picked by itself.
      }
    };

    loadYouTubeApi().then(
      (api) => {
        if (cancelled) {
          return;
        }
        playerRef.current = new api.Player(iframe, {
          events: {
            // Fires when a player module loads; captions load as playback starts.
            onApiChange: (event) => {
              pending = true;
              translate(event);
            },
            onStateChange: translate,
          },
        });
      },
      () => {
        // API blocked or offline: the plain embed keeps working.
      },
    );

    return () => {
      cancelled = true;
      try {
        // destroy() also removes the iframe from the page. That is fine here:
        // an effect cleanup runs after React has removed the iframe itself.
        playerRef.current?.destroy();
      } catch {
        // The player is unreachable either way.
      }
      playerRef.current = undefined;
    };
  }, [isBrowser, videoId, sourceLang, targetLang]);

  return (
    <figure className="mx-0 my-8">
      {/* A subtitle overlay (own .vtt synced through playerRef) would be a sibling of the iframe. */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
        {isBrowser && (
          <iframe
            // The API cannot attach to the same iframe twice, so every change
            // of the effect's inputs has to bring a new iframe.
            key={`${videoId} ${sourceLang} ${targetLang}`}
            ref={iframeRef}
            src={embedUrl(videoId, targetLang)}
            title={title}
            // YouTube answers a missing Referer with error 153.
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="block h-full w-full border-0"
          />
        )}
      </div>
      <figcaption className="mt-3 text-center text-sm text-[var(--ifm-color-emphasis-700)]">
        Talk is in {languageName(sourceLang)}; {languageName(targetLang)}{" "}
        subtitles available.{" "}
        <a
          href={`https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube
        </a>
      </figcaption>
    </figure>
  );
}
