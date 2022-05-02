import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/user-context';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserSignOut } from '../../utils/firebase/firebase';
import { cartcontxt} from '../../contexts/shoppin-cart-context';

import ShoppingCart from '../../Components/shopping-cart/shpping-cart.component';
import CartDropdown from '../../Components/cart-dropdown/cart-dropdown.component';
import {NavigationDiv, LogoLink, LinksDiv, NavigationLink} from "./navigation.styles.jsx"

import './navigation.styles.jsx';

const Navigation = () => {
  const {currentUser} = useContext(UserContext)
  
  const {isCartOpen}  = useContext(cartcontxt)

  const SignOutHandler = async () => {
    await UserSignOut()
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