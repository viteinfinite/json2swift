[![Logo](http://viteinfinite.github.io/json2swift/images/logo.svg)]()β

[![Build Status](https://travis-ci.org/viteinfinite/json2swift.svg?branch=master)](https://travis-ci.org/viteinfinite/json2swift)
[![Coverage Status](https://coveralls.io/repos/github/viteinfinite/json2swift/badge.svg?branch=master)](https://coveralls.io/github/viteinfinite/json2swift?branch=master)

Automatically create Swift entities from [JSON](http://www.json.org).

## HTML interface

The **most straightforward** way to use JSON2Swift is through the [JSON2Swift Web page](https://viteinfinite.github.io/json2swift), available at:

[https://viteinfinite.github.io/json2swift](https://viteinfinite.github.io/json2swift)

## Usage

Click and type and click the HTML interface.

### Build from sources

You can also build from sources by performing

```
npm install
node node_modules/gulp/bin/gulp.js build
```

You'll then be able to use the `parseDocument(JSON, [writers])` function against a JavaScript object and by providing a list of writers.

### Writers

The writers, i.e. the output format, currently supported are currently:

- `writers.base`, supporting `struct`s
- `writers.class`, supporting `class`es
- `writers.nsObject`, supporting `NSObject`s
- `writers.argo`, supporting [Argo](https://github.com/thoughtbot/Argo)
- `writers.unbox`, supporting [Unbox](https://github.com/JohnSundell/Unbox)
- `writers.jsonJoy`, supporting [JSONJoy](https://github.com/daltoniam/JSONJoy-Swift)
- `writers.realm`, supporting [Realm](https://realm.io)

Writers can be mixed and matched. For instance, you could provide the `parseDocument` function with an array composed of `nsObject` and `argo` writers:

```
parseDocument({"key": "value"}, [writers.base, writers.nsObject, writers.argo])
```

## Credits

- Simone Civetta ([@viteinfinite](https://twitter.com/viteinfinite)) - [Xebia France](http://xebia.fr)
- _Thanks to_ [Paride Broggi](http://www.paridebroggi.com) for the precious feedback

### JSON2Swift is supported by

<a href="http://www.xebia.fr/"><img src="http://viteinfinite.github.io/json2swift/images/xebia-fr-logo.png" width="100" title="Xebia France"></a>

## Contributing

You are encouraged to read [the contributing document](CONTRIBUTING.md) available in this repository. Thanks for your feedback!