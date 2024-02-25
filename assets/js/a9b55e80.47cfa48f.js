"use strict";(self.webpackChunk_torrta_docs=self.webpackChunk_torrta_docs||[]).push([[824],{9940:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>m,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var s=n(7e3),r=n(7472);const a={},o="Practical limits of React hooks - Recursion",i={permalink:"/blog/2022/03/23/practical-limits-of-react-hooks-recursion",source:"@site/blog/2022-03-23-practical-limits-of-react-hooks-recursion/index.md",title:"Practical limits of React hooks - Recursion",description:"While ago, I started using React hooks. The simplicity, homogenity and composability sounded great.",date:"2022-03-23T00:00:00.000Z",formattedDate:"March 23, 2022",tags:[],readingTime:3.87,hasTruncateMarker:!0,authors:[],frontMatter:{},unlisted:!1,prevItem:{title:"What is great on hooks & forget in RSC?",permalink:"/blog/2024/02/23/what-the-f-is-f"}},d={authorsImageUrls:[]},l=[{value:"Model app",id:"model-app",level:2},{value:"Pleasant walk with basic hooks",id:"pleasant-walk-with-basic-hooks",level:2},{value:"Obstacles with looping",id:"obstacles-with-looping",level:2},{value:"Limits with recursion",id:"limits-with-recursion",level:2},{value:"Last words",id:"last-words",level:2}];function c(e){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",p:"p",pre:"pre",...(0,r.M)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.p,{children:"While ago, I started using React hooks. The simplicity, homogenity and composability sounded great.\nBoth components and hooks are simple functions. I can easily react on state changes from memory,\nlocal storage, location URL and server the same way - with hooks. Mental model stays simple.\nMy app is just a big function which consumes state and produces DOM. This big function is composed\nof a smaller functions which are composed of smaller functions and so on. But there were obstacles\nI've started to encounter and in the end I hit the hard limit of React hooks."}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsxs)(t.p,{children:["UPDATE 2024: new React ",(0,s.jsx)(t.a,{href:"https://react.dev/reference/react/use",children:(0,s.jsx)(t.code,{children:"use"})})," hook may finally solve following limitation\n(if you accept ",(0,s.jsx)(t.code,{children:"<Suspense/>"})," as a good pattern)"]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"model-app",children:"Model app"}),"\n",(0,s.jsx)(t.p,{children:"Each app has some data model defined with entities and relations between them. Lets say we have company\nDepartment and Employee where department consists of other departments and/or direct employees.\nOne employee can directly work for exactly one department. Cycles in department hierarchy are prohibited."}),"\n",(0,s.jsx)(t.p,{children:"Our Backend implements REST endpoints."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-code",metastring:'title="/departments"',children:"returns list of all department ids\n"})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-code",metastring:'title="/departments/:departmentId"',children:"returns list of sub-department ids\nand list of direct employee ids\n"})}),"\n",(0,s.jsx)(t.p,{children:"There are three product requirements."}),"\n",(0,s.jsx)(t.h2,{id:"pleasant-walk-with-basic-hooks",children:"Pleasant walk with basic hooks"}),"\n",(0,s.jsx)(t.p,{children:"First product requirement is simple. User selects a department and wants to see number of direct employees.\nPfff, its simple. Just implement this custom hook which uses department REST endpoint and use it in a component."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-tsx",children:"const useDirectEmployeeCount(\n    departmentId: string\n): number =>\n    useDirectEmployeeIds(departmentId).length\n"})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-tsx",children:"const useDirectEmployeeIds(\n    departmentId: string\n): Array<string> =>\n    useDepartment(departmentId).directEmployeeIds\n"})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-tsx",children:"const useDepartment(\n    departmentId: string\n): Department =>\n    useQuery(\n        ['departments', departmentId],\n        () => fetch(`/departments/${departmentId}`)\n    ).data\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Our backend implements exactly this endpoints so we use ",(0,s.jsx)(t.code,{children:"react-query"})," and we are done.\nThere are some loading and error states which I omitted, we can use fancy Suspend and ErrorBoundary,\nbut we understand the code."]}),"\n",(0,s.jsx)(t.h2,{id:"obstacles-with-looping",children:"Obstacles with looping"}),"\n",(0,s.jsx)(t.p,{children:"Second product requirement is simple. User needs to select multiple departments and see sum of direct employees.\nOk, simple. I already have code for one. So simply loop it over multiple selected departments and sum the result."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-tsx",children:"const totalCount = sum(\n    departmentIds.map(\n        departmentId => useDirectEmployeeCount(departmentId)\n    )\n)\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Wait! It is a hook and there are rule of hooks. Anoying but still doable.\nLets reimplement ",(0,s.jsx)(t.code,{children:"useDirectEmployeeCount"})," to support multiple department ids.\nThen I can sum them like this."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-tsx",children:"const departmentCounts = useDirectEmployeeCount(departmentIds)\nconst totalCount = sum(departmentCounts)\n"})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-tsx",children:"const useDirectEmployeeCount(\n    departmentIds: Array<string>\n): Array<number> =>\n    useDirectEmployeeIds(departmentIds)\n        .map(employeeIds => employeeIds.length)\n"})}),"\n",(0,s.jsxs)(t.p,{children:["But wait! I need to reimplement ",(0,s.jsx)(t.code,{children:"useDirectEmployeeIds"})," too. Very anoying."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-tsx",children:"const useDirectEmployeeIds(\n    departmentIds: Array<string>\n): Array<Array<string>> =>\n    useDepartment(departmentIds)\n        .map(department => department.directEmployeeIds)\n"})}),"\n",(0,s.jsx)(t.p,{children:"But wait! Grrr..."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-tsx",children:"const useDepartment(\n    departmentIds: Array<string>\n): Array<Department> =>\n    useQueries(departmentIds.map(departmentId => ({\n        queryKey: ['departments', departmentId],\n        queryFn: () => fetch(`/departments/${departmentId}`)\n    })))\n        .map(result => result.data)\n"})}),"\n",(0,s.jsx)(t.p,{children:"Uf. Done. I'm glad it is a small project with just three hooks. Tell me the last requirement."}),"\n",(0,s.jsx)(t.h2,{id:"limits-with-recursion",children:"Limits with recursion"}),"\n",(0,s.jsx)(t.p,{children:"Third and last product requirement is simple. User needs to select department and see sum of direct and\nindirect employees (including employees from all sub-departments and their sub-departments and so on).\nOk, simple. I already have code for multiple departments. So simply recursively call it and sum the result."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-tsx",children:"const useIndirectEmployeeCount(\n    departmentIds: Array<string>\n): Array<number> => {\n    const directCount = useDirectEmployeeCount(departmentIds);\n    const departments = useDepartment(departmentIds);\n    const subDepartmentIds = departments.flatMap(department => department.subDepartmentIds);\n    const indirectCount = useIndirectEmployeeCount(subDepartmentIds);\n    return directCount + indirectCount\n}\n"})}),"\n",(0,s.jsx)(t.p,{children:"Wait."}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsx)(t.p,{children:"Error: Maximum Call Stack Size Exceeded"}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"Oh. You almost got me. I just forgot a recursive break, right?"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-tsx",children:"const useIndirectEmployeeCount(\n    departmentIds: Array<string>\n): Array<number> => {\n    const directCount = useDirectEmployeeCount(departmentIds);\n    const departments = useDepartment(departmentIds);\n    const subDepartmentIds = departments.flatMap(department => department.subDepartmentIds);\n    if (subDepartmentIds.length === 0) {\n        return directCount;\n    }\n    const indirectCount = useIndirectEmployeeCount(subDepartmentIds);\n    return directCount + indirectCount\n}\n"})}),"\n",(0,s.jsx)(t.p,{children:"Wait."}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsx)(t.p,{children:'Error: React Hook "useIndirectEmployeeCount" is called conditionally.'}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"..."}),"\n",(0,s.jsx)(t.h2,{id:"last-words",children:"Last words"}),"\n",(0,s.jsx)(t.p,{children:"Mental model stays simple. Everything is a simple function. My app is one big function composed of smaller and\nsmaller ones. It trully sounds great! But in a real world, hooks are not so simple, homogen and composable.\nThere are obstacles and limits mainly because of rule of hooks."}),"\n",(0,s.jsx)(t.p,{children:"This post is not about saying React hooks are bad. I wrote it because I did not find any resources\non such obstacles and limits. The React world looks like hooks are always pleasant walk trought the rosy garden.\nBut they are not."}),"\n",(0,s.jsx)(t.p,{children:"For now I don't know how to elegantly solve the recusrion example. Are there some resources on this?\nDo you have following thougts? Maybe I'm not the only one struggling. Thanks for reading."})]})}function m(e={}){const{wrapper:t}={...(0,r.M)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},7472:(e,t,n)=>{n.d(t,{I:()=>i,M:()=>o});var s=n(5668);const r={},a=s.createContext(r);function o(e){const t=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(a.Provider,{value:t},e.children)}}}]);