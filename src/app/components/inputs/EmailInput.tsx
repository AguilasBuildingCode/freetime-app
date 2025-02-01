import { forwardRef } from "react";
import Input from "../ui/Input";
import { isValidEmail } from "@/utils/validatios";

export const EmailInputValidate = {
    required: 'El correo es requerido',
    validate: (email: string | boolean) => {
        if (typeof email === "boolean") {
            return email
        }
        return isValidEmail(email) || 'Correo electrónico inválido'
    },
};

const EmailInput = forwardRef<HTMLInputElement, {
    type?: string, errors: {
        email?: {
            message?: string
        }
    },
}>(
    ({ errors: { email }, ...props }, ref) => {
        return <Input
            ref={ref}
            key='email'
            id='email'
            type='email'
            label='Correo electrónico'
            error={email?.message}
            {...props}
        />
    }
);

EmailInput.displayName = 'EmailInput';

export default EmailInput