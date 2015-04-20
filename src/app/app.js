import {bootstrap as bs} from 'lib/angular-migrate/util';
import {ngModule} from 'lib/angular-migrate/decorators';
import BooksModule from 'bookstore/books/books-module'
import CartModule from 'bookstore/cart/cart-module';

@ngModule([BooksModule, CartModule])
class BookStoreApp {
  constructor($rootScope) {
    $rootScope.name = 'Bob';
  }
}

export function bootstrap() {
  bs(BookStoreApp);
}
