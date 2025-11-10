# 📚 BookCycle – Share & Borrow Books Locally

**BookCycle** is a community-driven web app that empowers students to **share, lend, and borrow books** within their colleges or local areas.  
It promotes affordable learning, sustainability, and collaboration among students — aligning perfectly with the WebWave 3.0 theme *“Code for Chhattisgarh (C4CG)”* by enhancing educational accessibility through technology.

---

## 🚀 Features

### 🔐 User Authentication
- Secure login/signup using **Firebase Authentication** (Email & Google Sign-In).
- User details are safely stored using Firebase’s built-in authentication services.

### 📘 Book Management
- Add and manage books you own — including title, author, subject, and condition.
- Edit or remove listings anytime.
- View your added books in the **“My Books”** section.

### 🤝 Book Request & Borrow System
- Students can send **borrow requests** for available books.
- Book owners can **approve/reject** requests.
- Once approved, the book status updates automatically to “Borrowed ✅”.

### 📍 Location-Based Sharing
- Search and borrow books from students **near your college or locality**.
- Filter books based on the area or institution for hyper-local exchange.

### 🕒 Due Date Reminders
- When lending a book, owners can set a **return due date**.
- Users receive friendly reminders when a book’s return date is near.

### 🖼️ Book Cover Recognition (AI Auto-Fill)
- Upload a book’s cover image.
- The system auto-detects and fills details like title and author using an AI Vision API.

### 💬 Real-Time Chat System
- Borrowers and lenders can chat directly within the app.
- Messages are updated live via **Firebase Realtime Database**.
- Enables seamless communication for book pickup and return.

### 🏷️ Book Condition Tracker
- Add a condition label when listing a book:
  - 🟢 New  
  - 🟡 Good  
  - 🔴 Used  
- Promotes transparency and trust among users.

### 🔍 Smart Search & Filters
- Search books by name, subject, or author.
- Filter by **college**, **availability**, **condition**, or **category**.

### 📊 Activity Dashboard
- Visual dashboard showing:
  - Books added
  - Books borrowed/lent
  - Pending requests
  - Reputation points
- Encourages active participation through a gamified experience.

---

## ⚙️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | React.js, Tailwind CSS |
| Backend | Firebase (Auth, Realtime Database, Storage) |
| AI Integration | Google Vision / OpenAI API |
| Hosting | Firebase Hosting |
| Authentication | Email/Password, Google Sign-In using Firebase |
| Database | Firebase Realtime Database |
| Storage | Firebase Cloud Storage |

---

## 🧩 Folder Structure

src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── BookCard.jsx        
│   ├── RequestCard.jsx      
│   ├── ChatBox.jsx          
│   ├── FilterBar.jsx        
│   └── DashboardStats.jsx   
│
├── pages/
│   ├── Home.jsx
│   ├── AddBook.jsx
│   ├── MyBooks.jsx
│   ├── Authentication.jsx
│   ├── Requests.jsx         
│   ├── Chat.jsx             
│   ├── Dashboard.jsx        
│   └── BookDetails.jsx      
│
├── hooks/
│   ├── useAuthListener.js   
│
└── firebase.js
---

## 🧠 Impact & Relevance

- Promotes **resource sharing** and **cost savings** among students.
- Encourages a **sustainable learning culture** by reducing waste.
- Connects students within local communities for collaborative growth.
- Directly aligns with **Code for Chhattisgarh** — addressing student accessibility and educational resource sharing.

---

## 🧑‍💻 Team

**Project Name:** BookCycle  
**Hackathon:** WebWave 3.0 (OpenLake IIT Bhilai)  
**Theme:** *Code for Chhattisgarh – Empowering Students through Technology*  
**Team Members:**  
- Gurrala Hansika  
- V.G.N. Harshitha  


---

## 🏁 Conclusion

BookCycle creates a collaborative, student-first environment where sharing knowledge becomes as simple as sharing a book. It combines modern web technologies with real-world student needs — building a platform that’s **sustainable, accessible, and impactful**.

> “Knowledge grows when shared — and so do communities.”

---
