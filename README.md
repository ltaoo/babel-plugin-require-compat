# babel-plugin-require-compat

## Why

`babel@6.x` 对应 `import` 语句的处理

```js
import foo from './foo';
```

编译成

```js
var _foo = require('./foo');
var _foo2 = _interopRequireDefault(_foo);
```

在升级到 `babel@7.x` 后，编译的代码变成了

```js
var _foo = _interopRequireDefault(require('./foo'));
```

而 `fis3-hook-css-module` 这个插件，依赖第一种编译结果，原始代码为

```less
// index.less
.page {
	.container {
		font-size: 12px;
	}
}
```
```
// index.js
import styles from './index.less';
```

会被编译成

```js
var _index = require('./index.less');
var _index2 = _interopRequireDefault(_index);
```

继而由 `fis3-hook-css-module` 插件转换成

```js
var _index = { page: 'page_1s1kr_1' };"";(function() {
	// 会将编译后的 less 代码以 style 标签插入页面
})();;
var _index2 = _interopRequireDefault(_index);
```

但是升级到 `babel@7.x` 后，代码变成了

```js
var _index = _interopRequireDefault({ page: 'page_1s1kr_1' };"";(function() {

	// 会将编译后的 less 代码以 style 标签插入页面
})();;);
```

页面就报错，不能正常运行，该插件是为了兼容这种情况开发的。

## Usage

```bash
yarn add babel-plugin-require-compat -D
```
