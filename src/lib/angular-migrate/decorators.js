export * from './module-decorators';
export * from './directive-decorators';

/**
 *
 */
export function inject(...deps) {
  return function (target, name, desc) {
    if (desc) {
      desc.value.$inject = deps;
    } else {
      target.$inject = deps;
    }
  }
}

/**
 * Decorate classes with an explicit name to allow minification
 * //TODO: check for a better name and other ways to minify code
 */
export function ngName(name) {
  return function (target) {
    Object.defineProperty(target, 'ngName', {value: name});
  }
}
