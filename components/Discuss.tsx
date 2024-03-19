import React from "react"
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faRedditAlien, faGithub, faDev, faMedium } from '@fortawesome/free-brands-svg-icons'
import { IconProp } from "@fortawesome/fontawesome-svg-core";


type DiscussLinkProps = {
  icon?: IconProp;
  href?: string;
}

function DiscussLink({ icon, href }: DiscussLinkProps) {
  if (!href) {
    return;
  }
  return (
    <a href={href} className="hover:no-underline px-4 py-3 border-solid border rounded border-zinc-700 text-white">
      Discuss on <Icon icon={icon} />
    </a>
  );
}

type DiscussProps = {
  twitter?: string;
  reddit?: string;
  github?: string;
  dev?: string;
  medium?: string;
}

export default function Discuss({ twitter, reddit, github, medium, dev }: DiscussProps) {
  return (
    <div className="flex gap-2 w-full flex-wrap my-8">
      <DiscussLink href={twitter} icon={faXTwitter}/>
      <DiscussLink href={reddit} icon={faRedditAlien}/>
      <DiscussLink href={github} icon={faGithub}/>
      <DiscussLink href={medium} icon={faMedium}/>
      <DiscussLink href={dev} icon={faDev}/>
    </div>
  );
}
