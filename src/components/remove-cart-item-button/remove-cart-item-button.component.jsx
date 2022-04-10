import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const RemoveCartItemButton = ({cartItem}) => {
    
    const {removeItemFromCart} = useContext(CartContext)
    
    return (
        <div onClick={removeItemFromCart(cartItem)}>
            X
        </div>
    )
}

export default RemoveCartItemButton