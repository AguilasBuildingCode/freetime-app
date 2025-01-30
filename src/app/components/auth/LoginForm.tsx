// components/auth/LoginForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';

type FormData = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        // Lógica de autenticación aquí
        console.log(data);
        await new Promise(resolve => setTimeout(resolve, 2000));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                label="Correo electrónico"
                type="email"
                error={errors.email?.message}
                {...register('email', {
                    required: 'El correo es requerido',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Correo electrónico inválido'
                    }
                })}
            />

            <Input
                label="Contraseña"
                type="password"
                error={errors.password?.message}
                {...register('password', {
                    required: 'La contraseña es requerida',
                    minLength: {
                        value: 6,
                        message: 'Mínimo 6 caracteres'
                    }
                })}
            />

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Recordarme
                    </label>
                </div>

                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                    ¿Olvidaste tu contraseña?
                </a>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isSubmitting}>
                Iniciar sesión
            </Button>
        </form>
    );
};

export default LoginForm;