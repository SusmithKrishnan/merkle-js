# Merkle-JS
[![NPM version](https://badge.fury.io/js/merkle-js.svg)](http://badge.fury.io/js/merkle-js)
[![Build Status](https://travis-ci.org/SusmithKrishnan/merkle-js.svg?branch=master)](https://travis-ci.org/SusmithKrishnan/merkle-js)

Merkle tree implementation in Javascript

![Merkle](https://i.ibb.co/VtjmGf4/1.png)

#

## Description

A lightweight library using the native **crypto** for hash functions without any additional dependency.
Generate Merkle tree from an array of data. Each element in the input array is hashed with the selected hashing algorithm and added to leaf nodes. However, if the input itself is a valid hash in hex the value is directly pushed to the leaf nodes without hashing it again.

> On each new layer concatenation operation is done on the hash buffers instead of the string representation of the hash.

<br />

**What if the input array is an odd number?**

If the input array is uneven the last element will be skipped to the next node without any operation.

![merkle odd number](https://i.ibb.co/0fMSDfM/2.png)

<br />

## Nodejs Quick Start

```bash
npm i merkle-js
```

```js
const Merkle = require("merkle-js");

var data = ["Hello", "world", "loerm", "ipsum"]; //array of data
var tree = new Merkle(data);
```

Get full Merkle tree hashes

```js
> tree.getFullTree('hex');
[
  [
    '981669af653abb6b20e9aa74d5e29aef87c721243946b74d16e7559b682e7aab'
  ],
  [
    '0f005576b945f8bd863ff0859b4c6af87b9eefd94c01ac5c83329b28b8fe325b',
    '7f4012278342986fd939c72c617f2a4a215a62afb122080e11600d744e1b83bd'
  ],
  [
    '185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969',
    '486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7',
    'c6704b1cee96462c48f1a68d3b96cae7adee27f097b3a9bf8bbd5e59ac21a430',
    '0417c537e65d8e41ee92b7257726086854a8f41cd884842f52dcf05caf4109a4'
  ]
] //returns full tree in array
```

Get the root hash

```js
> tree.getRoot('hex');
'981669af653abb6b20e9aa74d5e29aef87c721243946b74d16e7559b682e7aab'
```

Get levels count

```js
> tree.getLevels();
3
```

Get Depth

```js
> tree.getDepth();
2
```

Get nodes count excluding leaves

```js
> tree.getNodes();
3
```

Get nodes in a level

```js
> tree.getLevel(1, 'hex');
[
  '0f005576b945f8bd863ff0859b4c6af87b9eefd94c01ac5c83329b28b8fe325b',
  '7f4012278342986fd939c72c617f2a4a215a62afb122080e11600d744e1b83bd'
] // returns hashes of level 1 in array
```

<br /><br />

## Advanced Usage

<br />

### **Selecting the hashing algorithm**

By default hashing algorithm is set to **sha256**. Change it by setting the second parameter of the constructor.

```js
var tree = new Merkle(data, "sha1");
```

List of currently supported algorithms:
```js
 [md5, sha1, ripemd160, sha256, sha512, whirlpool ]
```

### **Select output encoding**
By default input values are converted and represented as Buffers as all hash operations are done on the buffers. Change it to any supported encoding by **Buffer** 

```js
> tree.getRoot('base64')
'mBZpr2U6u2sg6ap01eKa74fHISQ5RrdNFudVm2gueqs='
```
```js
> tree.getRoot()
<Buffer 98 16 69 af 65 3a bb 6b 20 e9 aa 74 d5 e2 9a ef 87 c7 21 24 39 46 b7 4d 16 e7 55 9b 68 2e 7a ab> 
```

<br />

## License
**GPL v3**
