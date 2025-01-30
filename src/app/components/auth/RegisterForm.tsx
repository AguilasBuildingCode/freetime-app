// components/auth/RegisterForm.tsx
'use client';

import { FieldError, useForm } from 'react-hook-form';
import Button from '../ui/Button';

type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean; // Agregamos el campo terms al tipo
};

type FormErrors = {
    terms?: FieldError;
    // Agregar otros campos si es necesario
};

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors, isSubmitting }
    } = useForm<FormData>({
        defaultValues: {
            terms: false
        }
    });

    const onSubmit = async (data: FormData) => {
        // Lógica de registro aquí
        console.log(data);
        await new Promise(resolve => setTimeout(resolve, 2000));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* ... otros campos ... */}

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
                <p className="mt-1 text-sm text-red-600">{(errors as FormErrors).terms?.message}</p>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isSubmitting}>
                Registrarse
            </Button>
        </form>
    );
};

export default RegisterForm;