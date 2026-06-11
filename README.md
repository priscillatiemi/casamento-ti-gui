# Site de casamento - React + Vite + Firebase

Site mobile-first para casamento com:

- Página inicial responsiva
- Contador regressivo
- RSVP com controle de convidados
- Busca por nome no Firebase
- Acompanhantes travados pela base
- Lista de presentes simbólicos com PIX
- Painel admin simples
- Cadastro de convidados
- Exportação CSV

## Como rodar no VS Code

1. Instale Node.js.
2. Abra a pasta no VS Code.
3. No terminal, rode:

```bash
npm install
npm run dev
```

O Vite vai abrir um link local, geralmente:

```bash
http://localhost:5173
```

## Como configurar o Firebase

1. Acesse o Firebase Console.
2. Crie um projeto.
3. Crie um app Web.
4. Ative Firestore Database.
5. Copie as chaves do Firebase.
6. Crie um arquivo `.env` baseado no `.env.example`.

Exemplo:

```bash
VITE_FIREBASE_API_KEY=sua_chave
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_id
VITE_FIREBASE_APP_ID=seu_app_id
```

## Regras simples do Firestore para teste

Use apenas durante desenvolvimento:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Antes de divulgar o site, o ideal é ajustar segurança, principalmente para o painel admin.

## Coleções usadas

### convidados

```js
{
  nome: "Maria Silva",
  nomeBusca: "maria silva",
  grupo: "Família da noiva",
  confirmado: false,
  observacao: "",
  acompanhantes: [
    { nome: "João Silva", confirmado: false },
    { nome: "Ana Silva", confirmado: false }
  ]
}
```

### presentes

```js
{
  presente: "Ramen em Tóquio",
  valor: 100,
  nome: "Nome de quem presenteou",
  mensagem: "Mensagem opcional"
}
```

## Onde trocar sua chave PIX

Abra:

```txt
src/components/Gifts.jsx
```

Troque:

```js
const PIX_KEY = 'COLOQUE_SUA_CHAVE_PIX_AQUI';
```

## Onde trocar a senha do admin

Abra:

```txt
src/pages/Admin.jsx
```

Troque:

```js
const ADMIN_PASSWORD = 'troque-esta-senha';
```

## Como acessar o admin

Abra o site e clique em `Admin`, ou acesse:

```txt
/#admin
```

## Como publicar

Opções fáceis:

- Vercel
- Netlify
- GitHub Pages

Para Vercel, basta subir o projeto no GitHub e importar na Vercel.
