const mongoose = require('mongoose');
require('dotenv').config(); 
// const product = require('../models/productSchema')
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      ssl:true,
    });
  //   const sampleData = [
  //     {
  //         Product_name: "Apple",
  //         Quantity: 100,
  //         price: 150,
  //         discount: 10,
  //         description: "Fresh apples imported from New Zealand.",
  //         category: "Fruits",
  //         inStock: true,
  //         image: "https://example.com/images/apple.jpg"
  //     },
  //     {
  //         Product_name: "Banana",
  //         Quantity: 200,
  //         price: 50,
  //         discount: 5,
  //         description: "Organic bananas sourced locally.",
  //         category: "Fruits",
  //         inStock: true,
  //         image: "https://example.com/images/banana.jpg"
  //     },
  //     {
  //         Product_name: "Carrot",
  //         Quantity: 150,
  //         price: 30,
  //         discount: 0,
  //         description: "Crunchy and sweet carrots.",
  //         category: "Vegetables",
  //         inStock: true,
  //         image: "https://example.com/images/carrot.jpg"
  //     },
  //     {
  //         Product_name: "Potato",
  //         Quantity: 300,
  //         price: 20,
  //         discount: 0,
  //         description: "High-quality potatoes.",
  //         category: "Vegetables",
  //         inStock: true,
  //         image: "https://example.com/images/potato.jpg"
  //     },
  //     {
  //         Product_name: "Milk",
  //         Quantity: 50,
  //         price: 60,
  //         discount: 15,
  //         description: "Full cream milk with high nutritional value.",
  //         category: "Dairy",
  //         inStock: true,
  //         image: "https://example.com/images/milk.jpg"
  //     },
  //     {
  //         Product_name: "Cheese",
  //         Quantity: 30,
  //         price: 200,
  //         discount: 10,
  //         description: "Delicious cheddar cheese.",
  //         category: "Dairy",
  //         inStock: true,
  //         image: "https://example.com/images/cheese.jpg"
  //     }
  // ];

  // await product.insertMany(sampleData);
  // console.log('Sample data inserted.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

module.exports = connectToDatabase;
