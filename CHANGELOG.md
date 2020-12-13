# [0.8.0](https://github.com/jbedard/imuter/compare/v0.7.0...v0.8.0) (2020-12-13)


### Bug Fixes

* **array:** avoid returning new object when operations noop ([42e32bc](https://github.com/jbedard/imuter/commit/42e32bcb161b8e6406b1ba94536467cef81f5c14))



# [0.7.0](https://github.com/jbedard/imuter/compare/v0.6.0...v0.7.0) (2020-08-05)


### Bug Fixes

* add tslib as a peerDependency ([3701c43](https://github.com/jbedard/imuter/commit/3701c43843c7976a6316b18e256b9c95115c7d1b))
* ignore instead of throw when attempting to freeze unsupported types such as DOM nodes ([75dd3e9](https://github.com/jbedard/imuter/commit/75dd3e9b4ce921c1af3ccfd84a7ab7e3c652b427)), closes [#14](https://github.com/jbedard/imuter/issues/14)
* **jasmine:** remove use of /// <reference ...> ([a764f81](https://github.com/jbedard/imuter/commit/a764f81eb11c3f5bcae15619e7f9f709178f363e))
* **umd:** add amd module-name to UMD bundle ([622b6a9](https://github.com/jbedard/imuter/commit/622b6a9f7ce6ff31d389247fc0958e661a8b9fcd))


### Features

* upgrade to tslib ^2.0.0 ([5d15464](https://github.com/jbedard/imuter/commit/5d15464c5cfe0f56a6116e8de7069643d8457629))
* **array_sort:** add array sort method ([2a534b0](https://github.com/jbedard/imuter/commit/2a534b0928851f2930d603212a6499b613c5ff57))



# [0.6.0](https://github.com/jbedard/imuter/compare/v0.5.0...v0.6.0) (2020-02-06)


### Bug Fixes

* add tslib as a peerDependency ([3701c43](https://github.com/jbedard/imuter/commit/3701c43843c7976a6316b18e256b9c95115c7d1b))
* **jasmine:** remove use of /// <reference ...> ([a764f81](https://github.com/jbedard/imuter/commit/a764f81eb11c3f5bcae15619e7f9f709178f363e))
* **umd:** add amd module-name to UMD bundle ([622b6a9](https://github.com/jbedard/imuter/commit/622b6a9f7ce6ff31d389247fc0958e661a8b9fcd))


### Features

* **array_sort:** add array sort method ([2a534b0](https://github.com/jbedard/imuter/commit/2a534b0928851f2930d603212a6499b613c5ff57))



## [0.5.1](https://github.com/jbedard/imuter/compare/v0.5.0...v0.5.1) (2019-08-29)


### Bug Fixes

* **umd:** add amd module-name to UMD bundle ([622b6a9](https://github.com/jbedard/imuter/commit/622b6a9))



# [0.5.0](https://github.com/jbedard/imuter/compare/v0.4.0...v0.5.0) (2019-08-29)


### Features

* provide various bundle types via APF ([3edca86](https://github.com/jbedard/imuter/commit/3edca86))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/jbedard/imuter/compare/v0.1.0...v0.3.0) (2018-09-25)


### Bug Fixes

* **object_assign:** support more then 4 objects being merged ([6b41b68](https://github.com/jbedard/imuter/commit/6b41b68))


### Performance Improvements

* allow freezing to be dropped completely in production ([332eb8f](https://github.com/jbedard/imuter/commit/332eb8f))
* **array_exclude:** avoid creating a closure per invocation ([38205a9](https://github.com/jbedard/imuter/commit/38205a9))
* **array_filter, array_exclude:** return same instance if nothing is filtered out/excluded ([21add86](https://github.com/jbedard/imuter/commit/21add86)), closes [#1](https://github.com/jbedard/imuter/issues/1)



<a name="0.2.0"></a>
# [0.2.0](https://github.com/jbedard/imuter/compare/492d240...v0.2.0) (2018-08-25)


### Performance Improvements

* allow freezing to be dropped completely in production ([332eb8f](https://github.com/jbedard/imuter/commit/332eb8f))
* **array_exclude:** avoid creating a closure per invocation ([38205a9](https://github.com/jbedard/imuter/commit/38205a9))
* **array_filter, array_exclude:** return same instance if nothing is filtered out/excluded ([21add86](https://github.com/jbedard/imuter/commit/21add86)), closes [#1](https://github.com/jbedard/imuter/issues/1)



<a name="0.1.0"></a>
# [0.1.0](https://github.com/jbedard/imuter/compare/v0.0.11...v0.1.0) (2018-05-06)


### Bug Fixes

* fix type errors, running tests ([3e7e313](https://github.com/jbedard/imuter/commit/3e7e313))


### Features

* allow some freeze calls to be removed in production mode ([885fde1](https://github.com/jbedard/imuter/commit/885fde1))



<a name="0.0.11"></a>
## [0.0.11](https://github.com/jbedard/imuter/compare/v0.0.10...v0.0.11) (2018-02-28)


### Features

* add side-effects: false to package.json ([0f230ed](https://github.com/jbedard/imuter/commit/0f230ed))



<a name="0.0.10"></a>
## [0.0.10](https://github.com/jbedard/imuter/compare/v0.0.9...v0.0.10) (2018-02-12)


### Features

* **removeValues:** add method to remove multiple values from an object ([092e424](https://github.com/jbedard/imuter/commit/092e424))



<a name="0.0.9"></a>
## [0.0.9](https://github.com/jbedard/imuter/compare/v0.0.8...v0.0.9) (2017-12-08)



<a name="0.0.8"></a>
## [0.0.8](https://github.com/jbedard/imuter/compare/v0.0.7...v0.0.8) (2017-12-08)


### Features

* **removeValue:** support non-existing values ([5add78d](https://github.com/jbedard/imuter/commit/5add78d))



<a name="0.0.7"></a>
## [0.0.7](https://github.com/jbedard/imuter/compare/v0.0.6...v0.0.7) (2017-12-06)


### Features

* **array_replace:** add array_replace to map from one value to another ([0558e26](https://github.com/jbedard/imuter/commit/0558e26))
* **writeValues:** add writeValues to merge/write-multiple values to a path ([e9f5477](https://github.com/jbedard/imuter/commit/e9f5477))



<a name="0.0.6"></a>
## [0.0.6](https://github.com/jbedard/imuter/compare/492d240...v0.0.6) (2017-11-24)


### Bug Fixes

* enhance type definitions of imuter method ([492d240](https://github.com/jbedard/imuter/commit/492d240))
* **removeValue:** remove array entries via splice, not delete ([064bfc1](https://github.com/jbedard/imuter/commit/064bfc1))


### Features

* add array_remove ([ae71394](https://github.com/jbedard/imuter/commit/ae71394))
* add more specific method signatures ([5fafaec](https://github.com/jbedard/imuter/commit/5fafaec))
* **array_exclude:** add a value-remove array helper in addition to index-remove (array_remove) ([0964197](https://github.com/jbedard/imuter/commit/0964197))
* **array_remove:** add deleteCount param ([9945098](https://github.com/jbedard/imuter/commit/9945098))



<a name="0.0.5"></a>
## 0.0.5 (2018-03-28)


### Bug Fixes

* enhance type definitions of imuter method ([492d240](https://github.com/jbedard/imuter/commit/492d240))
* **removeValue:** remove array entries via splice, not delete ([064bfc1](https://github.com/jbedard/imuter/commit/064bfc1))


### Features

* add array_remove ([ae71394](https://github.com/jbedard/imuter/commit/ae71394))
* **array_remove:** add deleteCount param ([9945098](https://github.com/jbedard/imuter/commit/9945098))



<a name="0.0.4"></a>
## 0.0.4 (2018-03-28)


### Bug Fixes

* enhance type definitions of imuter method ([492d240](https://github.com/jbedard/imuter/commit/492d240))


### Features

* add array_remove ([ae71394](https://github.com/jbedard/imuter/commit/ae71394))



<a name="0.0.3"></a>
## 0.0.3 (2018-03-28)


### Bug Fixes

* enhance type definitions of imuter method ([492d240](https://github.com/jbedard/imuter/commit/492d240))



<a name="0.0.2"></a>
## 0.0.2 (2018-03-28)



<a name="0.0.1"></a>
## 0.0.1 (2017-10-20)



