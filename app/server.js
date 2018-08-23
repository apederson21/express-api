'use strict';

const   express = require('express'),
        middleware = require('./middleware/middleware'),
        port = process.env.PORT || 3000,
        routes = require('./routes/routes');

let app = express();

// setup middleware
middleware.setupMiddleware(app);

// load routes
routes.loadRoutes(app);

// open port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
