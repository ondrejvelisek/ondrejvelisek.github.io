"use strict";(self.webpackChunk_torrta_docs=self.webpackChunk_torrta_docs||[]).push([[478],{5760:(e,t,s)=>{s.d(t,{c:()=>f});var r=s(5668),a=s(5200),n=s(1648),l=s(776),i=s(2984),o=s(5976),c=s(7672),m=s(1144);function d(e){const{pathname:t}=(0,c.IT)();return(0,r.useMemo)((()=>e.filter((e=>function(e,t){return!(e.unlisted&&!(0,m.Sc)(e.permalink,t))}(e,t)))),[e,t])}const u={sidebar:"sidebar_RYHo",sidebarItemTitle:"sidebarItemTitle_sRjx",sidebarItemList:"sidebarItemList_uMtB",sidebarItem:"sidebarItem_rygH",sidebarItemLink:"sidebarItemLink_EKgd",sidebarItemLinkActive:"sidebarItemLinkActive_hRXJ"};var h=s(7e3);function g(e){let{sidebar:t}=e;const s=d(t.items);return(0,h.jsx)("aside",{className:"col col--3",children:(0,h.jsxs)("nav",{className:(0,a.c)(u.sidebar,"thin-scrollbar"),"aria-label":(0,o.G)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"}),children:[(0,h.jsx)("div",{className:(0,a.c)(u.sidebarItemTitle,"margin-bottom--md"),children:t.title}),(0,h.jsx)("ul",{className:(0,a.c)(u.sidebarItemList,"clean-list"),children:s.map((e=>(0,h.jsx)("li",{className:u.sidebarItem,children:(0,h.jsx)(i.c,{isNavLink:!0,to:e.permalink,className:u.sidebarItemLink,activeClassName:u.sidebarItemLinkActive,children:e.title})},e.permalink)))})]})})}var p=s(5240);function x(e){let{sidebar:t}=e;const s=d(t.items);return(0,h.jsx)("ul",{className:"menu__list",children:s.map((e=>(0,h.jsx)("li",{className:"menu__list-item",children:(0,h.jsx)(i.c,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active",children:e.title})},e.permalink)))})}function j(e){return(0,h.jsx)(p.Mx,{component:x,props:e})}function b(e){let{sidebar:t}=e;const s=(0,l.U)();return t?.items.length?"mobile"===s?(0,h.jsx)(j,{sidebar:t}):(0,h.jsx)(g,{sidebar:t}):null}function f(e){const{sidebar:t,toc:s,children:r,...l}=e,i=t&&t.items.length>0;return(0,h.jsx)(n.c,{...l,children:(0,h.jsx)("div",{className:"container margin-vert--lg",children:(0,h.jsxs)("div",{className:"row",children:[(0,h.jsx)(b,{sidebar:t}),(0,h.jsx)("main",{className:(0,a.c)("col",{"col--7":i,"col--9 col--offset-1":!i}),itemScope:!0,itemType:"https://schema.org/Blog",children:r}),s&&(0,h.jsx)("div",{className:"col col--2",children:s})]})})})}},8252:(e,t,s)=>{s.d(t,{c:()=>D});var r=s(5668),a=s(5200),n=s(520),l=s(7512),i=s(7e3);function o(e){let{children:t,className:s}=e;const{frontMatter:r,assets:a,metadata:{description:o}}=(0,n.g)(),{withBaseUrl:c}=(0,l.E)(),m=a.image??r.image,d=r.keywords??[];return(0,i.jsxs)("article",{className:s,itemProp:"blogPost",itemScope:!0,itemType:"https://schema.org/BlogPosting",children:[o&&(0,i.jsx)("meta",{itemProp:"description",content:o}),m&&(0,i.jsx)("link",{itemProp:"image",href:c(m,{absolute:!0})}),d.length>0&&(0,i.jsx)("meta",{itemProp:"keywords",content:d.join(",")}),t]})}var c=s(2984);const m={title:"title_cIQJ"};function d(e){let{className:t}=e;const{metadata:s,isBlogPostPage:r}=(0,n.g)(),{permalink:l,title:o}=s,d=r?"h1":"h2";return(0,i.jsx)(d,{className:(0,a.c)(m.title,t),itemProp:"headline",children:r?o:(0,i.jsx)(c.c,{itemProp:"url",to:l,children:o})})}var u=s(5976),h=s(5052);const g=["zero","one","two","few","many","other"];function p(e){return g.filter((t=>e.includes(t)))}const x={locale:"en",pluralForms:p(["one","other"]),select:e=>1===e?"one":"other"};function j(){const{i18n:{currentLocale:e}}=(0,h.c)();return(0,r.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:p(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),x}}),[e])}function b(){const e=j();return{selectMessage:(t,s)=>function(e,t,s){const r=e.split("|");if(1===r.length)return r[0];r.length>s.pluralForms.length&&console.error(`For locale=${s.locale}, a maximum of ${s.pluralForms.length} plural forms are expected (${s.pluralForms.join(",")}), but the message contains ${r.length}: ${e}`);const a=s.select(t),n=s.pluralForms.indexOf(a);return r[Math.min(n,r.length-1)]}(s,t,e)}}const f={container:"container_PuMg"};function v(e){let{readingTime:t}=e;const s=function(){const{selectMessage:e}=b();return t=>{const s=Math.ceil(t);return e(s,(0,u.G)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:s}))}}();return(0,i.jsx)(i.Fragment,{children:s(t)})}function P(e){let{date:t,formattedDate:s}=e;return(0,i.jsx)("time",{dateTime:t,itemProp:"datePublished",children:s})}function N(){return(0,i.jsx)(i.Fragment,{children:" \xb7 "})}function _(e){let{className:t}=e;const{metadata:s}=(0,n.g)(),{date:r,formattedDate:l,readingTime:o}=s;return(0,i.jsxs)("div",{className:(0,a.c)(f.container,"margin-vert--md",t),children:[(0,i.jsx)(P,{date:r,formattedDate:l}),void 0!==o&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(N,{}),(0,i.jsx)(v,{readingTime:o})]})]})}function k(e){return e.href?(0,i.jsx)(c.c,{...e}):(0,i.jsx)(i.Fragment,{children:e.children})}function I(e){let{author:t,className:s}=e;const{name:r,title:n,url:l,imageURL:o,email:c}=t,m=l||c&&`mailto:${c}`||void 0;return(0,i.jsxs)("div",{className:(0,a.c)("avatar margin-bottom--sm",s),children:[o&&(0,i.jsx)(k,{href:m,className:"avatar__photo-link",children:(0,i.jsx)("img",{className:"avatar__photo",src:o,alt:r,itemProp:"image"})}),r&&(0,i.jsxs)("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person",children:[(0,i.jsx)("div",{className:"avatar__name",children:(0,i.jsx)(k,{href:m,itemProp:"url",children:(0,i.jsx)("span",{itemProp:"name",children:r})})}),n&&(0,i.jsx)("small",{className:"avatar__subtitle",itemProp:"description",children:n})]})]})}const w={authorCol:"authorCol_q_iI",imageOnlyAuthorRow:"imageOnlyAuthorRow_les7",imageOnlyAuthorCol:"imageOnlyAuthorCol_uMKf"};function T(e){let{className:t}=e;const{metadata:{authors:s},assets:r}=(0,n.g)();if(0===s.length)return null;const l=s.every((e=>{let{name:t}=e;return!t}));return(0,i.jsx)("div",{className:(0,a.c)("margin-top--md margin-bottom--sm",l?w.imageOnlyAuthorRow:"row",t),children:s.map(((e,t)=>(0,i.jsx)("div",{className:(0,a.c)(!l&&"col col--6",l?w.imageOnlyAuthorCol:w.authorCol),children:(0,i.jsx)(I,{author:{...e,imageURL:r.authorsImageUrls[t]??e.imageURL}})},t)))})}function M(){return(0,i.jsxs)("header",{children:[(0,i.jsx)(d,{}),(0,i.jsx)(_,{}),(0,i.jsx)(T,{})]})}var y=s(9624),F=s(7748);function L(e){let{children:t,className:s}=e;const{isBlogPostPage:r}=(0,n.g)();return(0,i.jsx)("div",{id:r?y.blogPostContainerID:void 0,className:(0,a.c)("markdown",s),itemProp:"articleBody",children:(0,i.jsx)(F.c,{children:t})})}var A=s(2584),B=s(9324);function R(){return(0,i.jsx)("b",{children:(0,i.jsx)(u.c,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts",children:"Read More"})})}function C(e){const{blogPostTitle:t,...s}=e;return(0,i.jsx)(c.c,{"aria-label":(0,u.G)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t}),...s,children:(0,i.jsx)(R,{})})}const O={blogPostFooterDetailsFull:"blogPostFooterDetailsFull_bikM"};function U(){const{metadata:e,isBlogPostPage:t}=(0,n.g)(),{tags:s,title:r,editUrl:l,hasTruncateMarker:o}=e,c=!t&&o,m=s.length>0;return m||c||l?(0,i.jsxs)("footer",{className:(0,a.c)("row docusaurus-mt-lg",t&&O.blogPostFooterDetailsFull),children:[m&&(0,i.jsx)("div",{className:(0,a.c)("col",{"col--9":c}),children:(0,i.jsx)(B.c,{tags:s})}),t&&l&&(0,i.jsx)("div",{className:"col margin-top--sm",children:(0,i.jsx)(A.c,{editUrl:l})}),c&&(0,i.jsx)("div",{className:(0,a.c)("col text--right",{"col--3":m}),children:(0,i.jsx)(C,{blogPostTitle:r,to:e.permalink})})]}):null}function D(e){let{children:t,className:s}=e;const r=function(){const{isBlogPostPage:e}=(0,n.g)();return e?void 0:"margin-bottom--xl"}();return(0,i.jsxs)(o,{className:(0,a.c)(r,s),children:[(0,i.jsx)(M,{}),(0,i.jsx)(L,{children:t}),(0,i.jsx)(U,{})]})}},520:(e,t,s)=>{s.d(t,{E:()=>i,g:()=>o});var r=s(5668),a=s(3280),n=s(7e3);const l=r.createContext(null);function i(e){let{children:t,content:s,isBlogPostPage:a=!1}=e;const i=function(e){let{content:t,isBlogPostPage:s}=e;return(0,r.useMemo)((()=>({metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:s})),[t,s])}({content:s,isBlogPostPage:a});return(0,n.jsx)(l.Provider,{value:i,children:t})}function o(){const e=(0,r.useContext)(l);if(null===e)throw new a.AH("BlogPostProvider");return e}}}]);