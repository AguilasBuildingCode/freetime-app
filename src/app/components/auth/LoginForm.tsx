// components/auth/LoginForm.tsx
'use client';

import { RegisterOptions, useForm } from 'react-hook-form';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import { isEmpty, isNotUndefined, isValidEmail } from '@/utils/validatios';

type FormData = {
    email: string;
    password: string;
    rememberMe: boolean;
};

type InputConfig = {
    id: keyof FormData;
    label: string;
    type?: string;
    validation: RegisterOptions<FormData, keyof FormData>
};

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<FormData>();

    const email = watch('email');
    const password = watch('password');

    const formFields: InputConfig[] = [
        {
            id: 'email',
            label: 'Correo electrónico',
            type: 'email',
            validation: {
                required: 'El correo es requerido',
                validate: (email) => {
                    if (typeof email === "boolean") {
                        return email
                    }
                    return isValidEmail(email) || 'Correo electrónico inválido'
                },
            }
        },
        {
            id: 'password',
            label: 'Contraseña',
            type: 'password',
            validation: {
                required: 'La contraseña es requerida',
                minLength: {
                    value: 8,
                    message: 'Mínimo 8 caracteres'
                },
            }
        },
    ];

    const disabledBtn = (): boolean => {
        if (!password) {
            return true
        }
        return isNotUndefined(errors.email) || isEmpty(email) || isNotUndefined(errors.password) || isEmpty(password) || password.length < 8
    }

    const onSubmit = async (data: FormData) => {
        // Lógica de autenticación aquí
        console.log(data);
        await new Promise(resolve => setTimeout(resolve, 2000));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {formFields.map(({ id, label, type = 'text', validation }) => (
                <Input
                    key={id}
                    id={id}
                    type={type}
                    label={label}
                    error={errors[id]?.message}
                    {...register(id, { ...validation })}
                />
            ))}

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" {
                            ...register('rememberMe')
                        }
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Recordarme
                    </label>
                </div>

                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                    ¿Olvidaste tu contraseña?
                </a>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={disabledBtn()} isLoading={isSubmitting}>
                Iniciar sesión
            </Button>
        </form>
    );
};

export default LoginForm;