/**
 * ngDirective decorator
 * Transform class into a Directive Definition Obect with resonable defaults
 */
export function ngDirective(config) {
  if (typeof config === 'function') {
    var target = config;
    config = {};
    return directiveDecorator(target);
  } else {
    return directiveDecorator;
  }

  function directiveDecorator(target) {
    var ddo = {
      restrict: 'E', // only elements by default
      scope: {}, // preffer isolated scopes
      controller: target,
      controllerAs: 'vm',
      bindToController: true
    }
    // target class can define compile and link functions as static methods
    if (typeof target.link === 'function')
      ddo.link = target.link;
    if (typeof target.compile === 'function')
      ddo.compile = target.compile;
    // if 'properties' static property is present add them to the isolated scope
    if (target.properties && target.properties.length) {
      let props = target.properties;
      props = props.map(prop => typeof prop === 'string'?[prop,'=']:prop);
      for (let prop of props) {
        let [name,bindType,innerName] = prop;
        ddo.scope[name] = bindType + (innerName?innerName:'');
      }
    }
    Object.assign(ddo, config);
    return ddo;
  }
}

export function withProperty(...properties) {
  return target => {
    target.properties = target.properties || [];
    target.properties = target.properties.concat(properties);
  }
}
