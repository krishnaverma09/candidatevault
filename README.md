# Candidate Vault – Next.js Mini Application

Candidate Vault is a **simple Candidate Management application** built with **Next.js**.  
It demonstrates **basic CRUD functionality**, clean UI handling, reusable components, and form validation, as required in the technical task.

---

## 📌 Features

- List candidates (Name, Email, Role)
- Add a new candidate using a form
- Edit an existing candidate
- Delete a candidate
- Form validation for required fields
- Data persistence using browser `localStorage`
- Clean folder structure and reusable components

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **React**
- **JavaScript**
- **Plain CSS**
- **localStorage** (no backend, no database)

---

## 📁 Project Structure

candidate-vault/
├─ app/
│ ├─ layout.js
│ ├─ page.js // List candidates
│ ├─ add/
│ │ └─ page.js // Add/Edit candidate
│ ├─ globals.css
│
├─ components/
│ ├─ Header.js
│ ├─ CandidateForm.js
│
├─ lib/
│ └─ storage.js // localStorage helpers
│
├─ styles/
│ ├─ header.css
│ ├─ form.css
│ ├─ card.css
│
├─ package.json
├─ README.md



---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or v20 recommended)
- **npm**

---

### Installation

```
git clone https://github.com/<your-username>/candidate-vault.git
cd candidate-vault
npm install
```

```
Run the Application: npm run dev
```

```
Open your browser and visit: http://localhost:3000
```
