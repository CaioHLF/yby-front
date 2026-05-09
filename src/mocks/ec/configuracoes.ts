// Mocks de Configurações do Estabelecimento Comercial — V0.

export type UsuarioPapel = 'Admin' | 'Operador' | 'Financeiro' | 'Visualizador'
export type UsuarioStatus = 'Ativo' | 'Inativo'

export interface Usuario {
  id: string
  nome: string
  email: string
  papel: UsuarioPapel
  status: UsuarioStatus
  ultimoAcesso: string
}

export const ecUsuarios: Usuario[] = [
  { id: 'U-001', nome: 'Bruno Girardi',  email: 'bruno@yby.com.br',     papel: 'Admin',         status: 'Ativo',   ultimoAcesso: '08/05/2026 09:42' },
  { id: 'U-002', nome: 'Ana Souza',      email: 'ana.souza@loja.com',    papel: 'Operador',      status: 'Ativo',   ultimoAcesso: '07/05/2026 18:20' },
  { id: 'U-003', nome: 'Carlos Ferreira',email: 'carlos@loja.com',       papel: 'Financeiro',    status: 'Ativo',   ultimoAcesso: '06/05/2026 11:05' },
  { id: 'U-004', nome: 'Daniela Lima',   email: 'dani.lima@loja.com',    papel: 'Visualizador',  status: 'Inativo', ultimoAcesso: '15/04/2026 14:31' },
  { id: 'U-005', nome: 'Eduardo Pereira',email: 'eduardo@loja.com',      papel: 'Operador',      status: 'Ativo',   ultimoAcesso: '08/05/2026 08:11' },
]

export interface Empresa {
  id: string
  razaoSocial: string
  nomeFantasia: string
  cnpj: string
  status: 'Ativa' | 'Inativa'
  vinculo: 'Matriz' | 'Filial'
}

export const ecEmpresas: Empresa[] = [
  { id: 'E-001', razaoSocial: 'Loja do Bruno LTDA',     nomeFantasia: 'Loja do Bruno',    cnpj: '12.345.678/0001-90', status: 'Ativa',   vinculo: 'Matriz' },
  { id: 'E-002', razaoSocial: 'Loja do Bruno LTDA',     nomeFantasia: 'Filial Centro',    cnpj: '12.345.678/0002-71', status: 'Ativa',   vinculo: 'Filial' },
  { id: 'E-003', razaoSocial: 'Calçados Bruno Ltda EPP',nomeFantasia: 'Calçados Bruno',   cnpj: '98.765.432/0001-10', status: 'Inativa', vinculo: 'Matriz' },
]
