# Node Gist

```js
const gist = require('gist');

gist('hello').then(res => {
  console.log(res.html_url);
});
```
