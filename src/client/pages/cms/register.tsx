import React from 'react'
import AuthPage from '~client/components/for-admin/auth/auth-page'
import { useAdmin } from '~client/shared/hooks/useAdmin'

const Register = () => {
  const { useAutorizePage } = useAdmin()
  useAutorizePage()
  return <AuthPage isLogin={false} />
}

export default Register
