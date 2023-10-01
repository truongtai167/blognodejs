const express = require('express')
const connectDB = require('./config/db')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()

//khoi dong handlebars
app.engine('handlebars',engine())
app.set('view engine','handlebars')
// khoi dong body-parser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


//khoi dong express
app.use(express.json())

//khoi dong method override de edit blog
app.use(methodOverride('_method'))

//nhap routes
const posts = require('./routes/post')

//ket noi dtb
connectDB()

//
app.get('/', (req,res) => res.render('index'))
app.get('/about',(req,res) => res.render('about') )


// su dung routes
app.use('/posts',posts)

const PORT = 5000
app.listen(PORT,() => console.log(`Server khoi dong tai port ${PORT}`))

