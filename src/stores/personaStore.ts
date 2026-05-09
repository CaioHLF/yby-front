'use client'
// Store persistido para persona/version com override dev.
//
// SECURITY: este store é UI-state apenas, gravado em localStorage e mutável via
// DevTools/XSS. Nunca usar como fonte de verdade de autorização — toda decisão
// de permissão deve vir do JWT/backend. Persona/version aqui só decidem QUAL
// feature renderizar no client; o backend valida o que o usuário pode acessar.

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { Persona, Version } from '@/features/manifests/types'

export type { Persona, Version } from '@/features/manifests/types'

interface PersonaState {
  persona: Persona
  version: Version
  isDevOverride: boolean
  setPersona: (p: Persona, v: Version) => void
  resetToDefault: () => void
}

const DEFAULT_PERSONA: Persona = 'subadquirente'
const DEFAULT_VERSION: Version = 'v0'

export const usePersonaStore = create<PersonaState>()(
  persist(
    (set) => ({
      persona: DEFAULT_PERSONA,
      version: DEFAULT_VERSION,
      isDevOverride: false,
      setPersona: (persona, version) => set({ persona, version, isDevOverride: true }),
      resetToDefault: () =>
        set({
          persona: DEFAULT_PERSONA,
          version: DEFAULT_VERSION,
          isDevOverride: false,
        }),
    }),
    {
      name: 'tupi:persona',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        persona: state.persona,
        version: state.version,
        isDevOverride: state.isDevOverride,
      }),
    },
  ),
)
