# BookCycle 📚

*BookCycle* is a full-stack web platform for students to share, lend, and discover used textbooks within their local community, promoting sustainability and making education more accessible.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](bookcycle-three.vercel.app/)

---

![BookCycle Homepage Screenshot](c:\Users\gurra\OneDrive\Pictures\Screenshots\Screenshot 2025-11-11 052331.png)

## The Problem

Many students buy expensive textbooks that are used for only one semester. Meanwhile, other students struggle to find affordable or available copies. This leads to:

-   💸 *Unnecessary Spending:* Students spend a significant amount of money on books with a short lifespan.
-   📚 *Wastage of Resources:* Perfectly good books gather dust on shelves or are thrown away.
-   📉 *Reduced Access:* High costs can limit students' access to essential learning materials.

## The Solution

BookCycle provides a centralized platform for students to:

-   *List* their used textbooks for lending or giving away.
-   *Search* for available books by title, subject, or college.
-   *Find* books nearby based on their current location.
-   *Request* to borrow books from other users.
-   *Chat* directly with lenders to coordinate a handoff.

It promotes a community of sharing among students while supporting sustainability and making education more accessible.

## ✨ Core Features

| Feature                                | Description                                                                                                                                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🔐 *Secure User Authentication*      | Seamless sign-up/login with Email & Password or Google OAuth. User sessions are securely managed by Supabase Auth.                                                                                   |
| 📖 *Comprehensive Book Management*   | Users can perform full CRUD operations: list new books with images, details, and condition; view all listings; and manage their own books on a dedicated "My Books" page.                               |
| 📍 *Smart Location-Based Discovery* | Integrates the OpenCage Geocoding API to convert user-entered locations into coordinates. A "Find Near Me" feature allows users to sort books by proximity, with distances displayed on each card.          |
| 🤝 *Formal Request & Lending System* | A structured workflow for borrowing books. Users can send requests, which lenders can then *Accept* (setting a due date), *Decline, or mark as **Returned*.                                       |
| 📊 *Personalized User Dashboard*     | Provides users with an at-a-glance summary of their activity, including books listed, items borrowed, pending requests, completed swaps, and due date reminders.                                        |
| 💬 *Real-time Chat*                  | Facilitates easy communication between borrowers and lenders to coordinate handoffs. Built with Supabase Realtime Subscriptions for instant messaging.                                                 |
| 📱 *Responsive & Modern UI*          | A clean, mobile-first interface built with TailwindCSS ensures a seamless experience on any device, from phones to desktops.                                                                          |

## 🛠 Tech Stack

| Category          | Technology / Service                                       |
| ----------------- | ---------------------------------------------------------- |
| *Frontend*      | React.js, Vite, React Router, TailwindCSS                  |
| *Backend (BaaS)| **Supabase* (PostgreSQL Database, Auth, Storage, Realtime)  |
| *APIs & Services* | *OpenCage Geocoding API* (for location-to-coordinate conversion) |
| *Deployment*    | Vercel                                                     |
