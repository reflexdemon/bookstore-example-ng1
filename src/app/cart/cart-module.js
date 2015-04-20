import 'angular-route';
import {ngModule, inject, withController, withService, withDirective} from 'lib/angular-migrate/decorators';
import CartDetail from './cart-detail';
import {ShoppingCart} from './shopping-cart';
import {AddToCartButton, CartItem} from './cart-elements';

/**
 * CartModule
 * Groups the shopping cart features into one angule.module
 */
@ngModule(['ngRoute'])
@withController(CartDetail)
@withService(ShoppingCart)
@withDirective(AddToCartButton, CartItem)
export default
class CartModule {

  @inject('$routeProvider')
  static config(router) {
    router.when('/cart', {
      controller: CartDetail.name,
      controllerAs: 'vm',
      templateUrl: 'app/cart/cart-detail.html'
    });
  }
}
