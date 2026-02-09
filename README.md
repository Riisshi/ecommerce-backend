# 🛒 E-Commerce Backend Application

A production-ready e-commerce backend built using **Node.js, Express, MongoDB (Atlas), and Stripe**, demonstrating advanced database optimization, transactions, aggregations, file uploads, and secure payment processing.

This project showcases real-world backend engineering practices including indexing strategies, performance analysis using `explain()`, and asynchronous webhook handling.

---

## 📐 System Architecture

### Tech Stack
- Backend: Node.js, Express  
- Database: MongoDB Atlas  
- ODM: Mongoose  
- Payments: Stripe  
- Media Storage: Cloudinary  
- Authentication: JWT  

### High-Level Flow
1. Users register and authenticate  
2. Products are created with images uploaded to Cloudinary  
3. Orders are placed using MongoDB transactions  
4. Payments are processed via Stripe Payment Intents  
5. Stripe webhooks asynchronously update payment and order status  
6. Aggregation pipelines provide analytics and insights  

---

## 🗂️ Database Design (Collections)

### Core Collections
- **Users** – authentication and customer data  
- **Products** – product catalog with text search  
- **Orders** – order records with inventory linkage  
- **Payments** – Stripe payment tracking  
- **Reviews** – user feedback on products  

Collections are related using MongoDB ObjectId references to ensure data consistency and scalability.

---

## 🚀 Indexing & Performance Optimization

### 1. Compound Index (ESR Rule)
```js
db.orders.createIndex({ user: 1, createdAt: -1 })

2. Text Search Index
db.products.createIndex({ name: "text", description: "text" })


Purpose: Full-text product search
Result: TEXT_MATCH / IXSCAN

3. Unique Index
db.users.createIndex({ email: 1 }, { unique: true })


Purpose: Prevent duplicate user accounts

4. Domain-Specific Index
db.products.createIndex({ category: 1, price: 1 })


Purpose: Efficient category and price filtering

5. Status-Based Index
db.orders.createIndex({ status: 1, paymentStatus: 1 })


Purpose: Query orders by fulfillment and payment state

Screenshots of explain("executionStats") proving index usage are included.

📊 Aggregation Pipelines
1. Monthly Sales Analytics

Calculates total revenue per month

Counts total orders per month

Uses: $match, $group, $month, $year

2. Top-Selling Products

Identifies best-selling products

Calculates revenue per product

Uses: $unwind, $group, $sort, $limit

3. Customer Insights

Calculates total spending per customer

Computes average order value

Counts total orders per user

Uses: $group, $avg, $sum

Sample aggregation outputs are documented.

🔁 Transactions

A multi-document MongoDB transaction is used during order placement:

Create the order

Reduce product inventory

Commit changes atomically

If any step fails, the transaction is rolled back to maintain data integrity.

🖼️ File Uploads

Product images are uploaded using Multer

Images are stored in Cloudinary

Secure Cloudinary URLs are saved in the database

💳 Payment Processing (Stripe)
Payment Flow

Create Stripe Payment Intent

Store payment metadata in the database

Client confirms payment

Stripe webhook updates payment and order status

Webhook Handling

Stripe signature verification enabled

Handles payment_intent.succeeded events

Updates payment and order status asynchronously

This ensures reliable payment confirmation even during network failures.

🔍 Pagination & Search
Cursor-Based Pagination

Implemented using _id as cursor

Avoids skip/limit for better performance

Text Search

MongoDB $text search on products

Supports keyword-based queries

🌍 Deployment

Backend deployed on Render / Railway / Vercel

Database hosted on MongoDB Atlas

Environment variables managed securely using .env

📡 API Endpoints (Sample)
Product Search
GET /api/products/search?q=phone

Place Order
POST /api/orders

Create Payment Intent
POST /api/payments/create-intent

Sales Analytics
GET /api/analytics/sales

⚙️ Setup Instructions
git clone <your-repo-url>
cd ecommerce-backend
npm install
npm run dev


Create a .env file:

MONGO_URI=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=

✅ Features Implemented

5+ MongoDB collections

5 optimized indexes with explain() proof

3 aggregation pipelines

MongoDB transactions

Cloudinary file uploads

Stripe payments and webhook handling

Cursor-based pagination

Text search

MongoDB Atlas deployment

Production-ready backend architecture

🔗 Submission Links

GitHub Repository:
https://github.com/Riisshi/ecommerce-backend

Deployed Application:
https://ecommerce-backend-vw2y.onrender.com/

<img width="1680" height="1002" alt="indexing-mongodb" src="https://github.com/user-attachments/assets/f79281e1-7c23-47bb-b48c-e35e4fdb7e90" />


