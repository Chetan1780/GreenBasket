const Product = require('../models/productSchema')
const user = require('../models/UserAuth');
const category = async (req, res) => {
    try {
        const { category } = req.params;
        console.log(category);
        const products = await Product.find({ category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products by category' });
    }
}
const search = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'Product name is required for search' });
        }
        const products = await Product.find({ Product_name: new RegExp(name, 'i') });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search for products' });
    }
}
const filter = async (req, res) => {
    try {
        const { minPrice, maxPrice, minQuantity, maxQuantity } = req.query;

        const filter = {};
        if (minPrice) filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
        if (maxPrice) filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };
        if (minQuantity) filter.Quantity = { ...filter.Quantity, $gte: parseInt(minQuantity, 10) };
        if (maxQuantity) filter.Quantity = { ...filter.Quantity, $lte: parseInt(maxQuantity, 10) };

        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to filter products' });
    }
}
module.exports={
    category,
    search,
    filter
}