import { WontonItem } from '../../utils/interfaces';
import styles from '../../sass/Menu.module.scss'; 
import { useDispatch } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';

interface WontonSectionProps {
    wontonMenu: WontonItem[];
}

function WontonSection({ wontonMenu }: WontonSectionProps) {
    const dispatch = useDispatch(); 

    const handleItemClick = (item: WontonItem) => {
        dispatch(addItem(item)); 
        console.log(`Lade till "${item.name}" (Wonton) i varukorgen genom att klicka på objektet`);
    };

    if (!wontonMenu || wontonMenu.length === 0) {
        return null;
    }
    return (
        <div className={styles.item}>
            <h3>WONTONS</h3>
            {wontonMenu.map((item) => (
                <div
                    className={styles.wontonItemContainer} 
                    key={item.id} 
                    onClick={() => handleItemClick(item)} 
                    aria-label={`Lägg till ${item.name} i varukorgen`} // Tillgänglighet
                    role="button" // Tillgänglighet: markerar elementet som klickbart för tillgänglighet
                    tabIndex={0} // Tillgänglighet: gör det möjligt att fokusera med tangentbordet
                    onKeyPress={(e) => { // Tillgänglighet: gör det möjligt att aktivera med Enter/Space
                        if (e.key === 'Enter' || e.key === ' ') {
                            handleItemClick(item);
                        }
                    }}
                >
                    <hgroup className={styles.menuList} key={item.id}>
                    <div className="menuItemRow">
                        <h5>{item.name}</h5>
                        <span className={styles.divider}></span>
                        <h5>{item.price} SEK</h5>
                    </div>
                    <p>{item.ingredients}</p>
                    </hgroup>
                </div>
            ))}
        </div>
    );
}

export default WontonSection;