// app/register/page.tsx
import Logo from '@/app/components/ui/Logo';
import RegisterForm from '@/app/components/auth/RegisterForm';
import SocialAuth from '@/app/components/auth/SocialAuth';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo size="lg" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crea tu cuenta en FreeTime
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Inicia sesión aquí
            </a>
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <RegisterForm />
          <SocialAuth />
        </div>
      </div>
    </div>
  );
}