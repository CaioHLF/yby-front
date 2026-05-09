'use client'
// Router de Sidebar por persona ativa.
//
// - subadquirente → Sidebar legado (intacto, NÃO migrado fisicamente)
// - estabelecimento → EcSidebar (pluggável, lê manifest EC)
// - adquirente → AqSidebar (stub mínimo)
//
// Decisão arquitetural: o Sub-adquirente continua com sua Sidebar legada
// porque o sistema dele usa um state machine via useNavStore (Screen/AgendaTab).
// Migrar isso pra rotas Next reais é trabalho posterior — fora do escopo
// "fechar EC v0". Anotado como dívida técnica.

import { Suspense } from 'react'
import Sidebar from './Sidebar'
import EcSidebar from './EcSidebar'
import SubV1Sidebar from './SubV1Sidebar'
import { usePersonaStore } from '@/stores/personaStore'

export default function SidebarRouter() {
  const persona = usePersonaStore((s) => s.persona)
  const version = usePersonaStore((s) => s.version)
  if (persona === 'estabelecimento')                   return <EcSidebar />
  if (persona === 'subadquirente' && version === 'v1') return <Suspense><SubV1Sidebar /></Suspense>
  return <Sidebar />  // SUB v0 = legacy (state machine via useNavStore)
}
