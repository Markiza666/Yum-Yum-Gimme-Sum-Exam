import { MdClose } from "react-icons/md";
import cart from '../../assets/img/korg.svg';
import styles from "../../sass/Cart.module.scss";
import { CustomButton } from "../button/CustomButton";

import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectTotalPrice } from '../../features/cart/cartSelectors';
import { incrementQuantity, decrementQuantity, removeItem } from '../../features/cart/cartSlice';
import { CartItem } from "../../utils/interfaces";

interface CartProps {
    onClose: () => void;
}

// Ny hjälpkomponent för en rad i varukorgen
interface CartItemRowProps {
    item: CartItem;
}

function CartItemRow({ item }: CartItemRowProps) {
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(incrementQuantity(item.id));
    };

    const handleDecrement = () => {
        dispatch(decrementQuantity(item.id));
    };

    const handleRemove = () => {
        dispatch(removeItem(item.id));
    };

    return (
        <li className={styles.menuItemRow}>
        {/* Knapp för att ta bort hela varan */}
            <CustomButton onClick={handleRemove} className={styles.removeButton} aria-label={`Ta bort ${item.name}`}>X</CustomButton>
            <h5>{item.name}</h5>
            <div className={styles.quantityControls}>
                <CustomButton onClick={handleDecrement} aria-label={`Minska antal av ${item.name}`}>-</CustomButton>
                <span>{item.quantity}</span>
                <CustomButton onClick={handleIncrement} aria-label={`Öka antal av ${item.name}`}>+</CustomButton>
            </div>
            <span className={styles.divider}></span>
            <h5 className={styles.price}>{(item.price * item.quantity).toFixed(2)} kr</h5> {/* Visa subtotal */}
        </li>
    );
}


export function Cart({ onClose }: CartProps) {
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);

    const handlePayClick = () => {
        // Implementera din betalningslogik här
        console.log('Handling payment for total:', totalPrice);
        // Kanske tömma varukorgen efter lyckad betalning
        // dispatch(clearCart());
        // Stäng varukorgen
        onClose();
    };


    return (
        <div className={styles.cartOverlay} onClick={onClose}> {/* Lägg till en overlay för att stänga vid klick utanför */}
        {/* Förhindra att klick inuti varukorgen stänger den */}
            <div className={styles.cartContainer} onClick={(e) => e.stopPropagation()}>
                <header className={styles.header}>
                    <CustomButton className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Stäng varukorgen"
                    >
                        <MdClose />
                    </CustomButton>
                    <img
                        className={styles.cartIcon} // Byt klassnamn för tydlighet
                        src={cart}
                        alt="Varukorg"
                    />
                </header>

                <main className={styles.orderContainer}>
                    <hr />
                    <ul className={styles.menuItemsWrapper}>
                        {cartItems.length === 0 ? (
                        <li className={styles.emptyCartMessage}>Varukorgen är tom.</li>
                        ) : (
                            cartItems.map(item => (
                                <CartItemRow key={item.id} item={item} /> // Använd den nya komponenten
                            ))
                        )}
                    </ul>
                    <hr />
                    <hgroup className={styles.totalLine}>
                        <h4>TOTALT</h4>
                        <h1>{totalPrice.toFixed(2)} kr</h1> {/* Visa totalsumman */}
                    </hgroup>
                    <CustomButton
                        onClick={handlePayClick}
                        className={styles.payBtn}
                        disabled={cartItems.length === 0} // Inaktivera knappen om korgen är tom
                    >
                        <h4>TAKE MY MONEY!</h4>
                    </CustomButton>
                </main>
            </div>
        </div>
    );
}