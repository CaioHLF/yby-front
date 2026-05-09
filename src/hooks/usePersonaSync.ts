'use client'
// Hook que sincroniza query params de persona apenas em dev/QA.

import { useEffect } from 'react'
import { usePersonaStore, type Persona, type Version } from '@/stores/personaStore'

function isPersona(value: string | null): value is Persona {
  return value === 'estabelecimento' || value === 'subadquirente' || value === 'adquirente'
}

function isVersion(value: string | null): value is Version {
  return value === 'v0' || value === 'v1'
}

export function usePersonaSync(): void {
  const setPersona = usePersonaStore((state) => state.setPersona)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return

    const params = new URLSearchParams(window.location.search)
    const personaParam = params.get('persona')
    const versionParam = params.get('version')

    if (!isPersona(personaParam) && !isVersion(versionParam)) return

    const current = usePersonaStore.getState()
    const nextPersona = isPersona(personaParam) ? personaParam : current.persona
    const nextVersion = isVersion(versionParam) ? versionParam : current.version

    setPersona(nextPersona, nextVersion)
  }, [setPersona])
}
