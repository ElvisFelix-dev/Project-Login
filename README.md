# 🛒 Lembrou?

**Lembrou?** é uma aplicação web desenvolvida para facilitar a organização de listas de compras. Com ela, o usuário pode cadastrar, editar, excluir e visualizar itens de suas listas de forma simples e intuitiva.

---

## 📸 Demonstração

![Lembrou Dashboard Screenshot](./dashboard.png)

---

## 🚀 Tecnologias Utilizadas

### 🖥️ Frontend
- **ReactJS** (Vite)
- **TailwindCSS** – Estilização moderna e responsiva
- **React Router DOM** – Navegação entre páginas
- **React Hook Form + Yup** – Manipulação e validação de formulários
- **Date-fns** – Formatação de datas
- **React Toastify** – Notificações amigáveis
- **EmailJS** – Envio de mensagens no formulário de contato

### ⚙️ Backend
- **Node.js** + **Express**
- **MongoDB** com **Mongoose**
- **JWT** – Autenticação segura
- **BCrypt** – Hash de senhas

---

## 📂 Estrutura de Pastas

```
lembrou/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── service/
│   │   └── App.jsx
```

---

## 🧪 Funcionalidades

- ✅ Cadastro de usuários
- ✅ Login com autenticação JWT
- ✅ Recuperação e redefinição de senha via e-mail
- ✅ CRUD de itens por usuário
- ✅ Dashboard com listas organizadas por data
- ✅ Tema escuro (Dark Mode)
- ✅ Formulário de contato funcional
- ✅ Layout responsivo

---

## 📦 Instalação e Execução

### Backend

```bash
cd backend
npm install
npm run dev
```

> Certifique-se de configurar as variáveis de ambiente no arquivo `.env` com MongoDB URI e chave JWT.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Rotas da API

| Método | Rota                          | Descrição                         |
|--------|-------------------------------|-----------------------------------|
| POST   | `/api/users/register`         | Cadastra novo usuário             |
| POST   | `/api/users/login`            | Login do usuário                  |
| POST   | `/api/users/forgot-password`  | Envia e-mail de recuperação       |
| POST   | `/api/users/reset-password/:token` | Redefine a senha com token  |
| POST   | `/api/items/add`              | Adiciona item à lista             |
| GET    | `/api/items/:userId`          | Busca todos os itens do usuário   |
| PUT    | `/api/items/:id`              | Edita um item                     |
| DELETE | `/api/items/:id`              | Remove um item                    |

---

## ⚙️ Variáveis de Ambiente (.env)

```env
MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/lembrou
JWT_SECRET=suachavesecreta
EMAILJS_USER_ID=seu_user_id
EMAILJS_SERVICE_ID=seu_service_id
EMAILJS_TEMPLATE_ID=seu_template_id
```

---

## 🧑‍💻 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas alterações (`git commit -m 'feat: minha funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## :memo: Licença 

Distribuído sob a licença **MIT**. Veja `LICENSE` para mais informações.

---

## 📬 Contato

Desenvolvido por Elvis Felix 🤍 – [LinkedIn](https://www.linkedin.com/in/elvis-felix)<br/>
Email: elvisfelix_575@hotmail.com <br/>
GitHub: [github.com/ElvisFelix-dev](https://github.com/ElvisFelix-dev)
