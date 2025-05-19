import { useEffect, useState } from 'react';
import { WontonItem, MenuItem, WholeMenu } from '../utils/interfaces';
import WontonSection from '../components/menu/WontonSection';
import MenuItemList from '../components/menu/MenuItemList';
import styles from '../sass/Menu.module.scss'
import Header from '../components/header/Header';
import { Cart } from '../components/cart/Cart';
import { apiCom, ApiComArgs } from '../service/api/api';
import { useApiKey } from '../service/hooks/useApiKey';

function Menu() {
    const apiKey = useApiKey();

    const [wontonMenu, setWontonMenu] = useState<WontonItem[]>([]);
    const [drinkMenu, setDrinkMenu] = useState<MenuItem[]>([]);
    const [dipMenu, setDipMenu] = useState<MenuItem[]>([]);

    const [cartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        async function getMenu() {
            const menuArgs: ApiComArgs = {
                urlExtension: 'menu', 
                apiMethod: 'GET',
                key: apiKey
            };
            try {
                const apiMenu = await apiCom(menuArgs) as WholeMenu;
                const workMenu: MenuItem[] = apiMenu.items;
                const workWontonMenu: WontonItem[] = [];
                const workDrinkMenu: MenuItem[] = [];
                const workDipMenu: MenuItem[] = [];
                for (const x in workMenu) {
                    if (workMenu[x].type === 'wonton' && workMenu[x].ingredients) {
                        const ingredients: string = workMenu[x].ingredients.join(', ');
                        const pushWonton: WontonItem = {
                            id: workMenu[x].id,
                            type: workMenu[x].type,
                            name: workMenu[x].name,
                            description: workMenu[x].description,
                            price: workMenu[x].price,
                            ingredients: ingredients
                        } 
                        workWontonMenu.push(pushWonton);
                    }
                    if (workMenu[x].type === 'drink') {
                        workDrinkMenu.push(workMenu[x]);
                    }
                    if (workMenu[x].type === 'dip') {
                        workDipMenu.push(workMenu[x]);
                    }
                }
                setWontonMenu(workWontonMenu);
                setDrinkMenu(workDrinkMenu);
                setDipMenu(workDipMenu);

            }catch (error) {
                console.error('Fel vid hämtning av meny: ', error);
            }
            
        }
        getMenu();
    },[apiKey]);

    return (
        <div className={styles.appContainer}>
            <Header onCartClick={() => setCartOpen(true)} />
            <main className={styles.menuContainer}>
                <h1>MENY</h1>
                <WontonSection wontonMenu={wontonMenu} />
                <MenuItemList title="DIPSÅS" items={dipMenu} price={dipMenu[0]?.price} />
                <MenuItemList title="Drinks" items={drinkMenu} price={dipMenu[0]?.price} />
            </main>
            {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
        </div>
    );
};

export default Menu;
