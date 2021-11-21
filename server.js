/**
 * Module dependencies are added.
 */
const path = require('path');
const express = require('express');
const ROOT_DIR = path.resolve(__dirname, 'dist/frontend');
const PORT = process.env.PORT || 8080;

/**
 * Initiate an express application.
 */
const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        res.status(200);
        res.end();
    } else {
        next();
    }
});
app.use(express.static(ROOT_DIR));

/**
 * Configure Routes.
 */
app.get(['/', '/partner*', '/loan*'], (req, res) => res.sendFile('index.html', { root: ROOT_DIR }));

/**
 * Handle errors by adding it as a middleware.
 */
app.use((err, req, res, next) => {
    res.status(err.status || 500).send('Some Error has occured');
});

/**
 * Start the application by listening to specified port.
 */
app.listen(PORT, () => console.log('Server running at port: ' + PORT));