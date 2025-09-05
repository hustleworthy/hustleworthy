import AuthForm from '@/components/auth/AuthForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Hustle Worthy',
  description: 'Login - Hustle Worthy',
}
export default function LoginPage() {
  return <AuthForm type="login" />
}
