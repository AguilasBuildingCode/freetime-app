'use client'

import Button from '@/app/components/ui/Button';
import Input from '@/app/components/ui/Input';
import { isValidPassword } from '@/utils/validatios';
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { RegisterOptions, useForm } from 'react-hook-form';

type FormData = {
    password: string;
    confirmPassword: string;
};

type InputConfig = {
    id: keyof FormData;
    label: string;
    type?: string;
    validation: RegisterOptions<FormData, keyof FormData>
};

const NewPasswordPage = ({ params }: { params: Promise<{ token: string }> }) => {
    const [error, setError] = useState('')
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<FormData>();

    const password = watch('password');

    const formFields: InputConfig[] = [
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
                    return isValidPassword(password) || 'Debe contener mayúsculas, minúsculas, números y al menos un carácter especial (@$!%*?&)'
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
        setError('')

        try {
            const res = await fetch('/api/reset-password/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: (await params).token,
                    data
                }),
            })

            if (!res.ok) {
                throw new Error(await res.text())
            }

            router.push('/login?reset=success')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar la contraseña')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Nueva contraseña
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {formFields.map(({ id, label, type = 'text', validation }) => (
                            <Input
                                key={id}
                                id={id}
                                type={type}
                                label={label}
                                error={errors[id]?.message}
                                {...register(id, validation)}
                            />
                        ))}

                        {error && (
                            <div className="text-red-600 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full"
                                isLoading={isSubmitting}
                                // disabled={}
                            >
                                {isSubmitting ? 'Actualizando...' : 'Actualizar contraseña'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewPasswordPage;