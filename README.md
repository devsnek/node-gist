# Node Gist

```js
const gist = require('snekgist');

gist('hello').then(res => {
  console.log(res.html_url);
});
```
