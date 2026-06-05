import AuthForm from '@/components/auth/AuthForm'
import { Metadata } from 'next'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Sign up - Hustle Worthy',
  description: 'Sign up - Hustle Worthy',
  path: '/auth/signup',
  noIndex: true,
})
export default function SignUpPage() {
  return <AuthForm type="signup" />
}
