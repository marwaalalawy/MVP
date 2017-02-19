var express = require('express');

var app = express();

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(process.env.PORT || 8000);

module.exports = app;