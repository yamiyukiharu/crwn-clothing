import { useContext } from 'react'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { CartContext } from '../../contexts/cart.context'
import './cart-icon.styles.scss'

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartQuantity} = useContext(CartContext)

    const toggleCartOpen = () => {
        setIsCartOpen(!isCartOpen)
    }

    return (
        <div className='cart-icon-container' onClick={toggleCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartQuantity}</span>
        </div>
    )
}

export default CartIcon