"use strict";(self.webpackChunk_torrta_docs=self.webpackChunk_torrta_docs||[]).push([[204],{6990:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var s=t(5893),o=t(1151);const i={slug:"conceptual-model-of-react-and-rsc",draft:!1},r="Conceptual Model of React and RSC",a={permalink:"/conceptual-model-of-react-and-rsc",source:"@site/blog/2024-03-03-conceptual-model-of-react-and-rsc/index.md",title:"Conceptual Model of React and RSC",description:"Building web apps is a complex problem. We need simple high-level mental structures to support such a heavy load.",date:"2024-03-03T00:00:00.000Z",formattedDate:"March 3, 2024",tags:[],readingTime:8.88,hasTruncateMarker:!0,authors:[],frontMatter:{slug:"conceptual-model-of-react-and-rsc",draft:!1},unlisted:!1,nextItem:{title:"Practical limits of React hooks - Recursion",permalink:"/practical-limits-of-react-hooks-recursion"}},c={authorsImageUrls:[]},l=[{value:"What is <code>state</code>?",id:"what-is-state",level:2},{value:"What is <code>UI</code>?",id:"what-is-ui",level:2},{value:"What the f* is <em><code>f</code></em>?",id:"what-the-f-is-f",level:2},{value:"Connecting States",id:"connecting-states",level:2},{value:"Developer Experience",id:"developer-experience",level:2}];function d(e){const n={a:"a",code:"code",em:"em",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["Building web apps is a complex problem. We need simple high-level mental structures to support such a heavy load.\nThese structures allow us to offload unnecessary details from our brains, so we can focus on the important parts of our code.\n",(0,s.jsx)(n.code,{children:"UI = f(state)"})," is one of them. Every one of us knows this formula. But do you know what it reflects in the real world?\nWhat is ",(0,s.jsx)(n.code,{children:"UI"}),"? What is ",(0,s.jsx)(n.code,{children:"state"}),"? What the f* is ",(0,s.jsx)(n.em,{children:(0,s.jsx)(n.code,{children:"f"})}),"? And how is it affected by RSC (React Server Components)? Here is my view."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Holistic state philosophy",src:t(7463).Z+"",width:"1791",height:"820"})}),"\n",(0,s.jsx)(n.p,{children:"Initial clarifications:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"I reckon the state mutates, but I ignore how it is mutated."}),"\n",(0,s.jsx)(n.li,{children:"I show examples of React, but most of the following applies to other UI frameworks like Angular, Vue, Svelte, Qwik, or Solid."}),"\n"]}),"\n",(0,s.jsxs)(n.h2,{id:"what-is-state",children:["What is ",(0,s.jsx)(n.code,{children:"state"}),"?"]}),"\n",(0,s.jsxs)(n.p,{children:["Let's reconsider: ",(0,s.jsx)(n.code,{children:"UI = f(state)"}),". In other words, ",(0,s.jsx)(n.code,{children:"state"})," is what our ",(0,s.jsx)(n.code,{children:"UI"})," depends on. If a dependency changes, we want to change the ",(0,s.jsx)(n.code,{children:"UI"}),". This phenomenon is called ",(0,s.jsx)(n.strong,{children:"reactivity"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["I believe that state encompasses more than just in-memory local component state (",(0,s.jsx)(n.code,{children:"useState"}),") or in-memory global app state (Redux, Jotai, Zustand).\nI'm not alone (\n",(0,s.jsx)(n.a,{href:"https://tkdodo.eu/blog/react-query-as-a-state-manager",children:"TkDodo"}),",\n",(0,s.jsx)(n.a,{href:"https://www.youtube.com/watch?v=ukpgxEemXsk",children:"ByteGrad (YouTube)"}),",\n",(0,s.jsx)(n.a,{href:"https://x.com/kentcdodds/status/1349173470567964673",children:"Kent C. Dodds"}),",\n",(0,s.jsx)(n.a,{href:"https://daverupert.com/2024/02/ui-states/",children:"Dave Rupert"}),",\n",(0,s.jsx)(n.a,{href:"https://overreacted.io/the-two-reacts/",children:"Dan Abramov"}),"\n). Many developers agree that at least the URL and server data constitute some kind of state too. But I believe it has a much wider scope."]}),"\n",(0,s.jsxs)(n.p,{children:["Let's consider some ",(0,s.jsx)(n.code,{children:"UI"})," examples:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Blog post UI depends on the slug present in the ",(0,s.jsx)(n.strong,{children:"URL"})," address."]}),"\n",(0,s.jsxs)(n.li,{children:["Server files explorer UI depends on ",(0,s.jsx)(n.strong,{children:"server"})," files."]}),"\n",(0,s.jsxs)(n.li,{children:["The newest movies list UI relies on the ",(0,s.jsx)(n.strong,{children:"third-party"})," resource of OMDB."]}),"\n",(0,s.jsxs)(n.li,{children:["Ticking clock UI depends on ",(0,s.jsx)(n.strong,{children:"time"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Drawing canvas UI relies on the mouse position of the user's ",(0,s.jsx)(n.strong,{children:"input device"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["User profile UI depends on the session token stored in a ",(0,s.jsx)(n.strong,{children:"cookie"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:['The "Keep me signed in on this device" UI depends on a flag in ',(0,s.jsx)(n.strong,{children:"local storage"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["OS preferred dark mode UI depends on the ",(0,s.jsx)(n.strong,{children:"OS setting"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Devtools debug UI depends on an ",(0,s.jsx)(n.strong,{children:"env variable"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Panoramic background UI depends on the scroll position of a ",(0,s.jsx)(n.strong,{children:"DOM"})," element."]}),"\n",(0,s.jsx)(n.li,{children:"... Got the idea?"}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["I refer to these states as ",(0,s.jsx)(n.strong,{children:"source states"}),". It's important to note that a state may be ",(0,s.jsx)(n.em,{children:"derived"}),". For example:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["The current post ",(0,s.jsx)(n.em,{children:"slug"})," depends on the ",(0,s.jsx)(n.strong,{children:"URL"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["The current post ",(0,s.jsx)(n.em,{children:"minutes read"})," depends on the ",(0,s.jsx)(n.em,{children:"slug"})," and ",(0,s.jsx)(n.strong,{children:"server files"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["The current ",(0,s.jsx)(n.em,{children:"user role"})," depends on authorization data in the ",(0,s.jsx)(n.strong,{children:"server database"})," and the session token from the ",(0,s.jsx)(n.strong,{children:"cookie"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.em,{children:"preferred dark mode"})," depends on ",(0,s.jsx)(n.strong,{children:"local storage"})," and the ",(0,s.jsx)(n.strong,{children:"OS setting"})," (storage as user preference and OS as default)."]}),"\n",(0,s.jsxs)(n.li,{children:["The minutes value in a pausable stopwatch depends on ",(0,s.jsx)(n.strong,{children:"time"})," and the spacebar ",(0,s.jsx)(n.strong,{children:"pressed key"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"... Ok. You got it."}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Derived state depends on another state and should change when its dependencies change. In other words, it should be reactive. You can find a great deep-dive into this topic on ",(0,s.jsx)(n.a,{href:"https://reacttraining.com/blog/derived-state",children:"React Training - Derived State"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["The boundary between ",(0,s.jsx)(n.strong,{children:"source"})," and ",(0,s.jsx)(n.em,{children:"derived"})," states is blurry. For example, the server database, local storage, OS settings, all of those depend on file system data.\nBut let's mark state as \"source\" when it depends solely on states inaccessible by available technologies. For example, I can't access some private browser file with local storage data from the browser window environment."]}),"\n",(0,s.jsxs)(n.p,{children:["I would like to be explicit and distinguish between in-memory state and all those kinds of states.\nFor myself, I name it a ",(0,s.jsx)(n.strong,{children:"Holistic state"}),"."]}),"\n",(0,s.jsxs)(n.h2,{id:"what-is-ui",children:["What is ",(0,s.jsx)(n.code,{children:"UI"}),"?"]}),"\n",(0,s.jsxs)(n.p,{children:["It is what users perceive with their senses, usually with their eyes on the screen. On the web, it is represented with the ",(0,s.jsx)(n.strong,{children:"DOM"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"The wilderness out there is more diverse.\nOur user might be a machine like a search indexing bot, but they also work on DOM elements and attributes.\nThere could be assistive technologies like a screen reader, working on the DOM as well.\nA very important piece of UI is the URL in the browser address bar. Since it is always in sync with the URL state, I like to think about it as a source state rather than UI.\nUsers also perceive playing sounds, haptic vibration feedback, flashlight, etc.\nLet's simplify and stick with DOM only. It's worth mentioning that the following applies to other UI pieces similarly."}),"\n",(0,s.jsx)(n.p,{children:"As a developer, I expect the framework to provide tools to describe UI and update the DOM when the description changes.\nIn React and Vue, those tools are JSX and VDOM. In Solid, it is a signal dependency graph."}),"\n",(0,s.jsx)(n.p,{children:"Note: I classified DOM as both UI and source state. If we use DOM as a source state and let our UI depend on it, we create a cyclic dependency.\nSometimes it is necessary, e.g., when measuring text width. Be careful in such situations to not create infinite loops. The same applies to the URL."}),"\n",(0,s.jsxs)(n.h2,{id:"what-the-f-is-f",children:["What the f* is ",(0,s.jsx)(n.em,{children:(0,s.jsx)(n.code,{children:"f"})}),"?"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:(0,s.jsx)(n.code,{children:"f"})})," is something that connects ",(0,s.jsx)(n.code,{children:"state"})," and ",(0,s.jsx)(n.code,{children:"UI"}),".\nYou may say it is the component tree with its render function. And you are ",(0,s.jsx)("abbr",{title:"In My Opinion",children:"IMO"})," partially right."]}),"\n",(0,s.jsxs)(n.p,{children:["Because this ",(0,s.jsx)(n.em,{children:(0,s.jsx)(n.code,{children:"f"})}),' function usually produces many UI pieces,\nit is a "necessity" to split the mental load into reusable smaller ',(0,s.jsx)(n.code,{children:"f"}),"s - components.\n",(0,s.jsx)(n.a,{href:"https://overreacted.io/a-chain-reaction/",children:"Dan Abramov"})," wrote a great article about it."]}),"\n",(0,s.jsx)(n.p,{children:"React component ergonomics example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"function Post(slug) {                  // name and state received via props\n    const posts = useQuery(fetchPosts) // state received via hook\n    const post = posts[slug]           // derivation logic\n    return <div>{post}</div>           // JSX UI description\n}\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Name"})," of the function to be referenceable."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Receive state"})," via props or hooks (or higher-order components)."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Derive state"})," before JSX is produced. Right within the render function or separated into a custom function."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Produce UI description"})," in the form of JSX which is then consumed by VDOM."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"I said partially. Components do not (usually) directly connect to states. They just receive a value/connection."}),"\n",(0,s.jsx)(n.h2,{id:"connecting-states",children:"Connecting States"}),"\n",(0,s.jsx)(n.p,{children:"We need a way to choose the states upon which our component depends. We want to subscribe/observe changes and execute derivation and rendering logic with new values."}),"\n",(0,s.jsxs)(n.p,{children:["Hooks do an excellent job with their smart ",(0,s.jsx)(n.code,{children:"useEffect"})," and ",(0,s.jsx)(n.code,{children:"useRef"}),". Much maligned for their ergonomics, but in my opinion, they get the conceptual job right. Let's refer to custom hooks using ",(0,s.jsx)(n.code,{children:"useEffect"})," and ",(0,s.jsx)(n.code,{children:"useRef"})," as ",(0,s.jsx)(n.strong,{children:"connecting hooks"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"React connecting hook ergonomics example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"// name and config received via props\nfucntion useStopwatch(delay) {          \n    const [ticks, setTicks] = useState(0)\n    useEffect(() => {         \n        // subscribing to real world state (time)            \n        const timer = setInterval(() => setTicks(prev => prev + 1), delay)\n        return () => clearInterval(timer)\n    }, [delay])\n    // Returning reactive state\n    return ticks                          \n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Many libraries like ",(0,s.jsx)(n.code,{children:"tanstack-query"})," for external resources, ",(0,s.jsx)(n.code,{children:"react-router"})," for URLs, or ",(0,s.jsx)(n.code,{children:"react-use"})," for various kinds of states have been created. They allow us (app devs) to connect to the source state with just one line of code from within the component. And don't care much about how. Great abstraction."]}),"\n",(0,s.jsx)(n.p,{children:"These connecting hooks are the missing glue between state and component rendering logic. They subscribe to state changes and rerun the necessary derivation and rendering logic accordingly."}),"\n",(0,s.jsx)(n.p,{children:"In my opinion, the observer pattern is best for developer experience (DX). But sometimes it is not possible or desired, usually for performance reasons. Typically, this is the case for states far away from the client, like server data. Even for them, we have mechanisms like websockets or long polling. But usually, we fall back to the initial fetch during either component mount, server request, or build. Then caching, invalidation, and optimistic update mechanisms must come into play. But let's still call them connecting hooks anyway."}),"\n",(0,s.jsxs)(n.p,{children:["There are hooks that create state themselves, like ",(0,s.jsx)(n.code,{children:"useState"})," and ",(0,s.jsx)(n.code,{children:"useReducer"}),', and simultaneously connect to it. But let\'s stick with the word "connecting" only.']}),"\n",(0,s.jsx)(n.h2,{id:"developer-experience",children:"Developer Experience"}),"\n",(0,s.jsxs)(n.p,{children:["So the real-world picture of ",(0,s.jsx)(n.code,{children:"UI = f(state)"})," for app developers could be condensed into:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"DOM = render(derive(connect(holistic_state)))\n"})}),"\n",(0,s.jsxs)(n.p,{children:["It is a super simple mental model for such a complex problem as a web app. It is ",(0,s.jsx)(n.strong,{children:"conceptually clean and mentally relieving"}),". Modern client-side ",(0,s.jsx)("abbr",{title:"Single Page Application",children:"SPA"}),"s follow this conceptual model quite precisely. I believe many devs love React 16.8+ (hooks introduced) because of this mental model, myself included. It speeds up development, saves time, and money."]}),"\n",(0,s.jsx)(n.p,{children:"But for the model to be helpful, some additional properties must be met:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Composable"})," - Ability to compose components into the full UI.",(0,s.jsx)("br",{}),"\nAbility to ",(0,s.jsx)("mark",{children:"place any component into any other component"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Reusable"})," - Ability to define a name and reuse a component in a different place.",(0,s.jsx)("br",{}),"\nAlso, the ability to pass arbitrary configuration (possibly reactive state) to adjust its behavior (props)."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Colocated"})," - Name, render logic, necessary state connections, state derivation logic, documentation, etc.",(0,s.jsx)("br",{}),"\nDevs should be able to ",(0,s.jsx)("mark",{children:"place all those dependencies inside a component"}),".",(0,s.jsx)("br",{}),"\nIf not, devs jump back and forth in a codebase. Inconvenient."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Encapsulated"})," - Ability to work on a component independently by default. Opt-in to break the barrier.",(0,s.jsx)("br",{}),"\nIf not met, devs must mentally think about other code pieces.\nNote: this is broken by React cascading memoization. Frustrating."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Reactive"})," - Component must react to connected state the dev chooses.",(0,s.jsx)("br",{}),"\n",(0,s.jsx)("mark",{children:"Any component must be able to connect to any state"}),". The same applies for derivation hooks.",(0,s.jsx)("br",{}),"\nIf some rules are required, it makes development jammed."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Arbitrary"})," - The component's boundaries must obey the dev's needs.",(0,s.jsx)("br",{}),"\n",(0,s.jsx)("mark",{children:"Nothing must force a component to split (or not to split)"}),".",(0,s.jsx)("br",{}),"\nSame for derivation hooks. It destroys their purpose otherwise."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Why does all of this matter? Because the conceptual model needs to be solid. All the time. If we develop some complex logic with those principles in mind, it can't happen due to broken principles that we need to refactor. I want to trust it will support me during heavy loads."}),"\n",(0,s.jsx)(n.p,{children:"I can handle some configuration and syntax overhead like useEffect, CSS integration, or Webpack. I'm fine to write a few extra chars if the conceptual model stays clear."}),"\n",(0,s.jsxs)(n.p,{children:["I know React client ",(0,s.jsx)("abbr",{title:"Single Page Application",children:"SPA"}),"s suffer from bad performance. I believe that the conceptual model is so important; it should not be broken by enforcing good performance patterns. The framework should remain loyal to the clear model and do its best for performance. In addition, provide tools to optimize like optimization hints, refactoring patterns, or more aggressive caching config."]}),"\n",(0,s.jsxs)(n.p,{children:["It seems to me ",(0,s.jsx)("abbr",{title:"React Server Components",children:"RSC"})," and NextJS just ",(0,s.jsx)("mark",{children:"break some fundamental properties of this conceptual model"})," because of their performance-first design. And I believe it is not necessary to achieve their goals. But let's stop here and keep this for the next article."]}),"\n",(0,s.jsx)(n.p,{children:"Thanks for reading."})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},7463:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/holistic-state-562930c5eec9df368ea3c02de81cc2b3.png"},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>r});var s=t(7294);const o={},i=s.createContext(o);function r(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);