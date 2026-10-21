import { useState } from "react";
import validateForm from "../utils/validateForm";

export default function useForm(initialValues, requiredFields, onSubmit) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const getInputProps = (inputFieldName) => {
        return {
            name: inputFieldName,
            onChange: changeHandler,
            onBlur: validationHandler,
            value: values[inputFieldName]
        }
    }

    const changeHandler = (event) => {
        const { name, value } = event.target;

        setValues(values => ({
            ...values,
            [name]: value
        }));
    }

    const validationHandler = (event) => {
        if (event) {
            setTouched(state => ({
                ...state,
                [event.target.name]: true
            }))
        }

        const errors = validateForm(values, requiredFields);
        setErrors(errors);

        return errors;
    }

    const submitAction = async () => {
        const errors = validationHandler();
        setSubmitted(true);

        if (Object.keys(errors).length > 0) {
            return;
        }

        await onSubmit(values);
        resetForm();
    }

    const resetForm = () => {
        setTouched({});
        setSubmitted(false);
        setErrors({});
        setValues(initialValues);
    }

    return {
        values,
        setValues,
        errors,
        touched,
        submitted,
        changeHandler,
        validationHandler,
        submitAction,
        resetForm,
        getInputProps
    }
}