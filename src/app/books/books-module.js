import 'angular-route';
import {ngModule, withController, withDirective, inject, ngName} from 'lib/angular-migrate/decorators';
import BookList from './book-list';
import BookDetail from './book-detail';
import BookInfo from './book-info-element';

@ngModule(['ngRoute']) // order is important
@withController(BookList, BookDetail)
@withDirective(BookInfo)
@inject('$route') // fix for ngView inside ngInclude
@ngName('BooksModule')
export default
class BooksModule {

  @inject('$routeProvider')
  static config(router) {
    router
      .when('/books', {
        controller: BookList.ngName,
        controllerAs: 'vm',
        templateUrl: 'app/books/book-list.html',
        resolve: { books: BookList.resolve }
      })
      .when('/books/:book', {
        controller: BookDetail.ngName,
        controllerAs: 'vm',
        templateUrl: 'app/books/book-detail.html',
        resolve: {book: BookDetail.resolve}
      })
      .otherwise('/books');
  }
}
