import { MdClose } from "react-icons/md";
import cart from '../../assets/img/korg.svg';
import styles from "../../sass/Cart.module.scss";
import { CustomButton } from "../button/CustomButton";

import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectTotalPrice } from '../../features/cart/cartSelectors';
import { incrementQuantity, decrementQuantity, clearCart } from '../../features/cart/cartSlice';
import { CartItem } from "../../utils/interfaces";

import { useNavigate } from 'react-router-dom';     // Hooken för navigering.

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

    return (
        <li className={styles.menuItemRow}>
            <h5>{item.name}</h5>
            <span className={styles.divider}></span>
            <div className={styles.priceAndControls}>
                <div className={styles.quantityControls}>
                    <CustomButton onClick={handleDecrement} aria-label={`Minska antal av ${item.name}`}>-</CustomButton>
                    <span>{item.quantity}</span>
                    <CustomButton onClick={handleIncrement} aria-label={`Öka antal av ${item.name}`}>+</CustomButton>
                </div>
                <h5 className={styles.price}>
                    {(item.price * item.quantity).toLocaleString('sv-SE', {
                    minimumFractionDigits: 0, // Tar bort .00 för heltal
                    maximumFractionDigits: 2  // Behåller upp till 2 decimaler om de finns
                })}SEK
                </h5>
            </div>
        </li>
    );
}


export function Cart({ onClose }: CartProps) {
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const handlePayClick = () => {
        console.log('Handling payment for total:', totalPrice);

        console.log("Simulating payment processing...");
        try {
            // Här kan du t.ex. skicka varukorgens innehåll till en backend-endpoint
            // const response = await fetch('/api/place-order', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ items: cartItems, total: totalPrice }),
            // });

            // if (!response.ok) {
            //     throw new Error('Order placement failed');
            // }

            // const orderConfirmation = await response.json(); // Få t.ex. ett order-ID

            // --- STEG 2: Om betalningen lyckas ---

            console.log("Payment successful (simulated).");

            // Rensa varukorgen i Redux store
            dispatch(clearCart()); // Antag att du har lagt till en clearCart action i din slice

            onClose();
            // Navigera till OrderStatus-sidan
            // Du kan eventuellt skicka med data till OrderStatus-sidan via state
            // navigate('/orderstatus', { state: { orderId: orderConfirmation.id } });
            navigate('/order'); // Enkel navigering utan state
        } catch (error) {
            console.error("Error during payment processing:", error);
            // Hantera fel, t.ex. visa ett felmeddelande för användaren
            alert("Kunde inte slutföra beställningen. Vänligen försök igen.");
        }
};


    return (
        <div className={styles.cartOverlay} onClick={onClose}> 
            <div className={styles.cartContainer} onClick={(e) => e.stopPropagation()}>
                <header className={styles.header}>
                    <CustomButton className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Stäng varukorgen"
                    >
                        <MdClose />
                    </CustomButton>
                    <img
                        className={styles.cartIcon} 
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
                                <CartItemRow key={item.id} item={item} />
                            ))
                        )}
                    </ul>
                    <hr />
                    <hgroup className={styles.totalLine}>
                        <h4>TOTALT</h4>
                        <h1>
                            {totalPrice.toLocaleString('sv-SE', {
                                minimumFractionDigits: 0, 
                                maximumFractionDigits: 2  
                            })} SEK
                        </h1> 
                    </hgroup>
                    <CustomButton
                        onClick={handlePayClick}
                        className={styles.payBtn}
                        disabled={cartItems.length === 0} // Inaktiverar knappen om korgen är tom
                    >
                        <h4>TAKE MY MONEY!</h4>
                    </CustomButton>
                </main>
            </div>
        </div>
    );
}