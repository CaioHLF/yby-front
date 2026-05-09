// Manifest stub do adquirente para a fase inicial.

import type { PersonaManifest } from '@/features/manifests/types'

const v0 = {
  label: 'Adquirente · v0',
  persona: 'adquirente',
  version: 'v0',
  modules: ['dashboard'],
  submenus: {},
  badges: {
    dev: 'AQ v0',
  },
} satisfies PersonaManifest

export const adquirente = {
  v0,
}

// V0 esqueleto, telas ficam para fase futura.
