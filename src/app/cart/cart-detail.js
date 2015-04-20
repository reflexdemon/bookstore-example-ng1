import {inject} from 'lib/angular-migrate/decorators';

@inject('ShoppingCart')
export default
class CartDetail {
  constructor(cart) {
    this.cart = cart;
  }
}
