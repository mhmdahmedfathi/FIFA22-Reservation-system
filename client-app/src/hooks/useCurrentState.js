import { useState } from "react";

const useCurrentState = (errorFunction) => {

    const [value, setValue] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (value) => {
        if (!errorFunction(value)) {
            setError(false);
        } else {
            setError(true);
        }
        setValue(value);
    }

    const handleEvent = (e) => {
        if (!errorFunction(e.target.value)) {
            setError(false);
        } else {
            setError(true);
        }
        setValue(e.target.value);
    }


    return {
        value,
        error,
        handleChange,
        handleEvent
    }
}

export default useCurrentState;