# Sketchbook
## Description

A digital sketchbook to host my attempts at learning to draw figures, portraits, and little doodles here and there as a break from my studies.

All images and data are stored in a MongoDB database and retreived using a NodeJS/Express API on the server-side. I implemented encrypted login authentication using the bcrypt library and stored login details in a MongoDB database as well.

## Link to website

**Note:** I'm using free hosting and database services so things may take quite a while to load-up. MongoDB deactivates a database if no request is made for 7 days. In this case it will take a while for the website to load. If you just want to see what the site looks like, click on the second link which will load-up the front-end as it does not use Node.js or MongoDB.

https://digital-sketchbook.glitch.me/ -- may take a couple minutes to load up, but has full user-authentication and database functionality (because I'm using free services)

https://karandahiya.github.io/sketchbook/ -- quick load-up, but has only front-end functionality to show existing artwork

## Technologies
**Front-end**
- Bootstrap
- JavaScript ES6
- HTML/CSS

**Back-end**
- NodeJS
- Express
- MongoDB (Mongoose)

## Screenshot

<img width="1276" alt="sketchbook" src="https://user-images.githubusercontent.com/41240707/127676753-219137f9-fc15-4d5b-a2c1-2d0f3b35c884.png">
