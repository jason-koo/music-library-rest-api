const express = require('express');
const app = express();

// import admin route
const adminRoutes = require('./api/routes/admin');
// import secure route
const secureRoutes = require('./api/routes/secure');
// import open route
const openRoutes = require('./api/routes/open');

app.use('/api/admin', adminRoutes);
app.use('/api/secure', secureRoutes);
app.use('/api/open', openRoutes);


module.exports = app;