# 🛍 Stock Management System  

## 📖 Overview  
The *Stock Management System* is a user-friendly application developed using the *MERN stack* (MongoDB, Express.js, React, Node.js). This project helps local shopkeepers efficiently manage their stock, track inventory, and generate accurate bills. By addressing common inventory challenges, it minimizes manual errors and streamlines business operations.  

## ✨ Features  
- *View Stocks*: Display a list of all available products with detailed information.  
- *Add Stocks*: Add new products to the inventory with attributes like name, category, price, and stock count.  
- *Create Bills*: Generate accurate and detailed customer bills.  
- *View Bills*: Access past bills with customer and product breakdown details.  

## 🛠 Tech Stack  
- *Frontend*: React.js, styled with Chakra UI.  
- *Backend*: Node.js and Express.js for building APIs.  
- *Database*: MongoDB for managing inventory and billing data.  

## 🚀 How It Works  
The frontend communicates with the backend through RESTful APIs using HTTP requests. Here's how each operation works:  

| *Operation*     | *Frontend Action*             | *Backend API Endpoint*         | *MongoDB Operation*         |  
|--------------------|----------------------------------|-----------------------------------|--------------------------------|  
| *View Stocks*    | Fetch stock data                | GET /api/stocks                | Product.find()               |  
| *Add Stock*      | Send new stock details          | POST /api/add-product          | Product.save()               |  
| *Create Bill*    | Send billing details            | POST /api/bills                | Bill.save(), Product.updateMany() |  
| *View Bills*     | Fetch bill summary or details   | GET /api/get-bills or /api/specific-bill/:id | Bill.find(), Bill.findById() |  

### System Design  

#### *Architecture*  
- *Frontend*: Handles user interaction and presents inventory and billing data.  
- *Backend*: Processes API requests, manages business logic, and communicates with the database.  
- *Database*: Stores product and billing records.  

#### *Component Overview*  
- *Landing Page*: Entry point with navigation to key system features.  
- *Stock Page*: Displays inventory details and allows stock management.  
- *Bill Page*: Facilitates bill generation and provides access to previous bills.  

## 📂 Project Setup  

### Prerequisites  
- *Node.js* (v14 or higher)  
- *MongoDB Atlas* or a locally installed *MongoDB instance*.  
- *npm* (Node Package Manager)  

### Steps to Set Up and Run  

#### Clone the Repository and Install Dependencies  
```bash
git clone https://github.com/bharti2005/STOCK-MANAGEMENT.git  

# Backend Setup  
cd backend  
npm install  
npm start  

# Frontend Setup  
cd frontend  
npm install  
npm start
