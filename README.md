Angular Bookstore Example App
=============================

Angular 1.x example application written in ES6-7 which is easier to migrate to the next generation frameworks. Check the running example [here](http://olanod.github.io/bookstore-example-ng1).

Most of the angular Apps are written in a way that will make it hard for migration because they are tightly coupled with the framework, if you want to create something more future proof you'll have to rely more on new standards(ES6 modules, classes, etc.) and less on the angular only components.

Structure
---------
###Directories
The most used structure for angular apps is probably separating files in different directories based on its type
```
src/
  scripts/
    controllers/
      ...
    services/
      ...
    directives/
      ...
```
It's a good approach, much better than having everything mixed in one file, but as client-side applications have grown this kind of separation of concerns is falling short, what if you have 20+ controllers, have to change one and then modify the corresponding view?, a better way to structure your code and the way people do it now is by grouping files by feature, that way is more obvious what the code does and finding files is easier. e.g.
```
src/
  app/
    login/
      login.js
      login.html
    books/
      components/ (book module custom components)
      book-detail.js
      book-detail.html
      book-list.js
      book-list.html
      books-module.js
      models/
        book.js
        book-author.js
        client.js
    app.js
  components/ (custom reusable visual components)
  lib/ (reusable pieces of code)
```
This way I think is clearer to understand what you are building. Also based on the webcomponents philosophy I like to have a separate directory for components(custom elements,directives, widgets) which don't depend on your application and you could re-use in future applications. And just like with the `components` dir, in the `lib` folder you can put pieces of utility code that you might use in other applications and that could become a stand-alone library for everybody to use in the future.

###Script files
JavaScript Files should be written with the new ECMAScript syntax, to accomplish this use the `controllerAs` syntax of angular which allows you to code your business logic using classes.  
Try to componentize your application by writing more directives and less controllers, the idea would be to transform your directives into webcomponents in the future so fuse your controllers with your directives using the `controller` and `controllerAs` properties of the directive definition object.  
Services should be plain JS classes which don't have to change between angular1.x and next-gen frameworks.  
Finally I think it's better to group angular module calls so you can easily delete them later because your future framework won't be using them.
```
// book-list controller
export class BookList {
  constructor($window) {
    this.books = [];
    $window.console.log('BookList as an ES6 class!');
  }
}
```
```
// book-preview-element
class BookPreviewElement {
  ...
}

export var bookPreviewElementDDO = {
  scope: {book: '='},
  controller: BookPreviewElement,
  controllerAs: 'ctrl',
  bindToController: true,
  template: '...'
}
```
```
// books module
import angular from 'angular';
import {BookList} from './book-list';
import {BookDetail} from './book-detail';
import {bookPreviewElementDDO as bookPreview} from './book-preview-element';

angular.module('BooksModule', [])
  .controller(BookList.name, BookList);
  .controller(BookDetail.name, BookList);
  .directive(bookPreview.controller.name, bookPreview);
```
### Extra
While developing the app I ended up creating an `angular-migrate` library with a bunch of ES7 decorators that make ng1 development look next generation.
I'll test it and try to think of more features before makign it a separate repository. You can learn more about it in [olanod/angular-migrate](https://github.com/olanod/angular-migrate).

About Code
----------
This application uses [Babel](https://babeljs.io) from a gulp task to transpile ES6-7 code to ES5 and [jspm](http://jspm.io) for package management.

###Installing
- Make sure you have installed `node` with `npm`.
- Install `gulp` and `jspm` globally if you don't have them.
- Run `npm install` to get development dependencies.
- Run `jspm install` to get application dependencies.

###Running
- Run dev server with `gulp watch`

Contributing
------------
Feel free to open any issue regarding this docs, suggestions about the structure, the code or whatever you think can make this example better.
