import { useState, useEffect } from 'react';

interface DeliveryTimerProps {
    minutes: number;
}

function DeliveryTimer({ minutes }: DeliveryTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(minutes * 60);

    useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1); 
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]); 

    const formatMinutes = (time: number): number => {
        return Math.ceil(time / 60);
    };

    return (
        <span>
        {timeLeft > 0 ? (
            <h5> {formatMinutes(timeLeft)} minuter </h5>
        ) : (
            <h5>Levererad!</h5>
        )}
        </span>
    );
}

export default DeliveryTimer;