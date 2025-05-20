
import { incrementQuantity, decrementQuantity } from '../../features/cart/cartSlice';
import { CartItemRowProps } from "../../utils/interfaces";
import { CustomButton } from '../button/CustomButton';
import styles from "../../sass/Cart.module.scss";
import { useDispatch } from 'react-redux';

export function CartItemRow({ item }: CartItemRowProps) {
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