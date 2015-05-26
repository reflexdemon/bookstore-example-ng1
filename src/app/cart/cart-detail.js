import {inject, ngName} from 'lib/angular-migrate/decorators';

@inject('ShoppingCart')
@ngName('CartDetail')
export default
class CartDetail {
  constructor(cart) {
    this.cart = cart;
  }
}
