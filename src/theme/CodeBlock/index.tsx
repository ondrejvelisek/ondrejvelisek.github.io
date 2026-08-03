import React, { type ReactNode } from "react";
import CodeBlock from "@theme-original/CodeBlock";
import type CodeBlockType from "@theme/CodeBlock";
import type { WrapperProps } from "@docusaurus/types";
import clsx from "clsx";

type Props = WrapperProps<typeof CodeBlockType>;

// Custom metastring flags, e.g. ```tsx noBottomMargin dont
// Class flags map to a global class defined in global.css
const CLASS_FLAGS = {
  noBottomMargin: "!mb-px",
} as const;

// Badge flags render an icon in the bottom right corner of the block
const BADGE_FLAGS = {
  do: {
    icon: "✓",
    text: "DO",
    cls: "bg-[rgba(0,255,0,0.15)] text-[rgba(200,255,150,0.65)]",
  },
  dont: {
    icon: "✗",
    text: "DON'T",
    cls: "bg-[rgba(255,50,0,0.2)] text-[rgba(255,170,150,0.8)]",
  },
} as const;

const hasFlag = (metastring: string, flag: string) =>
  new RegExp(`(^|\\s)${flag}(\\s|$)`).test(metastring);

const stripFlags = (metastring: string, flags: string[]) =>
  flags
    .reduce(
      (meta, flag) => meta.replace(new RegExp(`(^|\\s)${flag}(?=\\s|$)`), " "),
      metastring,
    )
    .trim();

export default function CodeBlockWrapper(props: Props): ReactNode {
  const { metastring = "", className } = props;

  const classFlags = Object.keys(CLASS_FLAGS).filter((flag) =>
    hasFlag(metastring, flag),
  ) as (keyof typeof CLASS_FLAGS)[];

  const badgeFlag = (
    Object.keys(BADGE_FLAGS) as (keyof typeof BADGE_FLAGS)[]
  ).find((flag) => hasFlag(metastring, flag));

  if (classFlags.length === 0 && !badgeFlag) {
    return <CodeBlock {...props} />;
  }

  const block = (
    // Strip our flags so the original CodeBlock never sees them
    <CodeBlock
      {...props}
      metastring={stripFlags(metastring, [
        ...classFlags,
        ...(badgeFlag ? [badgeFlag] : []),
      ])}
      className={clsx(className, ...classFlags.map((f) => CLASS_FLAGS[f]))}
    />
  );

  if (!badgeFlag) {
    return block;
  }

  const badge = BADGE_FLAGS[badgeFlag];

  return (
    <div className="relative">
      {block}
      <span
        className={`absolute bottom-2 right-2 z-10 flex items-center gap-1 rounded px-2 py-1 text-xs font-bold tracking-wide leading-none select-none pointer-events-none ${badge.cls}`}
      >
        <span aria-hidden="true">{badge.icon}</span>
        {badge.text}
      </span>
    </div>
  );
}
