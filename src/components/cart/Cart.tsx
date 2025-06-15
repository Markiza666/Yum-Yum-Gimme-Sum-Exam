import styles from "../../sass/Cart.module.scss";
import { CustomButton } from "../button/CustomButton";

import { useSelector } from 'react-redux';
import { selectCartItems, selectTotalPrice } from '../../features/cart/cartSelectors';
import { performApiCom } from "../../service/api/api";

import { useNavigate } from 'react-router-dom';
import { useTenantId } from "../../app/hooks/useTenantId";
import { useApiKey } from "../../app/hooks/useApiKey";
import { CartProps, OrderResponse } from "../../utils/interfaces";
import { clearCart } from "../../features/cart/cartSlice";
import { CartItemRow } from "./CartItemRow";
import { HeaderCart } from "../header/HeaderCart";
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from "../../app/hooks/useAppDispatch"; 

export function Cart({ onClose }: CartProps) {
    const cartTenantId: string = useTenantId();
    const cartApiKey: string = useApiKey();

    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const dispatch = useAppDispatch(); 
    const navigate = useNavigate();

    async function handlePayClick() {
        const itemsToSend: Array<number> = [];
        cartItems.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                itemsToSend.push(item.id);
            }
        });

        const apiComArgs = {
            urlExtension: '/' + cartTenantId + '/orders',
            apiMethod: 'POST',
            key: '' + cartApiKey,
            requestBody: {
                "items": itemsToSend,
            }
        };

        try {
            const resultAction = await dispatch(performApiCom(apiComArgs));
            const response = unwrapResult(resultAction) as OrderResponse;

            dispatch(clearCart());  // Tömmer varukorgen efter beställning
            onClose();

            navigate('/order', { state: { eta: response.order.eta, orderId: response.order.id } });

        } catch (error: unknown) { 
            console.error("Error placing order:", error);
            if (typeof error === 'string') {
                alert("Kunde inte slutföra beställningen: " + error);
            } else if (error instanceof Error) {
                alert("Kunde inte slutföra beställningen: " + error.message);
            } else {
                alert("Kunde inte slutföra beställningen. Vänligen försök igen.");
            }
        }
    }
    return (
        <div className={styles.cartOverlay} onClick={onClose}>
            <div className={styles.cartContainer} onClick={(e) => e.stopPropagation()}>
                <HeaderCart onClose={onClose} />
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
                        disabled={cartItems.length === 0}
                    >
                        <h4>TAKE MY MONEY!</h4>
                    </CustomButton>
                </main>
            </div>
        </div>
    );
}
