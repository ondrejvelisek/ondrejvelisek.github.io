import React, { type ReactNode } from "react";
import BlogPostPage from "@theme-original/BlogPostPage";
import type BlogPostPageType from "@theme/BlogPostPage";
import type { WrapperProps } from "@docusaurus/types";
import Head from "@docusaurus/Head";

type Props = WrapperProps<typeof BlogPostPageType>;

// Docusaurus sets og:image from the post's `image` front matter but no alt text.
// The post title is a fitting alt: the social images show the article's subject.
export default function BlogPostPageWrapper(props: Props): ReactNode {
  const { assets, frontMatter, metadata } = props.content;
  const hasImage = Boolean(assets.image ?? frontMatter.image);
  return (
    <>
      <BlogPostPage {...props} />
      {hasImage && (
        <Head>
          <meta property="og:image:alt" content={metadata.title} />
          <meta name="twitter:image:alt" content={metadata.title} />
        </Head>
      )}
    </>
  );
}
