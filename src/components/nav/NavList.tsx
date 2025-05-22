import { Link } from "react-router-dom";
import styles from "../../sass/Header.module.scss"
import { MdClose } from "react-icons/md";

interface NavLinksProps {
    onClose: () => void; 
}

function NavLinks({ onClose }: NavLinksProps) {
    return (
        <nav className={styles.nav}>
            <button 
                type="button" 
                className={styles.closeButton} 
                onClick={onClose}
                aria-label="Stäng listan"
            >
                <MdClose />
            </button>
            <ul>
                <li>
                    <Link to="/">Menu</Link>
                </li>
                <li>
                    <Link to="/order">OrderStatus</Link>
                </li>
                <li>
                    <Link to="/receipt">Receipt</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavLinks;