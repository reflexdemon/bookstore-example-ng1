import {CartItem} from 'bookstore/cart/shopping-cart';
import {slugify} from 'lib/text-utils';

// holds private vars of instances
var privates = new WeakMap;

export class Book {
  title;
  description;
  price;
  author = new Author;

  constructor(title, description = '', price = 0.0) {
    this.title = title;
    this.description = description;
    this.price = price;
  }

  get longTitle() {
    return `${this.title} by ${this.author}`;
  }

  get slug() {
    return slugify(this.longTitle);
  }
}

export class Author {
  firstName = 'unknown';
  lastName = '';

  constructor() {
    privates.set(this, {});
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  set birthDay(value) {
    if (value instanceof Date)
      privates.get(this).bday = value;
    else
      privates.get(this).bday = new Date(value);
  }

  get birthDay() {
    return privates.get(this).bday || new Date(NaN); // return invalid date if not set ?
  }

  toString() {
    return this.fullName;
  }
}

export class BookItem extends CartItem {
  constructor(book) {
    super(book.longTitle, book.price, book.slug);
    this.book = book;
  }
}
