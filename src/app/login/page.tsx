// app/login/page.tsx
'use client';

import Logo from '@/app/components/ui/Logo';
import LoginForm from '@/app/components/auth/LoginForm';
import SocialAuth from '@/app/components/auth/SocialAuth';
import { useForm } from 'react-hook-form';
import { LoginFormData } from '@/app/types/LoginType';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [error, setError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>();

  const onSubmit = async ({ email, password, rememberMe }: LoginFormData) => {
    await new Promise<void>(async resolve => {
      setError('');
      try {
        const formData = new URLSearchParams();
        formData.append('Email', email);
        formData.append('Password', password);
        const res = await fetch('/api/auth/singin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData,
        })
        console.dir({ res })
        if (!res.ok) {
          throw new Error(`Error WS: ${res.status} ${res.statusText}`)
        }

        if (rememberMe) {
          // ToDo remember me case
          console.log('rememberMe:', rememberMe)
        }

        router.push('/dashbaord')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      }
      resolve()
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo size="lg" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Inicia sesión en tu cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Regístrate gratis
            </a>
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <LoginForm email={watch('email')} password={watch('password')} rememberMe={watch('rememberMe')} errors={errors} register={register} error={error} isSubmitting={isSubmitting} />
          </form>
          <SocialAuth />
        </div>
      </div>
    </div>
  );
}