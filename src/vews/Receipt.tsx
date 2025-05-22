import { CustomButton } from '../components/button/CustomButton';
import Header from '../components/header/Header';
import styles from '../sass/Receipt.module.scss';
import logoRed from '../assets/img/logoRed.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'; 
import { useApiKey } from '../app/hooks/useApiKey';
import { performApiCom } from '../service/api/api';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { ReceiptData, ReceiptItem } from '../utils/interfaces'; 

export function Receipt() {
    const location = useLocation();
    const navigate = useNavigate();
    const orderId = location.state?.orderId;
    const receiptApiKey = useApiKey();
    const dispatch = useDispatch<AppDispatch>();

    const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleNeworderClick = () => {
        navigate('/menu');
    }

    useEffect(() => {
        if (orderId) {
            async function fetchReceipt() {
                setLoading(true);
                setError(null);
                const apiComArgs = {
                    urlExtension: '/receipts/' + orderId,
                    apiMethod: 'GET',
                    key: '' + receiptApiKey,
                };
                try {
                    const resultAction = await dispatch(performApiCom(apiComArgs));
                    const response = unwrapResult(resultAction) as ReceiptData;
                    console.log('Receipt data:', response);
                    setReceiptData(response); 
                } catch (error: unknown) {
                    console.error("Error fetching receipt:", error);
                    let errorMessage = "Kunde inte hämta kvittot. Vänligen försök igen.";
                    if (typeof error === 'string') {
                        errorMessage = "Kunde inte hämta kvittot: " + error;
                    } else if (error instanceof Error) {
                        errorMessage = "Kunde inte hämta kvittot: " + error.message;
                    }
                    setError(errorMessage);
                    alert(errorMessage);
                } finally {
                    setLoading(false);
                }
            }
            fetchReceipt();
        } else {
            const errorMessage = "Order ID finns inte med i location state. Vänligen försök igen.";
            console.error(errorMessage);
            setError(errorMessage);
            alert(errorMessage);
            setLoading(false);
        }
    }, [orderId, receiptApiKey, dispatch]);

    if (loading) {
        return (
            <div className={styles.appContainer}>
                <Header hideVarukorg={true} onCartClick={() => {}} />
                <main className={styles.receiptContainer}>
                    <p>Laddar kvitto...</p>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.appContainer}>
                <Header hideVarukorg={true} onCartClick={() => {}} />
                <main className={styles.receiptContainer}>
                    <p>{error}</p>
                    <nav className={styles.buttons}>
                        <CustomButton
                            className={styles.receiptBtn}
                            onClick={() => handleNeworderClick()}
                        >
                            <h5>GÖR EN NY BESTÄLLNING</h5>
                        </CustomButton>
                    </nav>
                </main>
            </div>
        );
    }

    if (!receiptData) {
        return (
            <div className={styles.appContainer}>
                <Header hideVarukorg={true} onCartClick={() => {}} />
                <main className={styles.receiptContainer}>
                    <p>Ingen kvittoinformation tillgänglig.</p>
                    <nav className={styles.buttons}>
                        <CustomButton
                            className={styles.receiptBtn}
                            onClick={() => handleNeworderClick()}
                        >
                            <h5>GÖR EN NY BESTÄLLNING</h5>
                        </CustomButton>
                    </nav>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.appContainer}>
            <Header hideVarukorg={true} onCartClick={() => {}} />
            <main className={styles.receiptContainer}>
                <section className={styles.receiptSection}>
                    <figure className={styles.box}>
                        <img
                            src={logoRed}
                            alt="Red logotyp"
                        />
                    </figure>

                    <article className={styles.info}>
                        <hgroup>
                            <h3>KVITTO</h3>
                            <p>{receiptData.receipt.id}</p> 
                            <p>{new Date(receiptData.receipt.timestamp).toLocaleString('sv-SE')}</p>
                        </hgroup>

                        <ul className={styles.menuItemsWrapper}>
                            {receiptData.receipt.items.map((item: ReceiptItem, index: number) => (
                                <li className={styles.menuItemRow} key={item.id || index}>
                                    <hgroup>
                                        <h5>{item.name}</h5>
                                        <pre>{item.quantity} stycken</pre>
                                    </hgroup>
                                    <span className={styles.divider}></span>
                                    <h5 className={styles.price }>{item.price * item.quantity} SEK</h5>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.totalLine}>
                            <hgroup className={styles.totalLineMoms}>
                                <h5>TOTALT</h5>
                                <pre>inkl 20% moms</pre>
                            </hgroup>
                            <h1>{receiptData.receipt.orderValue} SEK</h1>
                        </div>
                    </article>
                </section>

                <nav className={styles.buttons}>
                    <CustomButton
                        className={styles.receiptBtn}
                        onClick={() => handleNeworderClick()}
                    >
                        <h5>GÖR EN NY BESTÄLLNING</h5>
                    </CustomButton>
                </nav>
            </main>
        </div>
    )
}
