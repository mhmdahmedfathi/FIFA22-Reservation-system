import { useState } from "react";

const useInput = (errorFunction) => {

    const [value, setValue] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (e) => {
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
        handleChange
    }
}

export default useInput;