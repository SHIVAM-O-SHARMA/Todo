# 📝 Todo App

A full-stack Todo application built using:

- **Frontend**: Vite + React + Tailwind CSS
- **Backend**: Node.js + Express.js + MongoDB

## 🔧 Features

- Add new todos
- View all todos
- Mark todos as completed
- Delete todos

## 🛠️ Tech Stack

### Frontend
- Vite
- React
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose

## 🚀 Getting Started

### Frontend Setup

1. Go to the `todo` directory:
   ```bash
   cd todo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Go to the `todo-backend` directory:
   ```bash
   cd todo-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add your MongoDB connection string:
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the backend server:
   ```bash
   node index.js
   ```

## 📦 API Endpoints

| Method | Endpoint        | Description           |
|--------|------------------|-----------------------|
| GET    | `/todos`         | Fetch all todos       |
| POST   | `/todos`         | Create a new todo     |
| PUT    | `/todos/:id`     | Mark todo as complete |
| DELETE | `/todos/:id`     | Delete a todo         |

---

Built with ❤️ by Shivam Sharma.
