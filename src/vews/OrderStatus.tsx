import Header from '../components/header/Header';
import styles from '../sass/OrderStatus.module.scss';
import boxtop from '../assets/img/boxtop 1.svg';
import { CustomButton } from '../components/button/CustomButton';

export function OrderStatus() {
    return (
        <div className={styles.appContainer}>
            <Header hideVarukorg={true} />
            <main className={styles.orderStatContainer}>
                <article>
                    <figure className={styles.box}>
                        <img 
                        src={boxtop} 
                        alt="Wontons box" />
                    </figure>

                    <section className={styles.info}>
                        <h2>DINA WONTONS TILLAGAS!</h2>
                        <h5>ETA XX MIN</h5>
                        <p>xxxxxxx</p>
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
                            SE KVITTO
                        </CustomButton>
                    </nav>
                </article>
            </main>
        </div>
    )
}