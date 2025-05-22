import Header from '../components/header/Header';
import styles from '../sass/OrderStatus.module.scss';
import boxtop from '../assets/img/boxtop 1.svg';
import { CustomButton } from '../components/button/CustomButton';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryTimer from './../components/delivery/DeliveryTimer';
import { useEffect, useState } from 'react';

export function OrderStatus() {
    const location = useLocation();
    const navigate = useNavigate();

    const initialEta = location.state?.eta;
    const initialOrderId = location.state?.orderId;

    const [eta, setEta] = useState(initialEta || localStorage.getItem('lastOrderEta'));
    const [orderId, setOrderId] = useState(initialOrderId || localStorage.getItem('lastOrderId'));

    useEffect(() => {
        if (initialEta) {
            localStorage.setItem('lastOrderEta', initialEta);
            setEta(initialEta);
        }
        if (initialOrderId) {
            localStorage.setItem('lastOrderId', initialOrderId);
            setOrderId(initialOrderId);
        }
    }, [initialEta, initialOrderId]);

    const handleNewOrderClick = () => {
        localStorage.removeItem('lastOrderEta');
        localStorage.removeItem('lastOrderId');
        setEta(null);
        setOrderId(null);
        navigate('/menu');
    }
    
    const showReceipt = () => {
        navigate('/receipt', { state: { orderId: orderId } });
    }

    const etaMinutes: string = eta ? (Math.floor((Date.parse((new Date(eta)).toString()) - Date.now()) / 60000).toString()) : '0';
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
                        {orderId && eta ? (
                            <>
                                <h2>DINA WONTONS TILLAGAS!</h2>
                                <hgroup>
                                    ETA 
                                    {DeliveryTimer({minutes: etaMin})}
                                </hgroup>
                                <p>{orderId}</p> 
                            </>
                        ) : (
                            <>
                                <h2>INGEN AKTIV BESTÄLLNING</h2>
                                <p>Det verkar inte finnas någon aktiv leverans just nu. Gör en ny beställning för att få dina wontons!</p>
                            </>
                        )}
                    </section>

                    <nav className={styles.buttons}>
                        <CustomButton
                        className={styles.orderBtn}
                        onClick={() => handleNewOrderClick()} 
                        >
                            <h5>GÖR EN NY BESTÄLLNING</h5>
                        </CustomButton>

                        {orderId && ( 
                            <CustomButton
                            className={styles.receiptBtn}
                            onClick={() => showReceipt()} 
                            >
                                <h5>SE KVITTO</h5>
                            </CustomButton>
                        )}
                    </nav>
                </article>
            </main>
        </div>
    )
}
