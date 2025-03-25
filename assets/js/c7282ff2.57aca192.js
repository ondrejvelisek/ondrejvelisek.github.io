"use strict";(self.webpackChunk_torrta_docs=self.webpackChunk_torrta_docs||[]).push([[783],{9797:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>X,contentTitle:()=>V,default:()=>ne,frontMatter:()=>Q,metadata:()=>s,toc:()=>ee});const s=JSON.parse('{"permalink":"/avoid-the-state-synchronization-trap","source":"@site/blog/2025-03-01-why-to-use-empty-state/index.mdx","title":"Avoid the State Synchronization Trap","description":"Today I want to talk about a bad code pattern I see quite often.","date":"2025-03-01T00:00:00.000Z","tags":[],"readingTime":10.84,"hasTruncateMarker":true,"authors":[],"frontMatter":{"slug":"avoid-the-state-synchronization-trap","draft":false,"unlisted":true},"unlisted":true}');var i=n(5105),a=n(3331),r=n(8101);function o(e){let{children:t,...n}=e;return(0,i.jsxs)("li",{...n,children:[(0,i.jsx)("span",{className:"bg-[rgba(0,255,0,0.15)] rounded-full font-bold text-[rgba(200,255,150,0.65)] text-center inline-block leading-4 pb-1 w-5 align-text-top",children:"+"})," ",t]})}function l(e){let{children:t,...n}=e;return(0,i.jsxs)("li",{...n,children:[(0,i.jsx)("span",{className:"bg-[rgba(255,50,0,0.2)] rounded-full font-black text-[rgba(255,170,150.8)] text-center inline-block leading-4 pb-1 w-5 align-text-top",children:"-"})," ",t]})}function c(e){let{children:t,items:n,onChange:s}=e;const[a,o]=(0,r.useState)(!1),l=(0,r.useRef)(null),c=e=>{l.current&&!l.current.contains(e.target)&&o(!1)};return(0,r.useEffect)((()=>(document.addEventListener("click",c),()=>{document.removeEventListener("click",c)})),[]),(0,i.jsxs)("div",{className:"relative group",ref:l,children:[(0,i.jsx)("button",{onClick:()=>o((e=>!e)),style:{borderBottomColor:a?"#1B1B1D":void 0,backgroundColor:a?"#1B1B1D":void 0,borderBottomLeftRadius:a?"0px":void 0,borderBottomRightRadius:a?"0px":void 0},className:"group-first:rounded-s group-last:rounded-e transition-colors hover:bg-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.07)] shadow-inner border border-[#606770] border-solid p-3 text-base font-bold text-[rgb(227,227,227)] leading-[26px] cursor-pointer hover:text-white border-l-0 group-first:border-l font-[inherit]",children:t}),(0,i.jsx)("div",{className:"transition-[max-height,padding,opacity] rounded-b py-1 overflow-hidden border border-[#606770] border-solid border-t-0 z-10 absolute bg-[#1B1B1D] group-last:right-0 -left-px group-last:left-auto group-first:left-auto flex-col shadow-black shadow-lg min-w-[calc(100%+1px)]",style:{padding:a?void 0:"0px",opacity:a?1:.5,borderBottomWidth:a?void 0:"0px",maxHeight:a?10+34.5*n.length+"px":"0px"},children:n.map((e=>(0,i.jsxs)("label",{className:"px-2 py-1 truncate block",children:[(0,i.jsx)("input",{type:"checkbox",id:`${e.name}`,value:e.name,checked:e.selected,onChange:t=>s(e.name)}),e.title]},e.name)))})]})}function d(e){let{data:t=[{},{},{}],columns:n}=e;return(0,i.jsxs)("table",{className:"mb-0",children:[(0,i.jsx)("thead",{children:(0,i.jsx)("tr",{className:"bg-[#1B1B1D]",children:n.map((e=>(0,i.jsx)("th",{children:e.title},e.name)))})}),(0,i.jsx)("tbody",{children:t.map(((e,t)=>(0,i.jsx)("tr",{className:"even:bg-inherit",children:n.map((t=>(0,i.jsx)("td",{className:"overflow-hidden",children:e[t.name]??(0,i.jsx)("span",{className:"opacity-15 max-w-0 inline-block whitespace-nowrap",children:"\u25cf \u25cf \u25cf"})},t.name)))},t)))})]})}function u(e,t){const[n,s]=(0,r.useState)(),[i,a]=(0,r.useState)(0);return(0,r.useEffect)((()=>{console.log("Fetching orders..."),a((e=>e+1)),s((e=>e?.map((()=>({})))));const n=setTimeout((()=>{s([{date:"1/3/2025",id:101,customer:"Ondrej",amount:100,currency:"CZK",country:"Czechia"},{date:"2/3/2025",id:102,customer:"Jenny",amount:200,currency:"EUR",country:"France"},{date:"3/3/2025",id:103,customer:"Hans",amount:300,currency:"USD",country:"Germany"}].filter((e=>!t||t.every((t=>!t.values?.length||t.values.includes(e[t.name]))))).map((t=>Object.fromEntries(Object.entries(t).filter((t=>{let[n]=t;return!e||e.find((e=>e.name===n))}))))))}),1e3);return()=>clearTimeout(n)}),[e,t]),[n,i]}function h(){const e=[{name:"date",title:"Date\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"},{name:"id",title:"#\xa0\xa0\xa0\xa0\xa0"},{name:"customer",title:"Customer"},{name:"amount",title:"Amount"},{name:"currency",title:"Currency"},{name:"country",title:"Country\xa0"}],[t]=u();return t?Object.fromEntries(e.map((e=>[e.name,new Set(t.map((t=>t[e.name])))]))):{}}function m(){return(0,i.jsx)(x,{})}const p=[{name:"date",title:"Date\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"},{name:"id",title:"#\xa0\xa0\xa0\xa0\xa0"},{name:"customer",title:"Customer"},{name:"amount",title:"Amount"}];function x(){const[e]=u(p);return(0,i.jsx)(d,{data:e,columns:p})}const f=[{name:"date",title:"Date\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"},{name:"id",title:"#\xa0\xa0\xa0\xa0\xa0"},{name:"customer",title:"Customer"},{name:"amount",title:"Amount"}],j=(0,r.createContext)(void 0);function y(){const[e,t]=(0,r.useState)(f);return(0,i.jsx)(j.Provider,{value:[e,t],children:(0,i.jsx)(g,{})})}function g(){const[e]=(0,r.useContext)(j),[t]=u(e);return(0,i.jsxs)("div",{className:"flex items-start",children:[(0,i.jsx)(d,{data:t,columns:e}),(0,i.jsx)(b,{})]})}function b(){const e=[{name:"date",title:"Date\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"},{name:"id",title:"#\xa0\xa0\xa0\xa0\xa0"},{name:"customer",title:"Customer"},{name:"amount",title:"Amount"},{name:"currency",title:"Currency"},{name:"country",title:"Country\xa0"}],[t,n]=(0,r.useContext)(j);return(0,i.jsx)(c,{items:e.map((e=>({...e,selected:!!t.find((t=>t.name===e.name))}))),onChange:t=>{n((n=>{if(n.find((e=>e.name===t)))return n.filter((e=>e.name!==t));{const s=e.find((e=>e.name===t));return[...n,s]}}))},children:(0,i.jsx)("span",{className:"font-[Arial] text-2xl leading-[23px]",children:"\u2699"})})}const v=[{name:"date",title:"Date\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"},{name:"id",title:"#\xa0\xa0\xa0\xa0\xa0"},{name:"customer",title:"Customer"},{name:"amount",title:"Amount"}],w=(0,r.createContext)(void 0),C=(0,r.createContext)(void 0);function N(){const[e,t]=(0,r.useState)(v),[n,s]=(0,r.useState)(v);return(0,i.jsx)(w.Provider,{value:[e,t],children:(0,i.jsx)(C.Provider,{value:[n,s],children:(0,i.jsx)(k,{})})})}function k(){const[e]=(0,r.useContext)(w),[t]=(0,r.useContext)(C),[n]=u(e,t);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(F,{className:"mb-2"}),(0,i.jsxs)("div",{className:"flex items-start",children:[(0,i.jsx)(d,{data:n,columns:e}),(0,i.jsx)(I,{})]})]})}function I(){const e=[{name:"date",title:"Date\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"},{name:"id",title:"#\xa0\xa0\xa0\xa0\xa0"},{name:"customer",title:"Customer"},{name:"amount",title:"Amount"},{name:"currency",title:"Currency"},{name:"country",title:"Country\xa0"}],[t,n]=(0,r.useContext)(w);return(0,i.jsx)(c,{items:e.map((e=>({...e,selected:!!t.find((t=>t.name===e.name))}))),onChange:t=>{n((n=>{if(n.find((e=>e.name===t)))return n.filter((e=>e.name!==t));{const s=e.find((e=>e.name===t));return[...n,s]}}))},children:(0,i.jsx)("span",{className:"font-[Arial] text-2xl leading-[23px]",children:"\u2699"})})}function F(e){let{className:t}=e;const[n,s]=(0,r.useContext)(C),a=h();return(0,i.jsx)("div",{className:`flex ${t}`,children:n.map((e=>(0,i.jsx)(c,{items:a[e.name]?Array.from(a[e.name]).map((t=>({name:t,title:`${t}`,selected:e.values?.includes(t)??!1}))):[],onChange:t=>s((n=>n.map((n=>n.name===e.name?{...n,values:n.values?.includes(t)?n.values?.filter((e=>e!==t)):[...n.values??[],t]}:n)))),children:e.title},e.name)))})}const S=[{name:"date",title:"Date\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"},{name:"id",title:"#\xa0\xa0\xa0\xa0\xa0"},{name:"customer",title:"Customer"},{name:"amount",title:"Amount"}],A=(0,r.createContext)(void 0),T=(0,r.createContext)(void 0);function z(){const[e,t]=(0,r.useState)(S),[n,s]=(0,r.useState)(S);return(0,i.jsx)(A.Provider,{value:[e,t],children:(0,i.jsx)(T.Provider,{value:[n,s],children:(0,i.jsx)(O,{})})})}function O(){const[e]=(0,r.useContext)(A),[t]=(0,r.useContext)(T),[n]=u(e,t);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(B,{className:"mb-2"}),(0,i.jsxs)("div",{className:"flex items-start",children:[(0,i.jsx)(d,{data:n,columns:e}),(0,i.jsx)(D,{})]})]})}function D(){const e=[{name:"date",title:"Date\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"},{name:"id",title:"#\xa0\xa0\xa0\xa0\xa0"},{name:"customer",title:"Customer"},{name:"amount",title:"Amount"},{name:"currency",title:"Currency"},{name:"country",title:"Country\xa0"}],[t,n]=(0,r.useContext)(A),[,s]=(0,r.useContext)(T);return(0,i.jsx)(c,{items:e.map((e=>({...e,selected:!!t.find((t=>t.name===e.name))}))),onChange:t=>{n((n=>{if(n.find((e=>e.name===t)))return n.filter((e=>e.name!==t));{const s=e.find((e=>e.name===t));return[...n,s]}})),s((n=>{if(n.find((e=>e.name===t)))return n.filter((e=>e.name!==t));{const s=e.find((e=>e.name===t));return[...n,s]}}))},children:(0,i.jsx)("span",{className:"font-[Arial] text-2xl leading-[23px]",children:"\u2699"})})}function B(e){let{className:t}=e;const[n,s]=(0,r.useContext)(T),a=h();return(0,i.jsx)("div",{className:`flex ${t}`,children:n.map((e=>(0,i.jsx)(c,{items:a[e.name]?Array.from(a[e.name]).map((t=>({name:t,title:`${t}`,selected:e.values?.includes(t)??!1}))):[],onChange:t=>s((n=>n.map((n=>n.name===e.name?{...n,values:n.values?.includes(t)?n.values?.filter((e=>e!==t)):[...n.values??[],t]}:n)))),children:e.title},e.name)))})}const E=[{name:"date",title:"Date\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"},{name:"id",title:"#\xa0\xa0\xa0\xa0\xa0"},{name:"customer",title:"Customer"},{name:"amount",title:"Amount"}],P=(0,r.createContext)(void 0),R=(0,r.createContext)(void 0);function L(){const[e,t]=(0,r.useState)(E),[n,s]=(0,r.useState)(E);return(0,r.useEffect)((()=>{setTimeout((()=>s(e)),150)}),[e]),(0,i.jsx)(P.Provider,{value:[e,t],children:(0,i.jsx)(R.Provider,{value:[n,s],children:(0,i.jsx)(U,{})})})}function U(){const[e]=(0,r.useContext)(P),[t]=(0,r.useContext)(R),[n,s]=u(e,t);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(Y,{className:"mb-2 w-full flex-wrap"}),(0,i.jsxs)("div",{className:"flex items-start",children:[(0,i.jsx)(d,{data:n,columns:e}),(0,i.jsx)(W,{})]}),(0,i.jsxs)("div",{className:"text-sm text-gray-400 mb-5",children:["Number of requests: ",s]})]})}function W(){const e=[{name:"date",title:"Date\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"},{name:"id",title:"#\xa0\xa0\xa0\xa0\xa0"},{name:"customer",title:"Customer"},{name:"amount",title:"Amount"},{name:"currency",title:"Currency"},{name:"country",title:"Country\xa0"}],[t,n]=(0,r.useContext)(P);return(0,i.jsx)(c,{items:e.map((e=>({...e,selected:!!t.find((t=>t.name===e.name))}))),onChange:t=>{n((n=>{if(n.find((e=>e.name===t)))return n.filter((e=>e.name!==t));{const s=e.find((e=>e.name===t));return[...n,s]}}))},children:(0,i.jsx)("span",{className:"font-[Arial] text-2xl leading-[23px]",children:"\u2699"})})}function Y(e){let{className:t}=e;const[n,s]=(0,r.useContext)(R),a=h();return(0,i.jsx)("div",{className:`flex ${t}`,children:n.map((e=>(0,i.jsx)(c,{items:a[e.name]?Array.from(a[e.name]).map((t=>({name:t,title:`${t}`,selected:e.values?.includes(t)??!1}))):[],onChange:t=>s((n=>n.map((n=>n.name===e.name?{...n,values:n.values?.includes(t)?n.values?.filter((e=>e!==t)):[...n.values??[],t]}:n)))),children:e.title},e.name)))})}const q=[{name:"date",title:"Date\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"},{name:"id",title:"#\xa0\xa0\xa0\xa0\xa0"},{name:"customer",title:"Customer"},{name:"amount",title:"Amount"}],M=(0,r.createContext)(void 0),$=(0,r.createContext)(void 0);function H(){const[e]=(0,r.useContext)(M),[t,n]=(0,r.useContext)($);return[(0,r.useMemo)((()=>e.map((e=>({...e,...t[e.name]})))),[e,t]),(0,r.useCallback)(((e,t)=>n((n=>({...n,[e]:{operator:"=",values:n[e]?.values.includes(t)?n[e]?.values.filter((e=>e!==t)):[...n[e]?.values??[],t]}})))),[])]}function G(){const[e,t]=(0,r.useState)(q),[n,s]=(0,r.useState)({});return(0,i.jsx)(M.Provider,{value:[e,t],children:(0,i.jsx)($.Provider,{value:[n,s],children:(0,i.jsx)(_,{})})})}function _(){const[e]=(0,r.useContext)(M),[t]=H(),[n,s]=u(e,t);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(Z,{className:"mb-2 w-full flex-wrap"}),(0,i.jsxs)("div",{className:"flex items-start",children:[(0,i.jsx)(d,{data:n,columns:e}),(0,i.jsx)(J,{})]}),(0,i.jsxs)("div",{className:"text-sm text-gray-400 mb-5",children:["Number of requests: ",s]})]})}function J(){const e=[{name:"date",title:"Date\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"},{name:"id",title:"#\xa0\xa0\xa0\xa0\xa0"},{name:"customer",title:"Customer"},{name:"amount",title:"Amount"},{name:"currency",title:"Currency"},{name:"country",title:"Country\xa0"}],[t,n]=(0,r.useContext)(M);return(0,i.jsx)(c,{items:e.map((e=>({...e,selected:!!t.find((t=>t.name===e.name))}))),onChange:t=>{n((n=>{if(n.find((e=>e.name===t)))return n.filter((e=>e.name!==t));{const s=e.find((e=>e.name===t));return[...n,s]}}))},children:(0,i.jsx)("span",{className:"font-[Arial] text-2xl leading-[23px]",children:"\u2699"})})}function Z(e){let{className:t}=e;const[n,s]=H(),a=h();return(0,i.jsx)("div",{className:`flex ${t}`,children:n.map((e=>(0,i.jsx)(c,{items:a[e.name]?Array.from(a[e.name]).map((t=>({name:t,title:`${t}`,selected:e.values?.includes(t)??!1}))):[],onChange:t=>s(e.name,t),children:e.title},e.name)))})}var K=n(6702);const Q={slug:"avoid-the-state-synchronization-trap",draft:!1,unlisted:!0},V="Avoid the State Synchronization Trap",X={authorsImageUrls:[]},ee=[{value:"Example",id:"example",level:2},{value:"2025: List of orders",id:"2025-list-of-orders",level:3},{value:"2026: Custom columns",id:"2026-custom-columns",level:3},{value:"2027: Filters",id:"2027-filters",level:3},{value:"State initialization",id:"state-initialization",level:2},{value:"State synchronization",id:"state-synchronization",level:2},{value:"1. Direct Setters Approach",id:"1-direct-setters-approach",level:3},{value:"2. Centralized Gate Setter Approach",id:"2-centralized-gate-setter-approach",level:3},{value:"3. Effect Approach",id:"3-effect-approach",level:3},{value:"4. Selector Approach",id:"4-selector-approach",level:3},{value:"Conclusion",id:"conclusion",level:2}];function te(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:"Today I want to talk about a bad code pattern I see quite often.\nIt\u2019s about state management, particularly state synchronization. Often it is a source of bugs, glitches, and performance problems."}),"\n",(0,i.jsx)(t.p,{children:"Usually it is solvable by adjusting the state shape.\nMore precisely, splitting the state into pieces and merging the pieces later in selectors, render functions, or custom hooks.\nAn interesting fact is that one of those states is empty or undefined, but the UI renders desired items anyway. It might seem unintuitive, but bear with me."}),"\n","\n",(0,i.jsx)(t.p,{children:"During the Redux era, we discussed state shape a lot. It was called state normalization.\nNowadays, it is rarely touched, even though it is still important.\nTo help you understand my thoughts, I sometimes use Redux terminology, like selectors and actions, throughout this article."}),"\n",(0,i.jsx)(t.p,{children:"I\u2019ll present the problem using an example of an orders table. The example is quite long, but I believe it is useful.\nIt is based on a real-world application. I simplify, but in principle, I saw it in a real codebase."}),"\n",(0,i.jsx)(t.p,{children:"One last note before we start: I talk about React, but the ideas are applicable to any modern FE framework (regardless if signal-based or not)."}),"\n",(0,i.jsx)(t.p,{children:"\xa0"}),"\n",(0,i.jsx)(t.h2,{id:"example",children:"Example"}),"\n",(0,i.jsx)(t.p,{children:"Let\u2019s illustrate state synchronization through an evolving example, starting simply and becoming increasingly complex over several hypothetical years."}),"\n",(0,i.jsx)(t.p,{children:"\xa0"}),"\n",(0,i.jsx)(t.h3,{id:"2025-list-of-orders",children:"2025: List of orders"}),"\n","\n",(0,i.jsx)(m,{}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"function OrdersList() {\n    const orders = useOrders();\n    return <Table data={orders} />;\n}\n"})}),"\n",(0,i.jsxs)(t.p,{children:["It\u2019s the year 2025, and you work on this cool project called Outstanding Overview of Opulus Orders (OOoOO).\nYou work on a page with a data table: a list of orders.\nComponent ",(0,i.jsx)(t.code,{children:"OrdersList"})," uses hook ",(0,i.jsx)(t.code,{children:"useOrders"}),", which internally uses TanStack Query to fetch orders from a backend API.\nWith the given orders data, you use a UI component ",(0,i.jsx)(t.code,{children:"Table"}),", which renders it. Easy peasy."]}),"\n",(0,i.jsx)(t.p,{children:"\xa0"}),"\n",(0,i.jsx)(t.h3,{id:"2026-custom-columns",children:"2026: Custom columns"}),"\n","\n",(0,i.jsx)(y,{}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"function OrdersList() {\n  const [columns] = useContext(ColumnsCtx)\n  const orders = useOrders(columns)\n  return <Table data={orders} />\n}\n"})}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"const initColumns = [\n  { attribute: 'date' },\n  { attribute: 'order' },\n  { attribute: 'customer' },\n  { attribute: 'amount' },\n]\n\nfunction ColumnsProvider() {\n  const [columns, setColumns] = useState(initColumns)\n  ...\n}\n"})}),"\n",(0,i.jsxs)(t.p,{children:["Fast forward. It\u2019s the year 2026, and your customer\u2019s business has grown internationally, introducing new requirements.\nThey collect additional attributes about Opulus orders, like currency and country.\nThey want to allow users to show more columns in the table. So you add a ",(0,i.jsx)("code",{children:"\u2699"})," button beside the table header.\nWhen the user clicks it, a dropdown with available columns appears. The user can select and deselect which columns are visible."]}),"\n",(0,i.jsxs)(t.p,{children:["Since columns might change during the user session, you need to store them in some kind of state.\nThey need to be accessed from multiple components (like ",(0,i.jsx)(t.code,{children:"OrdersList"})," and the ",(0,i.jsx)("code",{children:"\u2699"})," button dropdown).\nSo we store columns in some higher-level state.\nHere I use React Context, but feel free to imagine Zustand, Jotai, Redux, or URL. It does not matter for our purposes.\nYou initialize the state with default columns constant.\n(If URL surprised you, you might want to read my previous article ",(0,i.jsx)(t.a,{href:"/conceptual-model-of-react-and-rsc",children:"Conceptual Model of React and RSC"}),")."]}),"\n",(0,i.jsx)(t.p,{children:"\xa0"}),"\n",(0,i.jsx)(t.h3,{id:"2027-filters",children:"2027: Filters"}),"\n","\n",(0,i.jsx)(N,{}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"function Filters() {\n  const [filters] = useContext(FiltersCtx)\n  return filters.map(filter => (\n    <Filter filter={filter} />\n  ))\n}\n"})}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"function OrdersList() {\n  const [columns] = useContext(ColumnsCtx)\n  const [filters] = useContext(FiltersCtx)\n  const orders = useOrders(columns, filters)\n  return <Table data={orders} />\n}\n"})}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"type Filters = Array<{\n  attribute: string,\n  operator?: '='|'>'|'<',\n  values?: Array<string|number>\n}>\n\nfunction FiltersProvider() {\n  const [filters, setFilters] = useState()\n  ...\n}\n"})}),"\n",(0,i.jsx)(t.p,{children:"Fast forward. It\u2019s the year 2027, and the customer\u2019s business grows. There are many Opulus orders now.\nTherefore, the customer wants you to implement filtering rows by values.\nThe user should be able to filter only visible columns.\nNot a trivial feature request, but let\u2019s do it."}),"\n",(0,i.jsxs)(t.p,{children:["You add a new ",(0,i.jsx)(t.code,{children:"Filters"})," component.\nFilters might change during the user session and need to be accessible in multiple components, so you store them in a new Context.\nWhen the user modifies the filter via UI, the ",(0,i.jsx)(t.code,{children:"Filter"})," component calls some context state setter and adjusts the state value,\nand the reactivity system rerenders the ",(0,i.jsx)(t.code,{children:"OrdersList"})," component and therefore refetches ",(0,i.jsx)(t.code,{children:"useOrders"})," with a new ",(0,i.jsx)(t.code,{children:"filters"})," value."]}),"\n",(0,i.jsx)(t.p,{children:"Seems nice. You try to run this, and\u2026 it does not show any filters. Can you guess why?"}),"\n",(0,i.jsx)(t.p,{children:"\xa0"}),"\n",(0,i.jsx)(t.h2,{id:"state-initialization",children:"State initialization"}),"\n",(0,i.jsxs)(t.p,{children:["It is because the filters context is empty. We need to initialize the filter state.\n",(0,i.jsx)(t.code,{children:"useState"})," has an initialization property. We can use it."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"const initColumns = [\n  { attribute: 'date' },\n  { attribute: 'order' },\n  { attribute: 'customer' },\n  { attribute: 'amount' },\n]\n\nfunction FiltersProvider() {\n  const [filters, setFilters] = useState(initColumns)\n  ...\n}\n"})}),"\n",(0,i.jsx)(t.p,{children:"It shows the filters now. But\u2026"}),"\n",(0,i.jsx)(t.p,{children:"When you add or remove columns, the filters are not updated.\nThe desired behavior is: when the user adds a new column, the filter for this column is also added.\nIn other words, synchronize columns and filters states.\nMaybe this will help?"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"function FiltersProvider() {\n  const [columns] = useContext(ColumnsCtx)\n  const [...] = useState(columns)\n  ...\n}\n"})}),"\n",(0,i.jsxs)(t.p,{children:["Nope. Filters are still static because the ",(0,i.jsx)(t.code,{children:"useState"})," argument is used at the first render only.\nWe need to update the filters state somehow."]}),"\n",(0,i.jsx)(t.p,{children:"\xa0"}),"\n",(0,i.jsx)(t.h2,{id:"state-synchronization",children:"State synchronization"}),"\n",(0,i.jsx)(t.h3,{id:"1-direct-setters-approach",children:"1. Direct Setters Approach"}),"\n","\n",(0,i.jsx)(z,{}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"const onAddColumnClick = (attribute) => {\n    addColumn(attribute)\n    addFilter(attribute)\n}\n"})}),"\n",(0,i.jsx)(t.p,{children:"This works. Finally\u2026 Oops. You forgot to synchronize the remove column handler.\nFast forward. 2028. You are implementing reset columns to default. Oops. Forgot to reset filters as well.\nFast forward. 2029. Implementing column presets. Oops. Forgot to update filters as well.\nFast forward. 2030. Oops\u2026"}),"\n",(0,i.jsx)(t.p,{children:"You got the idea. This way you need to keep in mind, every time some functionality which updates columns is added, you need to update filters as well.\nThis is unmaintainable and error-prone."}),"\n",(0,i.jsx)("ul",{className:"list-none pl-2",children:(0,i.jsx)(o,{children:"Simple"})}),"\n",(0,i.jsx)("ul",{className:"list-none pl-2",children:(0,i.jsx)(l,{children:"Unmaintainable in a long run"})}),"\n",(0,i.jsx)(t.p,{children:"\xa0"}),"\n",(0,i.jsx)(t.h3,{id:"2-centralized-gate-setter-approach",children:"2. Centralized Gate Setter Approach"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"function ColumnsProvider() {\n  const [columns, setColumnsInner] = useState(initColumns)\n  const { setFilters } = useContext(FiltersContext)\n  const setColumns = (columns) => {\n    setColumnsInner(columns)\n    setFilters(columns)\n  }\n  // use setColumns instead of setColumnsInner\n  ...\n}\n"})}),"\n",(0,i.jsxs)(t.p,{children:["So naturally you centralized state update logic and moved the setter closer to the state, creating some kind of gate where all updates must come through.\nIn ",(0,i.jsx)(t.code,{children:"ColumnsProvider"}),", you implemented a ",(0,i.jsx)(t.code,{children:"setColumns"})," wrapper function."]}),"\n",(0,i.jsx)(t.p,{children:"It works\u2026 Oops. Now, when you add a new column, all filters are reset.\nSo you need to write some merge function which modifies only filters that changed."}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"const setColumns = (columns) => {\n    setColumnsInner(columns)\n    setFilters(prevFilters =>\n        mergeFilters(prevFilters, columns)\n    );\n}\n"})}),"\n",(0,i.jsxs)(t.p,{children:["It is definitely a better approach, but if you\u2019re like me, you feel it is still fragile in the long run.\nAfter some years and several new colleagues, somebody will create code that calls ",(0,i.jsx)(t.code,{children:"setColumnsInner"})," directly without your gate."]}),"\n",(0,i.jsxs)(t.p,{children:["I also find it unexpected and confusing that ",(0,i.jsx)(t.code,{children:"ColumnsProvider"})," depends on ",(0,i.jsx)(t.code,{children:"FiltersContext"}),", but I\u2019ll let you decide if that\u2019s your view too.\nI would expect it the other way around."]}),"\n",(0,i.jsxs)(t.p,{children:["You might also end up with cyclic dependency because, if you remember the initialization logic above, you know ",(0,i.jsx)(t.code,{children:"FiltersProvider"})," depends on ",(0,i.jsx)(t.code,{children:"ColumnsContext"}),".\nSo we need to use constant for initializing filters instead, which creates a needs to keep the initial value in sync too."]}),"\n",(0,i.jsx)("ul",{className:"list-none pl-2",children:(0,i.jsx)(o,{children:"Better maintainability"})}),"\n",(0,i.jsxs)("ul",{className:"list-none pl-2",children:[(0,i.jsx)(l,{children:"Need for merging function"}),(0,i.jsx)(l,{children:"Reverted dependency"}),(0,i.jsx)(l,{children:"Cyclic dependency"})]}),"\n",(0,i.jsx)(t.p,{children:"Is there a better option?"}),"\n",(0,i.jsx)(t.p,{children:"\xa0"}),"\n",(0,i.jsx)(t.h3,{id:"3-effect-approach",children:"3. Effect Approach"}),"\n","\n",(0,i.jsx)(L,{}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"const [columns] = useContext(ColumnsCtx)\nconst [setFilters] = useContext(FiltersCtx)\nuseEffect(() => {\n    setFilters(prevFilters =>\n        mergeFilters(prevFilters, columns)\n    );\n});\n"})}),"\n",(0,i.jsxs)(t.p,{children:["You may think of ",(0,i.jsx)(t.code,{children:"useEffect"}),". It can react to any change to columns state.\nOops. Again, we need to use the ",(0,i.jsx)(t.code,{children:"mergeFilters"})," function to avoid resetting all filters."]}),"\n",(0,i.jsxs)(t.p,{children:["But there is a bigger problem. ",(0,i.jsx)(t.code,{children:"useEffect"})," is not synchronous, and it does not run in the same render cycle.\nSo when you add a new column, the filters are not updated immediately.\nThere is a brief timeframe where your filters are not in sync with columns."]}),"\n",(0,i.jsx)(t.p,{children:"It can be a source of bugs and glitches.\nThe UI jumps back and forth. It is visually disturbing and can break animations."}),"\n",(0,i.jsx)(t.p,{children:"But probably most importantly, it causes double refetch, which can cause performance problems, stress the server with useless load, and increase our bill."}),"\n",(0,i.jsxs)("ul",{className:"list-none pl-2",children:[(0,i.jsx)(o,{children:"Good maintainability"}),(0,i.jsx)(o,{children:"No weird dependencies"})]}),"\n",(0,i.jsxs)("ul",{className:"list-none pl-2",children:[(0,i.jsx)(l,{children:"Asynchronous update"}),(0,i.jsx)(l,{children:"UI glitches"}),(0,i.jsx)(l,{children:"Doubled fetching"}),(0,i.jsx)(l,{children:"Need for merging function"})]}),"\n",(0,i.jsxs)(t.p,{children:["Do not use ",(0,i.jsx)(t.code,{children:"useEffect"})," for synchronizing states."]}),"\n",(0,i.jsx)(t.p,{children:"\xa0"}),"\n",(0,i.jsx)(t.h3,{id:"4-selector-approach",children:"4. Selector Approach"}),"\n","\n",(0,i.jsx)(G,{}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"function useFilters() {\n  const [attributes] = useContext(AttributesCtx)\n  const [filters] = useContext(FiltersCtx)\n  return attributes.map((attribute) => {\n    const filter = filters[attribute]\n    return { attribute, ...filter }\n  })\n}\n"})}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"type Filters = {\n    [attribute: string]: {\n        operator?: '='|'>'|'<',\n        value?: string|number\n    }   \n}\n"})}),"\n",(0,i.jsx)(t.p,{children:"What you encountered is a problem with state synchronization caused by duplicate state.\nFilters and columns are different entities, but part of their state is duplicated and can be shared.\nIt\u2019s about visible attributes. So we extract the visible attributes from both states and derive visible columns and filters from them.\nLet\u2019s step into a time machine and go back to 2027, where we were shaping filters state."}),"\n",(0,i.jsxs)(t.p,{children:["We want to change the semantics of the filters state. It will not hold which filters are visible but just which attributes are filtered.\nWe adjust the shape of the filters and make it a dictionary.\nThe ",(0,i.jsx)(t.code,{children:"useFilters"})," hook will merge two states: visible attributes and modified filters.\nThe benefit is that we do not have to initialize the state at all.\nSince columns don\u2019t contain any additional state beyond attributes, we can use attributes directly in the same manner as columns before (this is not always the case, but let\u2019s keep this example simple)."]}),"\n",(0,i.jsx)(t.p,{children:"This way, filters will always be the same as columns.\nEven if the filters state is empty, there is no need for initialization.\nThe change is synchronous. No glitches. No useless refetches.\nColumns are independent of Filters.\nThe column state can be updated in any way, and the reactivity system will take care of rerunning this derivation logic."}),"\n",(0,i.jsxs)(t.p,{children:["You might argue someone can forget to use this hook and access the filters state directly.\nYou are right.\nSo what\u2019s the advantage compared to the ",(0,i.jsx)(t.code,{children:"setColumns"})," wrapper function?\nBut IMHO, it is less likely to happen because one will experience an empty state at first sight."]}),"\n",(0,i.jsx)(t.p,{children:"Also, this derivation logic (selector) is easier to maintain than a setter (action) because it is reactive.\nWe just focus on control logic, not when it should be called.\nThe reactive system takes care of it."}),"\n",(0,i.jsx)(t.p,{children:"It is fair to say that there is a hidden user experience difference.\nWhen the attribute is filtered, then removed and added again, it holds the previous filter values.\nTherefore, orders are filtered after the column is added back.\nSometimes it is even desired, but in this stuation it is unintuitive, and I see it as a disadvantage here.\nIt is fixable by some of the previously mentioned methods (setter, gate setter, or effect).\nBut I will keep this article short and will not go into detail with this.\nI see this as an edge-case, and IMHO mentioned benefits outweigh this disadvantage.\nBut feel free to make your own opinion."}),"\n",(0,i.jsxs)("ul",{className:"list-none pl-2",children:[(0,i.jsx)(o,{children:"Good maintainability"}),(0,i.jsx)(o,{children:"No weird dependencies"}),(0,i.jsx)(o,{children:"Synchronous update"}),(0,i.jsx)(o,{children:"No UI glitches"}),(0,i.jsx)(o,{children:"Single fetch"})]}),"\n",(0,i.jsx)("ul",{className:"list-none pl-2",children:(0,i.jsx)(l,{children:"Overly persistent state"})}),"\n",(0,i.jsx)(t.p,{children:"\xa0"}),"\n",(0,i.jsx)(t.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsx)(t.p,{children:"In 2027, we made a quite dangerous assumption: that columns and filters must be in sync.\nIt is an invariant of your state shape, which TypeScript is not able to check. Therefore, you need to handle it manually.\nThis was just one example inspired by a real-world problem. But I frequently see developers using effects and setters to synchronize states.\nSelectors generally provide more maintainable solutions, are synchronous, and ensure immediate, predictable updates."}),"\n",(0,i.jsx)(t.p,{children:"IMHO, these state invariants represent a bad code smell.\nThey frequently cause bugs, glitches, and performance issues.\nTry to develop a nose for these invariants and pay attention when someone introduces one into your app."}),"\n",(0,i.jsxs)(t.p,{children:["I know the world out there is wild. Perhaps your junior colleague has already created a shape like this,\nand it\u2019s deeply baked into your app, leaving no time to refactor.\nIn such a case, I would recommend going with the gate setter solution.\nDefinitely avoid ",(0,i.jsx)(t.code,{children:"useEffect"})," if possible.\nAdditionally, consider implementing a function that checks invariants that must always hold true for your state.\nYou can run this function within your derivation logic (selectors) to alert you immediately if an invariant breaks."]}),"\n",(0,i.jsx)(t.p,{children:"Hope I\u2019ve given you some material to think about. As always, if you disagree with me, I encourage you to get in touch. In any case\u2026"}),"\n",(0,i.jsx)(t.p,{children:"Thanks for reading."}),"\n","\n",(0,i.jsx)(t.p,{children:"TBD Discuss links:"}),"\n",(0,i.jsx)(K.A,{twitter:"https://x.com/search?q=https%3A%2F%2Fondrejvelisek.github.io%2Favoid-the-state-synchronization-trap%2F",li:"https://dev.to/ondrejvelisek/avoid-the-state-synchronization-trap",bsky:"https://dev.to/ondrejvelisek/avoid-the-state-synchronization-trap"}),"\n",(0,i.jsx)(t.p,{children:"\xa0"})]})}function ne(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(te,{...e})}):te(e)}}}]);