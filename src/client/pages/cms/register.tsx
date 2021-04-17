import React from 'react'
import AuthPage from '~client/components/for-admin/auth/auth-page'
import { useAdmin } from '~client/shared/hooks/useAdmin'
import LoadingPage from '~client/components/for-admin/auth/loading-page/loading-page'

const Register = () => {
  const { useAutorizePage } = useAdmin()
  const { isLoaded } = useAutorizePage()
  if (!isLoaded) return <LoadingPage />
  return <AuthPage isLogin={false} />
}

export default Register
