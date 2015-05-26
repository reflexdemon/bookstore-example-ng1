import {ngDirective, withProperty, inject, ngName} from 'lib/angular-migrate/decorators';

@ngDirective({ // like ngModule, always first
  template: '<input type="number" ng-model="vm.item.qtty" />'+
            '<button ng-click="vm.cart.add(vm.item)">Add to cart</button>'
})
@withProperty('item') // of type CartItem
@inject('ShoppingCart')
@ngName('addToCartButton')
export class AddToCartButton {
  constructor(cart) {
    this.cart = cart;
  }
}

@ngDirective({
  template: '<strong>{{vm.item.name}}</strong> &times;' +
            '<input type="number" ng-model="vm.item.qtty" />'+
            ' total: {{vm.item.totalPrice | currency}} ' +
            '<button ng-click="vm.cart.remove(vm.item)">&times;</button>'
})
@withProperty('item')
@inject('ShoppingCart')
@ngName('cartItem')
export class CartItem {
  constructor(cart) {
    this.cart = cart;
  }
}
