const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/user.js")
const Artwork = require("./models/artwork.js")
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '10mb'}));
app.use(express.static('public'));

let isUserLoggedIn = false;

// connect to mongodb
const dbURI = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@cluster0.z38rq.mongodb.net/login?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        console.log('connection error: ' + error);
    } else {
        console.log('connected to db');
        app.listen(process.env.PORT || 2000, () => console.log('listening...'))
    }
});

// app.post('/register', async (request, response) => {
//     console.log('/register request = ' + request.body.emailInput + ', ' + request.body.passwordInput)
//     try {
//         const hashedPassword = await bcrypt.hash(request.body.passwordInput, 8);
//         let newUser = new User({
//             email: request.body.emailInput,
//             password: hashedPassword
//         });
//         await newUser.save();
//         response.status(201).send('Successful registration');
//     } catch {
//         response.status(400).send('Failed to register');
//     }
// });

app.post('/login', async (request, response) => {
    User.findOne({ email: request.body.emailInput }, async (error, user) => {
        if (error) {
            response.status(400).send('Failed to find user');
            return;
        }
        try {
            const success = await bcrypt.compare(request.body.passwordInput, user.password);
            if (success) {
                isUserLoggedIn = true;
                response.status(202).send('Successful login');
            } else {
                response.status(401).send('Failed to login');
            }
        } catch {
            response.status(500).send('Failed to process credentials');
        }
    });
});

app.post('/upload', async (request, response) => {
    if (!isUserLoggedIn) {
        response.status(401).end('Failed: Unlogged user is not authorized to save artwork');
        return;
    }
    try {
        let newArtwork = new Artwork({
            title: request.body.title,
            category: request.body.category,
            date: request.body.date,
            imageURL: request.body.imageURL
        });
        await newArtwork.save();
        response.status(200).send('Successful upload');
    } catch {
        response.status(400).send('Failed to save artwork');
    }
});

app.get('/artworks', async (request, response) => {
    Artwork.find({}, (error, artworks) => {
        if (error) {
            response.status(400).send('Failed to find artwork');
            return;
        }
        response.json(artworks);
    });
});