# roundme-ios-gyro-patch

> Workaround for WebKit bug 152299 (https://bugs.webkit.org/show_bug.cgi?id=152299)


## Install

```
$ npm install roundme-ios-gyro-patch
```


## Usage

for static html page, you have to just load script to page

```js
var roundmeIosGyroPatch = require('roundme-ios-gyro-patch');

```

for dynamic iframe loading (ajax)

```js
var roundmeIosGyroPatch = require('roundme-ios-gyro-patch');

// call when iframe loaded
roundmeIosGyroPatch()

```
