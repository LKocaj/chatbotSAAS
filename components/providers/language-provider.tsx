'use client'

import { createContext, useContext, useState, useCallback } from 'react'

type LanguageMode = 'simple' | 'technical'

interface LanguageContextType {
  mode: LanguageMode
  toggle: () => void
  isSimple: boolean
}

const LanguageContext = createContext<LanguageContextType>({
  mode: 'technical',
  toggle: () => {},
  isSimple: false,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<LanguageMode>('technical')

  const toggle = useCallback(() => {
    setMode((prev) => (prev === 'simple' ? 'technical' : 'simple'))
  }, [])

  return (
    <LanguageContext.Provider value={{ mode, toggle, isSimple: mode === 'simple' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
