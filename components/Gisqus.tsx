import React from "react";
import Giscus from "@giscus/react";

export default function Gisqus() {
  return (
    <div className="mt-20">
      <Giscus
        repo="ondrejvelisek/ondrejvelisek.github.io"
        repoId="R_kgDOLX0ymw"
        category="General"
        categoryId="DIC_kwDOLX0ym84CdyZe"
        mapping="title"
        strict="0"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="bottom"
        theme="transparent_dark"
        lang="en"
        loading="eager"
      />
    </div>
  );
}
