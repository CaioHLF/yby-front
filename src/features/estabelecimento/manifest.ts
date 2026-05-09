// Manifest do estabelecimento para a base multi-persona.

import type { PersonaManifest } from '@/features/manifests/types'

const v0 = {
  label: 'Estabelecimento Comercial · v0',
  persona: 'estabelecimento',
  version: 'v0',
  modules: ['dashboard', 'cobrancas', 'agenda', 'financeiro', 'configuracoes'],
  submenus: {
    cobrancas: ['cobrancas', 'links', 'maquininhas'],
    financeiro: ['extrato', 'antecipacoes', 'liquidacoes', 'taxas-simulacoes'],
    configuracoes: ['usuarios', 'empresas'],
  },
  defaultExpanded: 'agenda',
  onboarding: {
    autoAdvance: true,
    autoSettlement: true,
  },
  badges: {
    dev: 'EC v0',
  },
} satisfies PersonaManifest

// V1 EC — espelha as jornadas do FigJam V1++ EC:
// - 141:279 Configurando preferências
// - 141:368 Antecipando automaticamente (já existe em V0, evolui em V1)
// - 141:466 Antecipando programadamente (NOVO — programar antecipação por regra)
const v1 = {
  label: 'Estabelecimento Comercial · v1',
  persona: 'estabelecimento',
  version: 'v1',
  modules: ['dashboard', 'cobrancas', 'agenda', 'financeiro', 'configuracoes'],
  submenus: {
    cobrancas:  ['cobrancas', 'links', 'maquininhas'],
    financeiro: ['extrato', 'antecipacoes', 'antecipacao-programada', 'liquidacoes', 'taxas-simulacoes'],
    configuracoes: ['usuarios', 'empresas', 'preferencias'],
  },
  defaultExpanded: 'agenda',
  onboarding: {
    autoAdvance:    true,
    autoSettlement: true,
  },
  badges: { dev: 'EC v1' },
} satisfies PersonaManifest

export const estabelecimento = {
  v0,
  v1,
}
