import CART_ACTION_TYPES from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

// Helper functions
const removeCartItem = (productToRemove, cartItems) => {
    return cartItems.filter((cartItem) => (
        cartItem.id !== productToRemove.id
    ))
}

const addCartItem = (productToAdd, cartItems) => {
    // Find out if there are matching ids
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    )

    if (existingCartItem) {
        return cartItems.map((cartItem) => (
            cartItem.id === productToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        ))
    }

    // Add item to new array with quantity property
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const reduceCartItem = (product, cartItems) => {
    if (cartItems.find((cartItem) => cartItem.id === product.id && cartItem.quantity === 1)) {
        return removeCartItem(product, cartItems)
    } else {
        return cartItems.map((cartItem) => (
            cartItem.id === product.id 
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        ))
    }
}

// Actions
export const setIsCartOpen = (isOpen) => createAction(
    CART_ACTION_TYPES.SET_IS_CART_OPEN,
    isOpen
)

export const setCartItems = (cartItems) => createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    cartItems
)

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(productToAdd, cartItems)
    return setCartItems(newCartItems)
}

export const removeItemToCart = (cartItems, product) => {
    const newCartItems = reduceCartItem(product, cartItems)
    return setCartItems(newCartItems)
}

export const clearItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(productToRemove, cartItems)
    return setCartItems(newCartItems)
}