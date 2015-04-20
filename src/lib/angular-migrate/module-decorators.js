import angular from 'angular';

/**
 *
 */
export function ngModule(dependencies) {
  if (typeof dependencies === 'function') {
    let target = dependencies;
    dependencies = [];
    return moduleDecorator(target);
  } else {
    return moduleDecorator;
  }

  function moduleDecorator(target) {
    var deps = dependencies.map(d => d.name? d.name : d);
    var module = angular.module(target.name, deps);
    // pass static 'config' method as callback to module.config
    if (target.config) {
      module.config(target.config);
    }
    // create one controller for each controller constructor in controllers static property
    if (target.controllers) {
      for (let ctrl of target.controllers)
        module.controller(ctrl.name, ctrl);
    }
    // same as controllers
    if (target.services) {
      for (let service of target.services)
        module.service(service.name, service);
    }
    //
    if (target.directives) {
      for (let directive of target.directives) {
        // classes names should have first letter uppercased
        // so we lower it because angular doesn't like it
        let name = directive.controller.name.charAt(0).toLowerCase() + directive.controller.name.slice(1);
        module.directive(name, ()=>directive); // directive is a DDO
      }
    }
    // use target class as the body of the module.run function
    // NOTE: is it too ulgy or magic?
    if (!target.$inject) angular.injector.$$annotate(target);
    var runDeps = target.$inject;
    eval(`function cb(${runDeps.join(',')}){new target(${runDeps.join(',')})}`);
    module.run(cb);

    return module;
  }
}

/**
 *
 */
export function withController(...controllers) {
  return target => {
    target.controllers = target.controllers || [];
    target.controllers = target.controllers.concat(controllers);
  }
}

/**
 *
 */
export function withService(...services) {
  return target => {
    target.services = target.services || [];
    target.services = target.services.concat(services);
  }
}

/**
 *
 */
export function withDirective(...directives) {
  return target => {
    target.directives = target.directives || [];
    target.directives = target.directives.concat(directives);
  }
}
