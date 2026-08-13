# 📝 Task Tracker Application

A full-stack task management application built using **React**, **Material-UI (MUI)**, **Node.js**, **Express**, and **MySQL**. This application allows users to create, read, update, delete, and filter daily task deliverables efficiently.

---

## 🌟 Key Features

- **Full CRUD Operations**:
  - **Create**: Add new tasks with a title and optional description.
  - **Read**: View all created tasks sorted by creation date.
  - **Update**: Edit existing task details or toggle completion status using checkboxes.
  - **Delete**: Permanently remove tasks from the database.
- **Status Filtering**: Instantly filter tasks by status (**All**, **Pending**, **Completed**).
- **Responsive UI/UX**: Designed using Material-UI (MUI) components for a clean, intuitive layout.
- **RESTful API**: Clean backend architecture using Node.js, Express, and a raw SQL query layer via `mysql2`.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React.js (Vite)
- **UI Library**: Material-UI (MUI)
- **HTTP Client**: Native `fetch` API

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Driver**: `mysql2` (Connection Pooling)
- **Environment Management**: `dotenv`

---

## 📁 Project Structure

```text
TaskTracer/
├── backend/
│   ├── config/
│   │   └── pool.js          # MySQL connection pool configuration
│   ├── controllers/
│   │   └── taskController.js # Request handler logic
│   ├── models/
│   │   └── taskModel.js      # Raw SQL queries & database operations
│   ├── routes/
│   │   └── taskRoutes.js     # Express API route endpoints
│   ├── .env                  # Database and server environment variables
│   ├── package.json
│   └── server.js             # Express app entry point
│
└── frontend/
    ├── src/
    │   ├── assets/           # Global styles and assets
    │   ├── components/       # TaskForm, TaskItem, TaskList
    │   ├── pages/            # TaskPage view
    │   ├── services/         # API integration layer (taskService.js)
    │   ├── utils/            # Helper functions (formatDate.js)
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js