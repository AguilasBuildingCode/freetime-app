// components/auth/RegisterForm.tsx
'use client';

import { RegisterOptions, useForm } from 'react-hook-form';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { isValidEmail, isValidPassword } from '@/utils/validatios';

type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
};

type InputConfig = {
    id: keyof FormData;
    label: string;
    type?: string;
    // validation: {
    //     required?: string,
    //     minLength?: {
    //         value: number,
    //         message: string,
    //     },
    //     maxLength?: {
    //         value: number,
    //         message: string,
    //     },
    //     validate?: (value: string) => boolean | string
    // };
    validation: RegisterOptions<FormData, keyof FormData>
};

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<FormData>({
        defaultValues: {
            terms: false
        }
    });

    const password = watch('password');

    const formFields: InputConfig[] = [
        {
            id: 'username',
            label: 'Nombre de usuario',
            validation: {
                required: 'El nombre de usuario es requerido',
                minLength: {
                    value: 3,
                    message: 'Mínimo 3 caracteres'
                },
                maxLength: {
                    value: 20,
                    message: 'Máximo 20 caracteres'
                }
            }
        },
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
                validate: (password) => {
                    if (typeof password === 'boolean') {
                        return password
                    }
                    return isValidPassword(password) || 'Debe contener mayúsculas, minúsculas y números'
                },
            }
        },
        {
            id: 'confirmPassword',
            label: 'Confirmar contraseña',
            type: 'password',
            validation: {
                required: 'Confirma tu contraseña',
                validate: (value) => value === password || 'Las contraseñas no coinciden'
            }
        }
    ];

    const onSubmit = async (data: FormData) => {
        // Lógica de registro
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
                    {...register(id, {...validation})}
                />
            ))}

            <div className="flex items-center">
                <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    {...register('terms', {
                        required: 'Debes aceptar los términos y condiciones'
                    })}
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    Acepto los{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                        Términos de servicio
                    </a>{' '}
                    y la{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                        Política de privacidad
                    </a>
                </label>
            </div>
            {errors.terms && (
                <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
            )}

            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
            >
                Registrarse
            </Button>
        </form>
    );
};

export default RegisterForm;