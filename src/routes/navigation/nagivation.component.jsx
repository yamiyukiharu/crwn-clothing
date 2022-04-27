import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { useSelector} from 'react-redux'

import { selectCurrentUser } from "../../store/user/user.selector";

import { selectIsCartOpen } from '../../store/cart/cart.selector'

import {signOutUser} from "../../utils/firebase/firebase.utils.js"

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";


import { ReactComponent as CrwnLogo} from "../../assets/crown.svg"

import {NavLinks, NavLink, LogoContainer, NavigationContainer} from './navigation.styles'

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
            <CrwnLogo className="logo"/>
        </LogoContainer>
        <NavLinks>
            <NavLink to="/shop">
                SHOP
            </NavLink>
            {
              currentUser? (
                <NavLink as="span" onClick={signOutUser}> SIGN OUT</NavLink>
              ) : (
                <NavLink to="/auth">
                  SIGN IN
                </NavLink>
              )
            }
            <CartIcon/>
        </NavLinks>
        {
          isCartOpen && <CartDropDown/>
        }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation