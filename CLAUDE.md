@AGENTS.md

# CLAUDE.md

## Projeto
App React Native/Expo chamado Cubs Stats.

## Objetivo
Listar estatísticas individuais dos jogadores do Chicago Cubs e estatísticas gerais do time.

## Stack
- React Native
- Expo
- TypeScript
- Zustand
- TanStack React Query
- Axios

## Regras
- Usar TypeScript com tipagem forte.
- Evitar any.
- Separar services, hooks, screens, components e types.
- Não criar lógica pesada direto nas telas.
- Sempre explicar o plano antes de alterar arquivos.
- Rodar npm run lint ou npm run typecheck quando existir.
- Fazer commits pequenos e descritivos.

## Estrutura desejada
src/
  components/
  screens/
  services/
  hooks/
  stores/
  types/
  mocks/

## Configuração local da Sports API
- O app usa `EXPO_PUBLIC_API_URL` como base URL da Sports API (ver `src/services/api.ts`).
- Para desenvolvimento local, copie `.env.example` para `.env` e preencha `EXPO_PUBLIC_API_URL`.
- O valor precisa apontar para uma URL da Sports API acessível pelo dispositivo/emulador que está executando o app.
- Em device físico, `localhost` do computador não representa o computador para o celular — normalmente deve-se usar o IP acessível pela rede local.
- `.env` não deve ser commitado (já está no `.gitignore`).
- `.env.example` é o template versionado.