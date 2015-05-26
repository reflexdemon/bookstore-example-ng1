import {ngDirective, withProperty, ngName} from 'lib/angular-migrate/decorators';

@ngDirective({
  templateUrl: 'app/books/book-info-element.html',
  transclude: true
})
@withProperty('book')
@ngName('bookInfo')
export default class BookInfo {}
