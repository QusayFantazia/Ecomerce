import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { useSelector } from 'react-redux';

import ShoppingCart from '../../Components/shopping-cart/shpping-cart.component';
import CartDropdown from '../../Components/cart-dropdown/cart-dropdown.component';
import {NavigationDiv, LogoLink, LinksDiv, NavigationLink} from "./navigation.styles.jsx"
import { signoutStart } from '../../store/user/user.Slice';

import { resetCurrentUser } from '../../store/user/user.Slice';

import './navigation.styles.jsx';

const Navigation = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)

  const isCartOpen = useSelector(state => state.cart.isCartOpen)

  const SignOutHandler = async () => {
    dispatch(signoutStart())
  }
  return (
    <Fragment>
      
      <NavigationDiv>
        <LogoLink to='/'>
          <CrwnLogo className='logo' />
        </LogoLink>
        <LinksDiv>
          <NavigationLink to='/shop'>
            SHOP
          </NavigationLink>

          {
            currentUser ? (
              <NavigationLink as="span" onClick={SignOutHandler}> Sign out </NavigationLink>
            ):
            (
            <NavigationLink to='/auth'>
              SIGN IN
            </NavigationLink>

            )
          }

        </LinksDiv>
        <ShoppingCart/>
        {isCartOpen && <CartDropdown/>}
        
      </NavigationDiv>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;