"use strict";(self.webpackChunk_torrta_docs=self.webpackChunk_torrta_docs||[]).push([[616],{3052:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"/2024/02/23/great-things-in-hooks-but-forgotten-in-rsc","metadata":{"permalink":"/2024/02/23/great-things-in-hooks-but-forgotten-in-rsc","source":"@site/blog/2024-02-23-great-things-in-hooks-but-forgotten-in-rsc/index.md","title":"Pillars of hooks forgotten in RSC","description":"UI = f(state). Every one of us knows this formula. But how does it translate to real world?","date":"2024-02-23T00:00:00.000Z","formattedDate":"February 23, 2024","tags":[],"readingTime":5.905,"hasTruncateMarker":true,"authors":[],"frontMatter":{},"unlisted":false,"nextItem":{"title":"Practical limits of React hooks - Recursion","permalink":"/2022/03/23/practical-limits-of-react-hooks-recursion"}},"content":"`UI = f(state)`. Every one of us knows this formula. But how does it translate to real world?\\nWhat is `UI`? What is `state`? And what the f* is *`f`*? Here is my view.\\n\\n\x3c!-- truncate --\x3e\\n\\nI ignore how state is mutated. But I reckon it mutates.\\n\\nI talk about React but all of the following principles apply for other UI frameworks.\\n\\n\\n![](./state-f-UI.png \\"UI is a function of State\\")\\n\\n\\n\\n## What is `state`?\\n\\nLook again: `UI = f(state)`. In other words `state` is what our `UI` depends on. If dependency changes, we want to change the UI. It is called reactivity.\\n\\nI believe the `state` is more than just in-memory local component state (`useState`) or in-memory global app state (Redux, Jotai, Zustand).\\nI\'m not alone (\\n[TkDodo](https://tkdodo.eu/blog/react-query-as-a-state-manager),\\n[ByteGrad (YouTube)](https://www.youtube.com/watch?v=ukpgxEemXsk),\\n[Kent C. Dodds](https://x.com/kentcdodds/status/1349173470567964673),\\n[Dave Rupert](https://daverupert.com/2024/02/ui-states/),\\n[Dan Abramov](https://overreacted.io/the-two-reacts/)\\n). Many devs agrees at least URL and server data are some kind of state too. But I think it is much more. Lets place some `UI` examples:\\n\\n- Blog post `UI` depends on slug present in *URL* address.\\n- Server files `UI` explorer depends on *server files*.\\n- Newest movies list `UI` depends on *external resource* of OMDB. \\n- Ticking clock `UI` depends on *time*.\\n- Drawing canvas `UI` depends on *mouse* position.\\n- User profile `UI` depends on session token stored in *cookie*.\\n- Keep me signed on this device `UI` depends on flag in *local storage*.\\n- OS prefered dark mode `UI` depends on *OS setting*.\\n- Devtools debug `UI` depends on *env variable*.\\n- Panoramatic background `UI` depends on scroll position of *DOM* element.\\n- ... OK you got the idea.\\n\\nIts important to say that `state` may be **derived**. Examples:\\n\\n- Current post *slug* depends on *URL*.\\n- Current post *minutes read* depends on *slug* and *server files*.\\n- Current *user role* depends on *server database* authorization data and session token stored in *cookie*.\\n- *Prefered dark mode* depends on *local storage* and *OS setting* (storage as user preference and OS as default).\\n- Arkanoid *paddle position* depends on *time* and arrow *pressed keys*\\n- ... got it?\\n\\nDerived state depends on another state. And should change when its dependencies changes.\\nIn other words, be reactive. Great deep-dive from [React Training - Derived State](https://reacttraining.com/blog/derived-state).\\n\\n\\n\\n## What is `UI`?\\n\\nIt is what users perceive with their senses. Usually with eyes on screen. On web it is represented with *DOM*.\\nIt could be also sounds playing, haptic vibration feedback, flashlight, etc. But lets stick only with *DOM* for now.\\n\\nAs dev I expect framework to provide tools to describe UI and update *DOM* when state or derived state changes.\\nIn React those tools are JSX and VDOM.\\n\\nNote *DOM* is classified as both `UI` and `state`. If we use *DOM* as state and let our UI depends on it, we create cyclic dependency.\\nBe careful in such situation to not create infinite loops.\\n\\n\\n\\n![](./what-the-f-is-f.png \\"What the f* is f?\\")\\n\\n\\n\\n## What the f* is *`f`*?\\n\\n*`f`* is something which connects `state` and `UI`.\\nYou may say it is component tree with its render function. And you are IMO partialy right. \\n\\nBecause this *`f`* function usually produces many UI pieces,\\nit is \\"neccesity\\" to split the mental load into reusable smaller `f`s - components.\\n[Dan Abramov](https://overreacted.io/a-chain-reaction/) great article about it.\\nThere are some properties component must meet to be helpful.\\n\\n1. Composable - Ability to compose components into the full UI. Obviously.\\n1. Reusable - Ability to define name and reuse component in different place. Also ability to pass arbitrary configuration (possibly reactive state) to adjust its behavior (props). \\n1. Colocated - Name, render logic, necessary state connetions, state derivation logic, documentation etc. should be placed within/beside component. If not, devs jumps back and forth in a codebase. Inconvenient.\\n1. Encapsulated - Ability to work on a component independently by default. Opt-in to break barier. If not met, dev must mentaly thing about other code pieces. Mental load.\\n1. Reactive - Component must react on connected state the dev chooses. Any component on any state. If some rules are required to connect some state, it makes the development jammed.\\n1. Arbitrary - The components boundaries must obey to the dev needs. If something forces component to split (or not to split), it destroys components purpose.\\n\\nExample. React components ergonomics.\\n\\n```tsx\\nfucntion Post(slug) {                  // name and state received via props\\n    const posts = useQuery(fetchPosts) // state received via hook\\n    const post = posts[slug]           // derivation logic\\n    return <div>{post}</div>           // JSX UI description\\n}\\n```\\n\\n- **Name** of function to be referencable.\\n- **Receive state** via props or hooks (or higher order components).\\n- **Derive state** before JSX is produced. Right within render function or separated into custom function.\\n- **Produce UI description** in a form of JSX which is then consumed by VDOM.\\n\\nI said partialy. Components does not directly connects to states. They just receives a value/connection.\\n\\n\\n![](./render-is-not-f.png \\"f is not just component tree render function\\")\\n\\n\\n\\n## Hooks to connect state\\n\\nWe need some way to choose states our component depends on. We want to subscribe/observe changes and execute derivation and rendering logic with new values.\\n\\nHooks do a great job with its smart `useEffect` and `useRef`. Much hated for its ergonomics, but IMO does the job conceptually right.\\nLets call custom hooks using `useEffect` and `useRef` **connection hooks**. \\n\\nExample. React connection hook ergonomics.\\n\\n```tsx\\nfucntion useStopwatch(delay) {            // name and config state received via props\\n    const [ticks, setTicks] = useState(0)\\n    useEffect(() => {                     \\n        const timer = setInterval(        // subsription to real world state (time)\\n            () => setTicks(prev => prev + 1),\\n            delay\\n        )\\n        return () => clearInterval(timer)\\n    }, [delay])\\n    return ticks                          // Returning reactive state\\n}\\n```\\n\\nMany libraries like `tanstack-query` for external resources, `react-router` for URL or `react-use` for many kind of states were created.\\nThey allows us (app devs) to connect to the state with one line of code from within the component. And dont car much how.\\nReusable, colocated, encapsulated, reactive.\\n\\nThose connecting hooks are a missing glue between state and a component render logic.\\nThey subscribe to the state changes and make necessary derivation and rednering logic re-run accordingly.\\n\\n![](./hooks.png \\"Hooks allows to connect to all kind of states\\")\\n\\nIMO observer pattern is best for DX. But sometimes it is not possible or wanted usually for performance.\\nTypically for states far away from client like server data.\\nEven for them we have mechanisms like websockets or long polling.\\nBut usually we fallback to initial fetch during either component mount, server request or build.\\nThen caching, invalidation and optimistic update mechanisms must enter the scene.\\nBut call them connecting hooks anyway.\\n\\nThere are hooks which creates in-memory local component state itself `useState` and `useReducer`.\\nBut lets stick with connecting word too.\\n\\n\\n## Answer\\n\\n\\n```js\\nUI = f(state) = render(derive(connect(state)))\\n```\\n\\nThis is conceptually clean and mentally relieving model. I believe many devs love React 16.8+ because of those principles.\\nI\'m afraid new React server components breaks some of its beauty.\\nBut lets close this post short a positive and keep this topic till the next time. :)"},{"id":"/2022/03/23/practical-limits-of-react-hooks-recursion","metadata":{"permalink":"/2022/03/23/practical-limits-of-react-hooks-recursion","source":"@site/blog/2022-03-23-practical-limits-of-react-hooks-recursion/index.md","title":"Practical limits of React hooks - Recursion","description":"While ago, I started using React hooks. The simplicity, homogenity and composability sounded great.","date":"2022-03-23T00:00:00.000Z","formattedDate":"March 23, 2022","tags":[],"readingTime":3.87,"hasTruncateMarker":true,"authors":[],"frontMatter":{},"unlisted":false,"prevItem":{"title":"Pillars of hooks forgotten in RSC","permalink":"/2024/02/23/great-things-in-hooks-but-forgotten-in-rsc"}},"content":"While ago, I started using React hooks. The simplicity, homogenity and composability sounded great.\\nBoth components and hooks are simple functions. I can easily react on state changes from memory, \\nlocal storage, location URL and server the same way - with hooks. Mental model stays simple.\\nMy app is just a big function which consumes state and produces DOM. This big function is composed \\nof a smaller functions which are composed of smaller functions and so on. But there were obstacles \\nI\'ve started to encounter and in the end I hit the hard limit of React hooks.\\n\\n\x3c!-- truncate --\x3e\\n\\n> UPDATE 2024: new React [`use`](https://react.dev/reference/react/use) hook may finally solve following limitation \\n> (if you accept `<Suspense/>` as a good pattern)\\n\\n## Model app\\n\\nEach app has some data model defined with entities and relations between them. Lets say we have company \\nDepartment and Employee where department consists of other departments and/or direct employees. \\nOne employee can directly work for exactly one department. Cycles in department hierarchy are prohibited.\\n\\nOur Backend implements REST endpoints.\\n\\n```code title=\\"/departments\\"\\nreturns list of all department ids\\n```\\n\\n```code title=\\"/departments/:departmentId\\"\\nreturns list of sub-department ids\\nand list of direct employee ids\\n```\\n\\nThere are three product requirements.\\n\\n## Pleasant walk with basic hooks\\n\\nFirst product requirement is simple. User selects a department and wants to see number of direct employees.\\nPfff, its simple. Just implement this custom hook which uses department REST endpoint and use it in a component.\\n\\n```tsx\\nconst useDirectEmployeeCount(\\n    departmentId: string\\n): number =>\\n    useDirectEmployeeIds(departmentId).length\\n```\\n\\n```tsx\\nconst useDirectEmployeeIds(\\n    departmentId: string\\n): Array<string> =>\\n    useDepartment(departmentId).directEmployeeIds\\n```\\n\\n```tsx\\nconst useDepartment(\\n    departmentId: string\\n): Department =>\\n    useQuery(\\n        [\'departments\', departmentId],\\n        () => fetch(`/departments/${departmentId}`)\\n    ).data\\n```\\n\\nOur backend implements exactly this endpoints so we use `react-query` and we are done.\\nThere are some loading and error states which I omitted, we can use fancy Suspend and ErrorBoundary,\\nbut we understand the code.\\n\\n\\n## Obstacles with looping\\n\\nSecond product requirement is simple. User needs to select multiple departments and see sum of direct employees.\\nOk, simple. I already have code for one. So simply loop it over multiple selected departments and sum the result.\\n\\n```tsx\\nconst totalCount = sum(\\n    departmentIds.map(\\n        departmentId => useDirectEmployeeCount(departmentId)\\n    )\\n)\\n```\\n\\nWait! It is a hook and there are rule of hooks. Anoying but still doable.\\nLets reimplement `useDirectEmployeeCount` to support multiple department ids. \\nThen I can sum them like this.\\n\\n```tsx\\nconst departmentCounts = useDirectEmployeeCount(departmentIds)\\nconst totalCount = sum(departmentCounts)\\n```\\n```tsx\\nconst useDirectEmployeeCount(\\n    departmentIds: Array<string>\\n): Array<number> =>\\n    useDirectEmployeeIds(departmentIds)\\n        .map(employeeIds => employeeIds.length)\\n```\\n\\nBut wait! I need to reimplement `useDirectEmployeeIds` too. Very anoying.\\n\\n```tsx\\nconst useDirectEmployeeIds(\\n    departmentIds: Array<string>\\n): Array<Array<string>> =>\\n    useDepartment(departmentIds)\\n        .map(department => department.directEmployeeIds)\\n```\\n\\nBut wait! Grrr...\\n\\n```tsx\\nconst useDepartment(\\n    departmentIds: Array<string>\\n): Array<Department> =>\\n    useQueries(departmentIds.map(departmentId => ({\\n        queryKey: [\'departments\', departmentId],\\n        queryFn: () => fetch(`/departments/${departmentId}`)\\n    })))\\n        .map(result => result.data)\\n```\\n\\nUf. Done. I\'m glad it is a small project with just three hooks. Tell me the last requirement.\\n\\n## Limits with recursion\\n\\nThird and last product requirement is simple. User needs to select department and see sum of direct and\\nindirect employees (including employees from all sub-departments and their sub-departments and so on).\\nOk, simple. I already have code for multiple departments. So simply recursively call it and sum the result.\\n\\n```tsx\\nconst useIndirectEmployeeCount(\\n    departmentIds: Array<string>\\n): Array<number> => {\\n    const directCount = useDirectEmployeeCount(departmentIds);\\n    const departments = useDepartment(departmentIds);\\n    const subDepartmentIds = departments.flatMap(department => department.subDepartmentIds);\\n    const indirectCount = useIndirectEmployeeCount(subDepartmentIds);\\n    return directCount + indirectCount\\n}\\n```\\n\\nWait.\\n\\n> Error: Maximum Call Stack Size Exceeded\\n\\nOh. You almost got me. I just forgot a recursive break, right?\\n\\n```tsx\\nconst useIndirectEmployeeCount(\\n    departmentIds: Array<string>\\n): Array<number> => {\\n    const directCount = useDirectEmployeeCount(departmentIds);\\n    const departments = useDepartment(departmentIds);\\n    const subDepartmentIds = departments.flatMap(department => department.subDepartmentIds);\\n    if (subDepartmentIds.length === 0) {\\n        return directCount;\\n    }\\n    const indirectCount = useIndirectEmployeeCount(subDepartmentIds);\\n    return directCount + indirectCount\\n}\\n```\\n\\nWait.\\n\\n> Error: React Hook \\"useIndirectEmployeeCount\\" is called conditionally.\\n\\n...\\n\\n## Last words\\n\\nMental model stays simple. Everything is a simple function. My app is one big function composed of smaller and\\nsmaller ones. It trully sounds great! But in a real world, hooks are not so simple, homogen and composable.\\nThere are obstacles and limits mainly because of rule of hooks.\\n\\nThis post is not about saying React hooks are bad. I wrote it because I did not find any resources\\non such obstacles and limits. The React world looks like hooks are always pleasant walk trought the rosy garden.\\nBut they are not.\\n\\nFor now I don\'t know how to elegantly solve the recusrion example. Are there some resources on this?\\nDo you have following thougts? Maybe I\'m not the only one struggling. Thanks for reading."}]}')}}]);