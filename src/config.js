System.config({
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime",
      "es7.classProperties",
      "es7.decorators"
    ]
  },
  "paths": {
    "bookstore/*": "app/*.js",
    "lib/*": "lib/*.js",
    "github:*": "../vendor/github/*.js",
    "npm:*": "../vendor/npm/*.js",
    "*": "*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.15",
    "angular-route": "github:angular/bower-angular-route@1.3.15",
    "babel": "npm:babel-core@5.1.10",
    "babel-runtime": "npm:babel-runtime@5.1.10",
    "core-js": "npm:core-js@0.8.4",
    "github:angular/bower-angular-route@1.3.15": {
      "angular": "github:angular/bower-angular@1.3.15"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:core-js@0.8.4": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

