import 'angular-route';
import {ngModule, ngName, inject, withController, withService, withDirective} from 'lib/angular-migrate/decorators';
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
@ngName('CartModule')
export default
class CartModule {

  @inject('$routeProvider')
  static config(router) {
    router.when('/cart', {
      controller: CartDetail.ngName,
      controllerAs: 'vm',
      templateUrl: 'app/cart/cart-detail.html'
    });
  }
}
