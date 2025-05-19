import { useState } from 'react';
import styles from '../../sass/Header.module.scss';
import logo from '../../assets/img/logo.svg';
import cart from '../../assets/img/korg.svg';
import NavLinks from '../nav/NavList';
import { HeaderProps } from '../../utils/interfaces';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '../../features/cart/cartSelectors';

function Header({ hideVarukorg, onCartClick }: HeaderProps) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const totalQuantity = useSelector(selectTotalQuantity);

    const handleLogoClick = () => {
        setIsNavOpen(true);
    };

    const handleNavClose = () => {
        setIsNavOpen(false);
    };

    const handleCartClick = () => {
        if (onCartClick) {
            onCartClick(); // Kallar funktionen från parent (Menu)
        }
    }

    return (
        <header className={styles.header}>
            <img
                className={styles.logotyp}
                src={logo}
                alt="Logotyp"
                onClick={handleLogoClick}
            />
            {isNavOpen && <NavLinks onClose={handleNavClose} />}
            {!hideVarukorg && (
                <div className={`${styles.cart} ${totalQuantity > 0 ? '' : styles.cartEmpty}`} onClick={handleCartClick}>
                    <img
                        className={styles.cartIcon}
                        src={cart}
                        alt="Varukorg"
                    />
                    {totalQuantity > 0 && <span className={styles.cartCount}>{totalQuantity}</span>}
                </div>
            )}
        </header>
    );
}

export default Header;