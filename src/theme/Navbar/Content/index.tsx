import React, { type ReactNode } from "react";
import Content from "@theme-original/Navbar/Content";
import type ContentType from "@theme/Navbar/Content";
import type { WrapperProps } from "@docusaurus/types";
import aboutAvatarUrl from "./about_avatar.webp";

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): ReactNode {
  return (
    <>
      <Content {...props} />
      <a href="/about" className="block">
        <img
          src={aboutAvatarUrl}
          alt="Photo of Ondrej Velisek which leads to about page"
          className="size-11 min-w-11 min-h-11 border border-solid border-white hover:border-[var(--ifm-link-color)] transition-colors rounded-full"
        />
      </a>
    </>
  );
}
