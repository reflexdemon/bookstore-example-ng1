import {ngDirective, withProperty, inject} from 'lib/angular-migrate/decorators';

@ngDirective({ // like ngModule, always first
  template: '<input type="number" ng-model="vm.item.qtty" />'+
            '<button ng-click="vm.cart.add(vm.item)">Add to cart</button>'
})
@withProperty('item') // of type CartItem
@inject('ShoppingCart')
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
export class CartItem {
  constructor(cart) {
    this.cart = cart;
  }
}
