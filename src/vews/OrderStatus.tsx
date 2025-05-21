import Header from '../components/header/Header';
import styles from '../sass/OrderStatus.module.scss';
import boxtop from '../assets/img/boxtop 1.svg';
import { CustomButton } from '../components/button/CustomButton';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryTimer from './../components/delivery/DeliveryTimer';

export function OrderStatus() {
    const location = useLocation();
    const navigate = useNavigate();
    const eta = location.state?.eta;
    const orderId = location.state?.orderId;

    const handleNewOrderClick = () => {
        navigate('/menu');
    }
    
    const showReceipt = () => {
        navigate('/receipt', { state: { orderId: orderId } });
    }
    const etaMinutes: string = (Math.floor((Date.parse((new Date(eta)).toString()) - Date.now()) / 60000).toString());
    const etaMin: number = parseInt(etaMinutes);
    return (
        <div className={styles.appContainer}>
            <Header hideVarukorg={true} onCartClick={() => {}} />
            <main className={styles.orderStatContainer}>
                <article>
                    <figure className={styles.box}>
                        <img 
                        src={boxtop} 
                        alt="Wontons box" />
                    </figure>

                    <section className={styles.info}>
                        <h2>DINA WONTONS TILLAGAS!</h2>
                        <hgroup>
                            ETA  
                            {DeliveryTimer({minutes: etaMin})}
                        </hgroup>
                        <p>{orderId}</p>
                    </section>

                    <nav className={styles.buttons}>
                        <CustomButton
                        className={styles.orderBtn}
                        onClick={() => handleNewOrderClick()} 
                        >
                            <h5>GÖR EN NY BESTÄLLNING</h5>
                        </CustomButton>

                        <CustomButton
                        className={styles.receiptBtn}
                        onClick={() => showReceipt()} 
                        >
                            <h5>SE KVITTO</h5>
                        </CustomButton>
                    </nav>
                </article>
            </main>
        </div>
    )
}