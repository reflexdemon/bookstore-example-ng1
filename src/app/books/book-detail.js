import {inject} from 'lib/angular-migrate/decorators';
import {slugify} from 'lib/text-utils';
import {Book} from './book-models';

@inject('book')
export default
class BookDetail {
  constructor(book) {
    this.book = book;
    console.log(book);
  }

  @inject('$http','$route')
  static resolve(http, route) {
    var bookSlug = route.current.params.book;
    return http.get('books.json')
      .then(res => res.data)
      .then(books => Array.find(books, b => bookSlug.indexOf(slugify(b.title)) >= 0 ))
      .then(b => {
        var book = new Book(b.title, b.description);
        if (b.author) Object.assign(book.author, b.author);
        return book;
      });
  }
}
