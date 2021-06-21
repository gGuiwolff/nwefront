import { useState } from "react";
import { instance } from "../axios";

const useAuthSubmit = (url, values, reset, secondUrl) => {
    const [progress, setProgress] = useState({
        error: false,
        errorMessage: "",
        isSubmitting: false,
        step: 1,
    });

    const submit = async (e) => {
        e.preventDefault();
        setProgress((prevState) => ({
            ...prevState,
            isSubmitting: true,
        }));
        try {
            progress.step === 1
                ? await instance.post("https://vegiw.herokuapp.com/register", values)
                : await instance.post("https://vegiw.herokuapp.com/login", values);
            !reset
                ? location.replace("/")
                : setProgress((prevState) => ({
                      ...prevState,
                      step: prevState.step + 1,
                  }));
        } catch (err) {
            const { error } = err.response.data;
            setProgress((prevState) => ({
                ...prevState,
                error: true,
                errorMessage: error,
            }));
            setTimeout(
                () =>
                    setProgress((prevState) => ({
                        ...prevState,
                        error: false,
                        errorMessage: "",
                    })),
                3000
            );
        }
        setProgress((prevState) => ({
            ...prevState,
            isSubmitting: false,
        }));
    };

    return [submit, progress];
};

export default useAuthSubmit;
