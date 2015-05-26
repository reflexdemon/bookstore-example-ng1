import {ngName} from 'lib/angular-migrate/decorators';

var privates = new WeakMap(),
    itemInstances = 0;

/**
 * ShoppingCart service
 * Plain JS class could also be used as a controller
 */
@ngName('ShoppingCart')
export class ShoppingCart {
  items = [];

  add(item) {
    var i = Array.findIndex(this.items, it => item.id === it.id);
    if (i >= 0) this.items[i].qtty += item.qtty;
    else this.items.push(item);
  }

  remove(item) {
    var i = Array.findIndex(this.items, it => item.id === it.id);
    this.items.splice(i, 1);
  }

  empty() {
    this.items.length = 0;
  }

  get total() {
    return this.items
      .map(it => it.totalPrice)
      .reduce((a,b) => a + b, 0);
  }
}

export class CartItem {
  constructor(name, price = 0.0, id = numInstances++) {
    privates.set(this, {});
    this.name = name;
    this.price = price;
    this.id = id;
  }

  set qtty(val) {
    var val = ~~val;
    privates.get(this).qty = val>0 ? val : 1;
  }

  get qtty() {
    return privates.get(this).qty || 1;
  }

  get totalPrice() {
    return this.price * this.qtty;
  }
}
