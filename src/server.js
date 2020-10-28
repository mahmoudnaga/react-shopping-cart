const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const Product = mongoose.model("product", new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String]
}));

app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savesProduct = await newProduct.save();
    res.send(savesProduct);
});

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findOneAndDelete(req.params.id);
    res.send(deletedProduct);
});

const Order = mongoose.model("order", new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    email: String,
    name: String,
    address: String,
    total: Number,
    cartItems: [{
        _id: String,
        title: String,
        price: Number,
        count: Number
    }]
},
    {
        timestamps: true
    }));

app.post("/api/orders", async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.address || !req.body.total || !req.body.cartItems) {
        res.send({ message: "Data Is Required." });
    }
    const order = new Order(req.body);
    const newOrder = await order.save();
    res.send(newOrder);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server is running at http://localhost:5000");
});
