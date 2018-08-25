'use strict';

const   express = require('express'),
        fs = require('fs'),
        https = require("https"),
        middleware = require('./middleware/middleware'),
        port = process.env.PORT || 3000,
        routes = require('./routes/routes');

let app = express();

// setup middleware
middleware.setupMiddleware(app);

// load routes
routes.loadRoutes(app);

// HTTPS localhost cert
const certOptions = {
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("./server.crt")
};

// open port
https.createServer(certOptions, app).listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
