
import { createSelector } from 'reselect'


const selectCartReducer = (state) => state.cart

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
)

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, currentItem) => total + currentItem.quantity, 0)
)


export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, currentProduct) => total + (currentProduct.price * currentProduct.quantity), 0)
)
