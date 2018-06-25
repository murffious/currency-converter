const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/dev');
var cors = require('cors');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);


app.use(cors())
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
require('./routes/authRoutes')(app);
require('./routes/moneyRoutes')(app);

const PORT = process.env.PORT || 5000
app.listen(PORT, function(){
    console.log("Running on port:", PORT)
});
