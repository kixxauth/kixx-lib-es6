Kixx
====
A loosely coupled set of tools and libraries for ES6 JavaScript applications.

Installation
------------

```
$ npm install --save kixx-lib-es6
```

## Library
Import the library like this:

```js
const lib = require('kixx-lib-es6');

// Or, using destructuring:
const {compact} = require('kixx-lib-es6');

lib.compact === compact; // true
```

### compact()
__`compact(list)`__

parameter | type | description
--------- | ---- | -----------
list | Array | A list to filter

Returns a new list with all the falsy values filtered out.

### deepFreeze()
__`deepFreeze(object)`__

parameter | type | description
--------- | ---- | -----------
object | Object | An Object to deeply freeze.

Returns the passed Object after recursively calling Object.freeze() deeply throughout.

### mergeDeep()
__`mergeDeep(target, ...sources)`__

parameter | type | description
--------- | ---- | -----------
target | Object | The target object to merge into.
sources | Objects | Source objects to merge into the target.

Returns the target Object after deeply merging all passed in Objects from left to right. The right most Object has precedence. The target object will be mutated. Source objects will not be mutated.

Will throw a TypeError if the target prototype is not Object.prototype or null.


### random()
__`random(min, max)`__

parameter | type | description
--------- | ---- | -----------
min | Number | The *inclusive* minimum.
max | Number | The *exclusive* maximum.

Returns a random Integer from min (inclusive) to max (exclusive). Is automatically curried.

### sampleOne()
__`sampleOne(list)`__

parameter | type | description
--------- | ---- | -----------
list | Array | An Array.

Returns a single random element from the given Array.

### clamp()
__`clamp(min, max, n)`__

parameter | type | description
--------- | ---- | -----------
min | Number | The *inclusive* minimum.
max | Number | The *exclusive* maximum.
n   | Number | The Number to clamp.

Returns Number n only if it is greater then or equal to the minimum and less than the maximum. Otherwise, return the min or max as appropriate.

### capitalize()
__`capitalize(str)`__

parameter | type | description
--------- | ---- | -----------
min | String | The String to capitalize.

Uppercase the first character of the given String and return the new String.

Copyright and License
---------------------
Copyright: (c) 2017 - 2018 by Kris Walker (www.kixx.name)

Unless otherwise indicated, all source code is licensed under the MIT license. See MIT-LICENSE for details.

