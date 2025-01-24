const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    Product_name: { type: String, required: true },
    Quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    description: { type: String, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    image: { type: String, required: true }, //URl of the image 
});
productSchema.virtual('dis_price').get(function () {
    return this.price - (this.price * this.discount) / 100;
});
module.exports = mongoose.model('products', productSchema);
