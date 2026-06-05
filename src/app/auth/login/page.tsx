import AuthForm from '@/components/auth/AuthForm'
import { Metadata } from 'next'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Login - Hustle Worthy',
  description: 'Login - Hustle Worthy',
  path: '/auth/login',
  noIndex: true,
})
export default function LoginPage() {
  return <AuthForm type="login" />
}
