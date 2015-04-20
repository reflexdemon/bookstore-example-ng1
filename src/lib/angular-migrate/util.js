
export function bootstrap(ngModule) {
  angular.element(document)
    .ready(()=> angular.bootstrap(document, [ngModule.name]));
}
