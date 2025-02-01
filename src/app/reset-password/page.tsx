'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '../components/ui/Input'
import { RegisterOptions, useForm } from 'react-hook-form';
import { isEmpty, isNotUndefined, isUndefined, isValidEmail } from '@/utils/validatios';
import Button from '../components/ui/Button';

type FormData = {
    email: string;
    wsError: string;
};

type InputConfig = {
    id: keyof FormData;
    label: string;
    type?: string;
    validation: RegisterOptions<FormData, keyof FormData>
};

const ResetPasswordPage = () => {
    const [error, setError] = useState('')
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<FormData>();

    const email = watch('email');

    const formFields: InputConfig[] = [
        {
            id: 'email',
            label: 'Correo electrónico',
            type: 'email',
            validation: {
                required: 'El correo es requerido',
                validate: (email) => {
                    setError('')
                    if (typeof email === "boolean") {
                        return email
                    }
                    return isValidEmail(email) || 'Correo electrónico inválido'
                },
            }
        },
    ];

    const onSubmit = async (data: FormData) => {
        setError('')

        try {
            const res = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`)
            }

            router.push('/reset-password/success')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido')
        }
    }

    const disabledBtn = (): boolean => {
        return isNotUndefined(errors.email) || isEmpty(email);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Restablecer contraseña
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
                                {...register(id, { ...validation })}
                            />
                        ))}

                        {isUndefined(errors.email) && error && (
                            <div className="text-red-600 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <Button type="submit" variant='primary' size='lg' className='w-full' disabled={disabledBtn()} isLoading={isSubmitting}>
                                {isSubmitting ? 'Enviando...' : 'Enviar enlace'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage;