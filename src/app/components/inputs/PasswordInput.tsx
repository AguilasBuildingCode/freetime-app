import { forwardRef } from "react";
import Input from "../ui/Input";
import { isValidPassword } from "@/utils/validatios";

export const PasswordInputSoftValidate = {
    required: 'La contraseña es requerida',
    minLength: {
        value: 8,
        message: 'Mínimo 8 caracteres'
    },
};

export const PasswordInputValidate = {
    required: 'La contraseña es requerida',
    minLength: {
        value: 8,
        message: 'Mínimo 8 caracteres'
    },
    validate: (password: string | boolean) => {
        if (typeof password === 'boolean') {
            return password
        }
        return isValidPassword(password) || 'Debe contener mayúsculas, minúsculas, números y al menos un carácter especial (@$!%*?&)'
    },
};

const PasswordInput = forwardRef<HTMLInputElement, {
    errors: {
        password?: {
            message?: string
        }
    },
}>(
    ({ errors: { password }, ...props }, ref) => {
        return <Input
            ref={ref}
            key='password'
            id='password'
            type='password'
            label='Contraseña'
            error={password?.message}
            {...props}
        />
    }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput