import { useState, useEffect } from 'react';

// This custom hook gets a unique state for every component it is initialized in.

const useCounter = (forwards = true) => {
    const [counter, setCounter] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (forwards) {
                setCounter((prevCounter) => prevCounter + 1)
            } else {
                setCounter((prevCounter) => prevCounter - 1)
            }
        }, 1000);
    
        return () => clearInterval(interval);
    }, [forwards]);
    return counter
}

export default useCounter