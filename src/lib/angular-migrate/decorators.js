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
