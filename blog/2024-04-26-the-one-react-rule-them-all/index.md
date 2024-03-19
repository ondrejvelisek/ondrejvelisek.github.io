---
draft: true
---

# The one React rule them all

About a month ago I read post by Dan - [The Two Reacts](https://overreacted.io/the-two-reacts/).
It is a great text told as a sequence of implications resulting in a final conclusion `UI = f(data, state)`.
The form feels like a formal proof. I love it.
At the end he calls me to think about how the conclusion should be implemented in a wild.
And even if he doesn't say it out loud, it seems he believes the new RSC paradigm is the right way to do it.
With all the respect I disagree. Here is why.

<!-- truncate -->


## `UI` is not `f(data, state)`

First of all I want to expand on the Dan's idea `UI = f(data, state)`.
Quick reminder: `state` refers to a local device variable. Or in-memory variable.
`data` refers to a server accesible information. Like a file stored on a server or database.
I believe this is incomplete or misleading view.

- Ticking clock UI depends on `time`
- Drawing canvas UI depends on mouse `input` position.
- User profile UI depends on session token stored in `cookie`.
- Keep me signed on this device UI depends on flag in `localStorage`.
- Blog post UI depends on slug present in `URL` address
- OS prefered dark mode UI depends on `OS` setting
- Devtools debug UI depends on `env` variable
- Server files explorer UI depends on server `file system`
- Newest movies list UI depends on Open Movie Database `service API`
- Panoramatic UI depends on scroll position of `DOM` elemnt
- ... OK you got the idea.

Are all those information which my UI depends on hidden behind `state` or `data`?

This philosophy reminds me something.

React query https://tkdodo.eu/blog/react-query-as-a-state-manager 

https://www.youtube.com/watch?v=ukpgxEemXsk 

https://twitter.com/kentcdodds/status/1349173470567964673?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1349173470567964673%7Ctwgr%5E866f421f0daecc1943cdba3fa70ed8c37f5abbd5%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fwww.pierrehedkvist.com%2Fposts%2Freact-state-url

Back to the origin. So the formula is more like:
```js
UI = f(data, state, url, cookies, localStorage, mouse, keyboard, time, dom, ...)
```
Lets call this a **holistic state philosophy** and put it as:
```js
UI = f(holisticState)
```





## As a developer I do not want to care in a first place, Prototype first přístup


Ideally I do not want to take care which device/environment is involved. It is just about performance. 
Framework should do the magic and do its best. If Im not satisfied, I can dive into performance optimization.

