import { CustomButton } from '../components/button/CustomButton';
import Header from '../components/header/Header';
import styles from '../sass/Receipt.module.scss';
import logoRed from '../assets/img/logoRed.svg';

export function Receipt() {
    return (
        <div className={styles.appContainer}>
            <Header hideVarukorg={true} onCartClick={() => {}} />
            <main className={styles.receiptContainer}>
                <section className={styles.receiptSection}>
                    <figure className={styles.box}>
                        <img 
                        src={logoRed} 
                        alt="Red logotyp" />
                    </figure>

                    <article className={styles.info}>
                        <hgroup>
                            <h3>KVITTO</h3>
                            <p>xxxxxxx</p>
                        </hgroup>
                        <ul className={styles.menuItemsWrapper}>
                            <li className={styles.menuItemRow}>
                                <h5>Item NameItem NameItem NameItem Name</h5>
                                <span className={styles.divider}></span>
                                <h5 className={styles.price }>5 kr</h5>
                            </li>
                            <li className={styles.menuItemRow}>
                                <h5>Item Name</h5>
                                <span className={styles.divider}></span>
                                <h5 className={styles.price }>5 kr</h5>
                            </li>
                            <li className={styles.menuItemRow}>
                                <h5>Item Name</h5>
                                <span className={styles.divider}></span>
                                <h5 className={styles.price }>5 kr</h5>
                            </li>
                            <li className={styles.menuItemRow}>
                                <h5>Item Name</h5>
                                <span className={styles.divider}></span>
                                <h5 className={styles.price }>5 kr</h5>
                            </li>
                            <li className={styles.menuItemRow}>
                                <h5>Item Name</h5>
                                <span className={styles.divider}></span>
                                <h5 className={styles.price }>5 kr</h5>
                            </li>
                            <li className={styles.menuItemRow}>
                                <h5>Item Name</h5>
                                <span className={styles.divider}></span>
                                <h5 className={styles.price }>5 kr</h5>
                            </li>
                            <li className={styles.menuItemRow}>
                                <h5>Item Name</h5>
                                <span className={styles.divider}></span>
                                <h5 className={styles.price }>5 kr</h5>
                            </li>
                            <li className={styles.menuItemRow}>
                                <h5>Item Name</h5>
                                <span className={styles.divider}></span>
                                <h5 className={styles.price }>5 kr</h5>
                            </li>
                            <li className={styles.menuItemRow}>
                                <h5>Item Name</h5>
                                <span className={styles.divider}></span>
                                <h5 className={styles.price }>5 kr</h5>
                            </li>
                            <li className={styles.menuItemRow}>
                                <h5>Item Name</h5>
                                <span className={styles.divider}></span>
                                <h5 className={styles.price }>5 kr</h5>
                            </li>
                            <li className={styles.menuItemRow}>
                                <h5>Item Name</h5>
                                <span className={styles.divider}></span>
                                <h5 className={styles.price }>5 kr</h5>
                            </li>
                            <li className={styles.menuItemRow}>
                                <h5>Item Name</h5>
                                <span className={styles.divider}></span>
                                <h5 className={styles.price }>5 kr</h5>
                            </li>
                            <li className={styles.menuItemRow}>
                                <h5>Item Name</h5>
                                <span className={styles.divider}></span>
                                <h5 className={styles.price }>5 kr</h5>
                            </li>
                        </ul>
                        
                        <hgroup className={styles.totalLine}>
                            <h4>TOTALT</h4>
                            <h1>0 kr</h1>
                        </hgroup>
                    </article>
                </section>

                <nav className={styles.buttons}>
                    <CustomButton
                    className={styles.orderBtn}
                    onClick={() => console.log(`Klickade på knappen`)} 
                    >
                        GÖR EN NY BESTÄLLNING
                    </CustomButton>

                    <CustomButton
                    className={styles.receiptBtn}
                    onClick={() => console.log(`Klickade på knappen`)} 
                    >
                        GÖR EN NY BESTÄLLNING
                    </CustomButton>
                </nav>
            </main>
        </div>
    )
}