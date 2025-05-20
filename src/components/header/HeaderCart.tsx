import { CustomButton } from '../button/CustomButton';
import styles from '../../sass/HeaderCart.module.scss';
import { MdClose } from "react-icons/md";
import cart from '../../assets/img/korg.svg';
import { CartProps } from '../../utils/interfaces';

export function HeaderCart({ onClose }: CartProps) {
    return (
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
    );
}