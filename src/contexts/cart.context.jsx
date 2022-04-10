import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    clearItemFromCart: () => {},
    removeItemToCart: () => {},
    cartQuantity: 0,
    setCartQuantity: () => {},
    cartTotal: 0.0
})

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

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartQuantity, setCartQuantity] = useState(0)
    const [cartTotal, setCartTotal] = useState(0.0)


    useEffect(() => {
        const totalCartItems = cartItems.reduce(
            (total, currentItem) => total + currentItem.quantity, 0
        )
        setCartQuantity(totalCartItems)
    }, [cartItems])

    useEffect(() => {
        setCartTotal(cartItems.reduce((total, currentProduct) => total + (currentProduct.price * currentProduct.quantity), 0))
      }, [cartItems])
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(productToAdd, cartItems))
    }

    const removeItemToCart = (product) => {
        setCartItems(reduceCartItem(product, cartItems))
    }

    const clearItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(productToRemove, cartItems))
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemToCart,
        clearItemFromCart,
        cartQuantity,
        cartTotal
    }

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}