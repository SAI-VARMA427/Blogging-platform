const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory storage for blog posts
let posts = [
    {
        id: 1,
        title: "Welcome to My Blog",
        content: "This is the first post on the platform!",
        author: "Admin",
    },
    {
        id: 2,
        title: "Welcome to My Blog Second time",
        content: "This is the Second post on the platform!",
        author: "Admin",
    }
];

// Routes

// Get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Create a new post
app.post('/api/posts', (req, res) => {
    const { title, content, author } = req.body;

    // Basic validation
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required." });
    }

    const newPost = {
        id: posts.length + 1,
        title,
        content,
        author: author || "Anonymous",
    };

    posts.push(newPost);
    res.status(201).json(newPost);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
