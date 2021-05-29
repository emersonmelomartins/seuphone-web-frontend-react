import { Route, Switch } from 'react-router';
import { PrivateRoute } from './PrivateRoute';

import { Cart } from '../pages/Cart';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { ProductDetail } from '../pages/ProductDetail';
import { Products } from '../pages/Products';
import { Profile } from '../pages/Profile';
import { Register } from '../pages/Register';
import { ContractTerms } from '../pages/ContractTerms';
import { UserOrderDetail } from '../pages/UserOrderDetail';
import { CartPayment } from '../pages/CartPayment';
import { About } from '../pages/About';

export function Routes() {

  return (
    <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/about" exact component={About} />

      <Route path="/login" exact component={Login} />

      <Route path="/register" exact component={Register} />

      <Route path="/products" exact component={Products} />

      <Route path="/products/:id" exact component={ProductDetail} />
      
      <Route path="/cart" exact component={Cart} />

      <PrivateRoute path="/profile" exact component={Profile} />

      <PrivateRoute path="/user-order-detail/:id" exact component={UserOrderDetail} />

      <PrivateRoute path="/contract" exact component={ContractTerms} />

      <PrivateRoute path="/cart-payment" exact component={CartPayment} />

    </Switch>
  );
};