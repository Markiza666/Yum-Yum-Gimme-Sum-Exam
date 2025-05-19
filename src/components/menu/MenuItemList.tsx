import { MenuItem } from '../../utils/interfaces';
import styles from '../../sass/Menu.module.scss';
import { CustomButton } from '../button/CustomButton';
import { useDispatch } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';

interface MenuItemListProps {
    title: string;
    items: MenuItem[];
    price?: number; 
}

function MenuItemList({ title, items, price }: MenuItemListProps) {
    const dispatch = useDispatch(); // Hämta dispatch funktionen
    const handleAddItem = (item: MenuItem) => {
        dispatch(addItem(item)); // Dispatcha addItem action med varan som payload
        console.log(`Lade till "${item.name}" i varukorgen`); // Valfri logg
    };
    if (!items || items.length === 0) {
        return null; // Renderar inget om det inte finns några objekt
    }
    
    return (
        <div className={styles.item}>
            <div className={styles.header}>
                <h3>{title}</h3>
                <span className={styles.divider}></span>
                {price !== undefined && <h5>{price} kr</h5>}
            </div>
            <div className={styles.btnContainer}>
                {items.map((item) => (
                <CustomButton
                    key={item.id}
                    className={styles.btn}
                    onClick={() => handleAddItem(item)} 
                >
                    {item.name}
                </CustomButton>
                ))}
            </div>
        </div>
    );
}

export default MenuItemList;