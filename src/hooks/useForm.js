import { useState } from "react";

const useForm = () => {
    const [values, setValues] = useState({});
    return [
        values,
        ({ target, progress }) => {
            setValues({
                ...values,
                [target.name]: target.value,
            });
        },
    ];
};

export default useForm;
