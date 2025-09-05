import AuthForm from '@/components/auth/AuthForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign up - Hustle Worthy',
  description: 'Sign up - Hustle Worthy',
}
export default function SignUpPage() {
  return <AuthForm type="signup" />
}
