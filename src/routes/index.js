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
import { Panel } from '../pages/Panel';
import { CreateUserForm } from '../pages/Panel/UsersTab/CreateUserForm';
import { EditUserForm } from '../pages/Panel/UsersTab/EditUserForm';
import { EditOrderForm } from '../pages/Panel/OrdersTab/EditOrderForm';
import { CreateProductForm } from '../pages/Panel/ProductsTab/CreateProductForm';
import { EditProductForm } from '../pages/Panel/ProductsTab/EditProductForm';
import { CreateProviderForm } from '../pages/Panel/ProvidersTab/CreateProviderForm';
import { EditProviderForm } from '../pages/Panel/ProvidersTab/EditProviderForm';
import { About } from '../pages/About';
import { ForgotPassword } from '../pages/ForgotPassword';
import { NotFound } from '../pages/NotFound';
// import { PrivateRouteAdmin } from './PrivateRouteAdmin';

export function Routes() {

  return (
    <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/404" exact component={NotFound} />

      <Route path="/about" exact component={About} />

      <Route path="/login" exact component={Login} />

      <Route path="/forgot-password" exact component={ForgotPassword} />

      <Route path="/register" exact component={Register} />

      <Route path="/products" exact component={Products} />

      <Route path="/products/:id" exact component={ProductDetail} />
      
      <Route path="/cart" exact component={Cart} />

      <PrivateRoute path="/profile" exact component={Profile} />


      <PrivateRoute path="/user-order-detail/:id" exact component={UserOrderDetail} />

      <PrivateRoute path="/contract" exact component={ContractTerms} />

      <PrivateRoute path="/cart-payment" exact component={CartPayment} />

      <PrivateRoute path="/panel" exact component={Panel} />
      
      <PrivateRoute path="/panel/create-user-admin" exact component={CreateUserForm} />
      <PrivateRoute path="/panel/update-user/:id" exact component={EditUserForm} />

      <PrivateRoute path="/panel/create-order/" exact component={EditOrderForm} />
      <PrivateRoute path="/panel/update-order/:id" exact component={EditOrderForm} />
      
      <PrivateRoute path="/panel/create-product" exact component={CreateProductForm} />
      <PrivateRoute path="/panel/update-product/:id" exact component={EditProductForm} />

      <PrivateRoute path="/panel/create-provider" exact component={CreateProviderForm} />
      <PrivateRoute path="/panel/update-provider/:id" exact component={EditProviderForm} />

    </Switch>
  );
};