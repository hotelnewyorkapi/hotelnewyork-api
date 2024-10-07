// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://hotelnewyorkapi:FhhaZhLwKOjZo4sO@hny-data.uszb9.mongodb.net/?retryWrites=true&w=majority&appName=hny-data', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Define a simple model
const DiscordRobloxUserData = mongoose.model('DiscordRobloxUserData', new mongoose.Schema({
    robloxId: String,
    discordId: String,
}));

// Routes
app.get('/shift/users', async (req, res) => {
    const items = await DiscordRobloxUserData.find();
    res.json(items);
});

app.post('/shift/users/adduser', async (req, res) => {
    const newItem = new DiscordRobloxUserData(req.body);
    await newItem.save();
    res.status(201).json(newItem);
});

app.delete('/shift/users/:id', async (req, res) => {
    const itemUserName = req.params.id;

    try {
        const deletedItem = await DiscordRobloxUserData.deleteOne({ robloxId: itemUserName});
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully", deletedItem });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
