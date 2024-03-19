import React from "react"
import Giscus from "@giscus/react";

export default function GiscusComponent() {
    return (
      <Giscus
        repo="ondrejvelisek/ondrejvelisek.github.io"
        repoId="R_kgDOLX0ymw"
        category="General"
        categoryId="DIC_kwDOLX0ym84CdyZe"  
        mapping="title"
        strict="0"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="top"
        theme="transparent_dark"
        lang="en"
        loading="lazy"
      />
    );
  }