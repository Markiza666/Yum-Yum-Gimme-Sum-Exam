import { useState, useEffect } from 'react';

// Define the types for the component's props
interface DeliveryTimerProps {
    minutes: number;
}

function DeliveryTimer({ minutes }: DeliveryTimerProps) {
  // TypeScript infers the type of timeLeft to be number
  const [timeLeft, setTimeLeft] = useState<number>(minutes * 60);

    useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1); // Use functional update for safety
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]); // Dependency array is correct

  // Explicitly type the function parameters and return type
    const formatMinutes = (time: number): number => {
        return Math.ceil(time / 60);
    };

    return (
        <div>
        {timeLeft > 0 ? (
            // Ensure formatMinutes is called with a number, which it is
            <h5> {formatMinutes(timeLeft)} minuter </h5>
        ) : (
            <h5>Levererad!</h5>
        )}
        </div>
    );
}

export default DeliveryTimer;