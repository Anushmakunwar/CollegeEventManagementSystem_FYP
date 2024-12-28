import { useEffect, useState } from "react";

function useTimer() {
  const [isResendAvailable, setIsResendAvailable] = useState(false);
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    if (counter === 0) {
      setIsResendAvailable(true);
      return; // Stop the effect from creating more intervals when counter is 0
    }

    const key = setInterval(() => {
      setCounter((count) => count - 1);
    }, 1000);

    return () => clearInterval(key); // Clean up the interval on component unmount
  }, [counter]);

  return { isResendAvailable, counter, setCounter };
}

export default useTimer;
