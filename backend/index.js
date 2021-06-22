const express = require('express')
const session = require('express-session')
const getVideojuegos = require('./models/dao_videojuegos')
const bodyParser = require('body-parser')
const path = require('path');
const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, 'assets'))) // configurar archivos estaticos

app.set('view engine', 'ejs') // configurar ejs template
app.set('views', path.join(__dirname, '/views')) // configurar ruta para directorios de views

app.use(bodyParser.json()) // para trabajar con formularios
app.use(bodyParser.urlencoded({
    extended : true
})) // para trabajar con formularios
app.use(session({
    secret : "123456789",
    resave : false,
    saveUninitialized : false
})) // configurando el manejo de sesiones
 
app.get('/', (req, res)=> {
    // Valido si hay un usuario en la sesion
    if (req.session.usuario != null) {
        res.render('index', {
            usuario : req.session.usuario
        })
    }else {
        res.render('index', {
            usuario : {
                nombre : "",
                mail : "",
                mensaje : ""
            }
        })
    }
    
})

app.get('/catalogo', async (req, res) => {
    const listaVideojuegos = await getVideojuegos()
    res.render('catalogo', {
        videojuegos : listaVideojuegos
    })
})

app.post('/registro', (req, res) => {
    const usuario = {
        nombre : req.body.nombre,
        pais : req.body.pais,
        mail : req.body.mail,
        mensaje : req.body.mensaje
    }

    // Guardarlo en sesion
    req.session.usuario = usuario

    res.redirect('/')

})

app.listen(PORT, ()=> {
    console.log(`Servidor ejecutandose en el puerto ${PORT}`)
})
