[![Libe](http://msrv.su/files/libe.png)](https://github.com/mirrr/libe) 

Small solution for easy nodejs libraries connection
    
    
## How To Install   
```bash
npm install libe --save
```
    
    
## Getting Started
Put your files into the directory /lib and they will be available everywhere:

```js
var through = lib('through');    
var duplexer = lib('duplexer');    
var myModule = lib('myModule');
```
    
    
## Example

**index.js:**    
```js
require('libe');

// include file `my.js` from /lib
var my = lib('my');

my.func();
```

**lib/my.js:**    
```js
// include file `great.js` from /lib
var great = lib('great');

exports.func = great.func;
```

**lib/great.js:**    
```js
exports.func = function () {
    console.log("Aloha!");
};
```
    

## What else?
Initialize your modules! So simple. You need to add `exports.init` method into your library. Like this:


**lib/my.js:**    
```js
var great = lib('great');

exports.init = function (callback) {
    console.log('Module `my.js` initialized!');
    callback();
}
exports.func = great.func;
```

**lib/great.js:**    
```js
exports.init = function (callback) {
    after(['my'], function () {
        console.log('Module `great.js` initialized after `my.js`!');
        callback();
    });
}
exports.func = function () {
    console.log("Aloha!");
};

```

Then you need to call `libe.init`:    

**index.js:**    
```js
var libe = require('libe');
var my = lib('my');

libe.init(function () {
    my.func();
});
```

## Change directory path
```js
var libe = require('libe');

libe.setPath('/srv/myProject2/libs');
```

or:

```js
var libe = require('libe');

libe.init('/srv/myProject2/libs', function () {
    // ...
});
```

## People

Author is [Oleksiy Chechel](https://github.com/mirrr)   

[List of all contributors](https://github.com/mirrr/libe/graphs/contributors)   


## License
   
MIT License   
   
Copyright (C) 2014 Oleksiy Chechel (alex.mirrr@gmail.com)   
   
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:   
   
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.   
   
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
