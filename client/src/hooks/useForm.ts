import { useState, type ChangeEvent, type FocusEvent } from "react";
import validateForm from "../utils/validateForm";

type OnSubmit<T> = (values: T) => Promise<void>;

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;  

export default function useForm<T extends Record<string, string>>(initialValues: T, requiredFields: string[], onSubmit: OnSubmit<T>) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [submitted, setSubmitted] = useState(false);

    const getInputProps = (inputFieldName: keyof T) => {
        return {
            name: inputFieldName,
            onChange: changeHandler,
            onBlur: validationHandler,
            value: values[inputFieldName]
        }
    }

    const changeHandler = (event: ChangeEvent<FormElement>) => {
        const { name, value } = event.target;

        setValues(values => ({
            ...values,
            [name]: value
        }));
    }

    const validationHandler = (event?: FocusEvent<FormElement>) => {
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