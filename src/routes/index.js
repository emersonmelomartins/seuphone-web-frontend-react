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
import { Panel } from '../pages/panel';
import { CreateUserForm } from '../pages/panel/UsersTab/CreateUserForm';
import { EditUserForm } from '../pages/panel/UsersTab/EditUserForm';
import { CreateProductForm } from '../pages/panel/ProductsTab/CreateProductForm';
import { EditProductForm } from '../pages/panel/ProductsTab/EditProductForm';
import { CreateProviderForm } from '../pages/panel/ProvidersTab/CreateProviderForm';
import { EditProviderForm } from '../pages/panel/ProvidersTab/EditProviderForm';

export function Routes() {

  return (
    <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/login" exact component={Login} />

      <Route path="/register" exact component={Register} />

      <Route path="/products" exact component={Products} />

      <Route path="/products/:id" exact component={ProductDetail} />
      
      <Route path="/cart" exact component={Cart} />

      <PrivateRoute path="/profile" exact component={Profile} />

      <PrivateRoute path="/panel" exact component={Panel} />

      <PrivateRoute path="/user-order-detail/:id" exact component={UserOrderDetail} />

      <PrivateRoute path="/contract" exact component={ContractTerms} />

      <PrivateRoute path="/cart-payment" exact component={CartPayment} />

      <PrivateRoute path="/create-user-admin" exact component={CreateUserForm} />

      <PrivateRoute path="/update-user/:id" exact component={EditUserForm} />

      <PrivateRoute path="/create-product" exact component={CreateProductForm} />

      <PrivateRoute path="/update-product/:id" exact component={EditProductForm} />

      <PrivateRoute path="/create-provider" exact component={CreateProviderForm} />

      <PrivateRoute path="/update-provider/:id" exact component={EditProviderForm} />

    </Switch>
  );
};