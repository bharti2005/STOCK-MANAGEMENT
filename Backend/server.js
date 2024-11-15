const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const Product = require("./model/productModel");
const Bill = require("./model/billModel");
const app = express();
const PORT = 5000;

//adding cors policy
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, PATCH",
  credentials: true
}
app.use(cors(corsOptions))
// Sample route
app.get("/", (req, res) => res.send("Hello, World!"));
app.use(express.json()); // Middleware to parse JSON request body

// Add Product API
app.post("/api/add-product", async (req, res) => {
    try {
    const { name, price, category, stock, description } = req.body;

    const newProduct = new Product({
      name,
      price,
      category,
      stock,
      description,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add product", details: error.message });
  }
});
app.post("/api/bills", async (req, res) => {
  try {
    const { customerName, products, totalAmount } = req.body;

    // Check stock for each product and update stock quantity
    for (const product of products) {
      const dbProduct = await Product.findById(product.productId);
      if (!dbProduct) {
        return res
          .status(404)
          .json({
            message: `Product with ID ${product.productId} does not exist.`,
          });
      }

      if (dbProduct.stock < product.quantity) {
        return res
          .status(400)
          .json({
            message: `Insufficient stock for product ${dbProduct.name}. Available: ${dbProduct.stock}`,
          });
      }

      // Deduct the quantity from stock
      dbProduct.stock -= product.quantity;
      await dbProduct.save();
    }

    // Create a new bill
    const bill = new Bill({
      customerName,
      products,
      totalAmount,
    });

    // Save bill to the database
    await bill.save();

    res.status(201).json({ message: "Bill created successfully!", bill });
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({ message: "Error creating bill", error });
  }
});

app.get("/api/stocks", async (req,res)=>{
  try {
    const products = await Product.find();
    res.status(200).send(products);
} catch (err) {
    res.status(500).send({message:err}) 
}
})
app.get("/api/get-bills", async (req,res)=>{
  try{
    const bills = await Bill.find({},{ customerName:1, billDate:1, _id:1} );
    res.status(200).send(bills);
  }catch(err){
    res.status(500).send({message: err})
  }
})

app.get("/api/get-bills-length", async (req,res)=>{
    try{
      const bills = await Bill.find();
      const length = bills.length;
      res.status(200).send(JSON.stringify(length));
    }catch(err){
      res.status(500).send({message: err})
    }
})

app.get("/api/stocks-length", async (req,res)=>{
  try {
    const products = await Product.find();
    const length = products.length;
    res.status(200).send(JSON.stringify(length));
} catch (err) {
    res.status(500).send({message:err}) 
}
})
app.get("/api/specific-bill/:id", async (req,res)=>{
  try{
    const objectId = req.params.id;
    const myObject = await Bill.findById(objectId).populate('products.productId', 'name price description');

    res.json(myObject);
  }catch(err){
    res.status(500).json({"error" : err})
  }
})

app.get("/api/productMapData", async (req,res)=>{
  try {
    const products = await Product.find({},{name:1, _id:1});
    res.status(200).send(products);
} catch (err) {
    res.status(500).send({message:err}) 
}
})

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://krishnaom11:dI9l3o4DMEHuaEkB@cluster0.lykrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
