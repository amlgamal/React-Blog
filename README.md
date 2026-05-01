# 📝 React Blog

A full-featured blog application built with **React 19**, **Vite**, **Tailwind CSS**, and **DaisyUI** — backed by a lightweight **JSON Server** REST API. Users can register, log in, browse posts, and manage their own content with full CRUD support.

---

## ✨ Features

### 🏠 Home Page
- Responsive navbar with navigation links
- Feed of all blog posts, each displaying:
  - 🖼️ Cover image
  - 📝 Title
  - 📄 Description / Content
  - ✍️ Author name & publish date
- Header link to Login / Register when not authenticated

### 🔐 Auth (Login & Register)
- Register with a username, email, and password
- Log in with existing credentials
- On success, redirects to the Home Page with:
  - The auth link replaced by **"Hi, {username}"**
  - A **floating ➕ button** (bottom-right) to add a new post

### ➕ Add / Edit Post
- Form with fields for **Title**, **Description**, and **Image URL**
- Logged-in users see **Edit** and **Remove** buttons on their own posts
- Edit opens the same form pre-filled with existing data
- Remove deletes the post instantly

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 + DaisyUI v5 |
| Routing | React Router v7 |
| Forms | React Hook Form |
| HTTP Client | Axios |
| Mock Backend | JSON Server |
| Notifications | Sonner |

---

## 🚀 Getting Started

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/amlgamal/React-Blog.git
cd React-Blog

# 2. Install dependencies
npm install
```

### Running the App

You need to run **two terminals** — one for the frontend and one for the mock API.

```bash
# Terminal 1 — Start the JSON Server (mock API on port 3000)
npx json-server db.json --port 3000

# Terminal 2 — Start the Vite dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
React-Blog/
├── public/                   # Static assets
├── src/
│   ├── components/
│   │   ├── InputField.jsx    # Reusable form input component
│   │   ├── Navbar.jsx        # Top navigation bar
│   │   └── PostCard.jsx      # Blog post card UI
│   ├── pages/
│   │   ├── Home.jsx          # Home page — post feed
│   │   ├── LoginAuth.jsx     # Login page
│   │   ├── Register.jsx      # Register page
│   │   └── CreatePost.jsx    # Add / Edit post form
│   ├── utils/
│   │   └── auth.js           # Auth helper functions
│   ├── App.jsx               # Root component & routes
│   └── main.jsx              # App entry point
├── db.json                   # JSON Server database (users & posts)
├── index.html
├── vite.config.js
└── package.json
```

---

## 🗄️ API Reference (JSON Server)

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/posts` | Fetch all posts |
| `POST` | `/posts` | Create a new post |
| `PATCH` | `/posts/:id` | Update a post |
| `DELETE` | `/posts/:id` | Delete a post |
| `GET` | `/users` | Fetch all users |
| `POST` | `/users` | Register a new user |

### Post Schema

```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "image": "string (URL)",
  "author": "string",
  "userId": "string",
  "publishedAt": "ISO date string"
}
```

---

## 📦 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```


---

## 👩‍💻 Author

**Aml Gamal** — [@amlgamal](https://github.com/amlgamal)
