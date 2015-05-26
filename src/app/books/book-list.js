import {inject, ngName} from 'lib/angular-migrate/decorators';
import {Book, Author, BookItem} from './book-models';

@inject('books')
@ngName('BookList')
export default
class BookList {
  constructor(books) {
    this.books = books.map(book => {
      book.item = new BookItem(book);
      return book;
    });
  }

  @inject('$http')
  static resolve(http) {
    return http.get('books.json')
      .then(res => res.data)
      .then(bData => bData.map(b => {
        var book = new Book(b.title, b.description, b.price);
        if (b.author) Object.assign(book.author, b.author);
        return book;
      }));
  }
}
