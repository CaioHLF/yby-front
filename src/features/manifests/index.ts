// Registry tipado de manifests por persona e versão.

import { adquirente } from '@/features/adquirente/manifest'
import { estabelecimento } from '@/features/estabelecimento/manifest'
import type { PersonaManifest, Persona, Version } from '@/features/manifests/types'
import { subadquirente } from '@/features/subadquirente/manifest'

export const manifests = {
  estabelecimento,
  subadquirente,
  adquirente,
} as const satisfies Record<Persona, Partial<Record<Version, PersonaManifest | null>>>

export function getManifest(persona: Persona, version: Version): PersonaManifest | null {
  if (!Object.hasOwn(manifests, persona)) return null
  const personaManifests = manifests[persona] as Partial<Record<Version, PersonaManifest | null>>
  if (!Object.hasOwn(personaManifests, version)) return null
  return personaManifests[version] ?? null
}
