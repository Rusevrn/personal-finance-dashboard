export default function validateForm(formData: Record<string, string>, requiredFields: string[]) {

    let errors: Record<string, string> = {};

    requiredFields.forEach(field => {
        if (!formData[field]?.trim()) {
            errors[field] = `${field} is required.`;
        }
    });

    if (requiredFields.includes('amount') && !errors.amount) {
        if (!Number.isFinite(Number(formData.amount)) ||
            Number(formData.amount) <= 0) {
            errors.amount = 'Amount must be a positive number.';
        }
    }

    return errors;
}
