const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')
const classesRoutes = require('./routes/classes')
const goalsRoutes = require('./routes/goals')
const indexRoutes = require('./routes/index')
const entriesRoutes = require('./routes/entries')

// Load config
dotenv.config({ path: './config/config.env'})

// Passportjs config
require('./config/passport')(passport)

connectDB()

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

// Method override - intercepting POST method and swapping with method we want instead
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
}))


// Logging: 
// Morgan tells us in the console what pages are being touched, during dev mode ONLY:
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars Helpers
const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs')

//Handlebars (templating engine)
//!Added .engine after exphbs
app.engine('.hbs', exphbs.engine({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select
    },
    defaultLayout: 'main',
    extname: '.hbs'
    })
);
app.set('view engine', '.hbs')

// Sessions middleware - BEFORE Passport middleware
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        })
        // cookie: { secure: true }
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', indexRoutes);
app.use('/auth', require('./routes/auth'));
app.use('/entries', entriesRoutes);
app.use('/goals', goalsRoutes);
app.use('/classes', classesRoutes);


const PORT = process.env.PORT || 3000


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
