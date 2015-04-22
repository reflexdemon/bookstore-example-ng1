import {bootstrap as bs} from 'lib/angular-migrate/util';
import {ngModule, inject, ngName} from 'lib/angular-migrate/decorators';
import BooksModule from 'bookstore/books/books-module'
import CartModule from 'bookstore/cart/cart-module';

@ngModule([BooksModule, CartModule])
@ngName('BookStoreApp') // to support minification
@inject('$rootScope')
class BookStoreApp {
  constructor(scope) {
    scope.name = 'Bob';
  }
}

export function bootstrap() {
  bs(BookStoreApp);
}
