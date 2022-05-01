import React, { createContext, useContext, useMemo } from 'react'
import { useImmer } from 'use-immer'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { auth } from '../firebase'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useImmer<boolean>(false)
  const [user, setUser] = useImmer<User | null>(null)
  const router = useRouter()
  const [error, setError] = React.useState(null)
  const [initialLoading, setInitialLoading] = React.useState(true)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(true)
        router.push('/login')
      }
      setInitialLoading(false)
    })
  }, [auth])

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      setUser(createUser.user)
      router.push('/')
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const createUser = await signInWithEmailAndPassword(auth, email, password)
      setUser(createUser.user)
      router.push('/')
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const logout = async () => {
    setLoading(false)
    signOut(auth)
      .then(() => setUser(null))
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(
    () => ({
      error,
      loading,
      logout,
      signIn,
      signUp,
      user,
    }),
    [user, loading]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
