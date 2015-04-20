import {ngDirective, withProperty} from 'lib/angular-migrate/decorators';

@ngDirective({
  templateUrl: 'app/books/book-info-element.html',
  transclude: true
})
@withProperty('book')
export default class BookInfo {}
