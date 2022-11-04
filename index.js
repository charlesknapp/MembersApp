// define express module and direct to app
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

// init the middleware
// app.use(logger);

// Handlebars middleware
app.engine('handlebars', exphbs.engine({ defaultLayout: "main"}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false} ))

// Homepage route (otherwise a static folder would work)
app.get('/', (req, res) => res.render('index', {
    title: 'Members App',
    members
}));

// method 2: set a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

// define a used port, or check env for server port value
const PORT = process.env.PORT || 5000;

// start intial app listening
app.listen(PORT, () => console.log(`Server started on ${PORT}`));