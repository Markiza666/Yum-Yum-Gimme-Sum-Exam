import styles from "../../sass/Cart.module.scss";
import { CustomButton } from "../button/CustomButton";

import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectTotalPrice } from '../../features/cart/cartSelectors';
import { ApiComArgs, apiCom } from "../../service/api/api";

import { useNavigate } from 'react-router-dom';     // Hooken för navigering.
import { useTenantId } from "../../service/hooks/useTenantId";
import { useApiKey } from "../../service/hooks/useApiKey";
import { CartProps, OrderResponse } from "../../utils/interfaces";
import { clearCart } from "../../features/cart/cartSlice";
import { CartItemRow } from "./CartItemRow";
import { HeaderCart } from "../header/HeaderCart";
// import { VarContext } from "../../service/context/VarContext";
// import { useState } from "react";

export function Cart({ onClose }: CartProps) {
    const cartTenantId: string = useTenantId();
    const cartApiKey: string = useApiKey();
    // const [dtStart, setDtStart] = useState<string>('0');
    // const [orderId, setOrderId] = useState<string>('');

    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    async function handlePayClick() {
        const itemsToSend : Array<number> = [];
        cartItems.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                itemsToSend.push(item.id);
            }
        });
        
        const apiComArgs: ApiComArgs = {
            urlExtension: '/' + cartTenantId + '/orders',
            apiMethod: 'POST',
            key: '' + cartApiKey,
            requestBody: {
                "items": itemsToSend,
            }

        };
        
        try {
            const response: OrderResponse = await apiCom(apiComArgs) as OrderResponse;
            dispatch(clearCart());
            onClose(); 

            navigate('/order', { state: { eta: response.order.eta, orderId: response.order.id } });

        } catch (error) {
            console.error("Error placing order:", error);
            alert("Kunde inte slutföra beställningen. Vänligen försök igen.");
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
                        disabled={cartItems.length === 0} // Inaktiverar knappen om korgen är tom
                    >
                        <h4>TAKE MY MONEY!</h4>
                    </CustomButton>
                </main>
            </div>
        </div>
    );
}