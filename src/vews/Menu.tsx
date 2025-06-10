import { useEffect, useState } from 'react';
import { WontonItem, MenuItem } from '../utils/interfaces';
import WontonSection from '../components/menu/WontonSection';
import MenuItemList from '../components/menu/MenuItemList';
import styles from '../sass/Menu.module.scss'
import Header from '../components/header/Header';
import { Cart } from '../components/cart/Cart';
import { useAppDispatch } from '../app/hooks/useAppDispatch';
import { useSelector } from 'react-redux'; 
import { fetchMenu } from '../features/menu/menuThunks'; 
import { RootState } from '../app/store';

function Menu() {
    const dispatch = useAppDispatch();

    const [wontonMenu, setWontonMenu] = useState<WontonItem[]>([]);
    const [drinkMenu, setDrinkMenu] = useState<MenuItem[]>([]);
    const [dipMenu, setDipMenu] = useState<MenuItem[]>([]);

    const [cartOpen, setCartOpen] = useState(false);

    const fullMenu = useSelector((state: RootState) => state.menu.items); // <-- Hämta menyn från Redux

    useEffect(() => {
        dispatch(fetchMenu()); // <-- Dispatchar den dedikerade thunken
    }, [dispatch]);

    useEffect(() => {
        if (fullMenu && fullMenu.length > 0) {
            const workWontonMenu: WontonItem[] = [];
            const workDrinkMenu: MenuItem[] = [];
            const workDipMenu: MenuItem[] = [];

            for (const x in fullMenu) {
                if (fullMenu[x].type === 'wonton' && fullMenu[x].ingredients) {
                    const ingredients: string = fullMenu[x].ingredients.join(', ');
                    const pushWonton: WontonItem = {
                        id: fullMenu[x].id,
                        type: fullMenu[x].type,
                        name: fullMenu[x].name,
                        description: fullMenu[x].description,
                        price: fullMenu[x].price,
                        ingredients: ingredients
                    }
                    workWontonMenu.push(pushWonton);
                }
                if (fullMenu[x].type === 'drink') {
                    workDrinkMenu.push(fullMenu[x]);
                }
                if (fullMenu[x].type === 'dip') {
                    workDipMenu.push(fullMenu[x]);
                }
            }
            setWontonMenu(workWontonMenu);
            setDrinkMenu(workDrinkMenu);
            setDipMenu(workDipMenu);
        }
    }, [fullMenu]); // <-- Sorterar menyn när Redux-tillståndet uppdateras

    return (
        <div className={styles.appContainer}>
            <Header onCartClick={() => setCartOpen(true)} />
            <main className={styles.menuContainer}>
                <h1>MENY</h1>
                {wontonMenu.length > 0 && <WontonSection wontonMenu={wontonMenu} />}
                {dipMenu.length > 0 && <MenuItemList title="DIPSÅS" items={dipMenu} price={dipMenu[0]?.price} />}
                {drinkMenu.length > 0 && <MenuItemList title="DRYCK" items={drinkMenu} price={drinkMenu[0]?.price} />}
            </main>
            {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
        </div>
    );
};

export default Menu;
