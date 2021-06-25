const express = require('express')
const session = require('express-session')
const { getVideojuegos, 
        createVideojuego, 
        deleteVideojuego,
        getVideojuego,
        updateVideojuego
     } = require('./models/dao_videojuegos')
const bodyParser = require('body-parser')
const path = require('path');
const getCategorias = require('./models/dao_categorias')
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

app.get('/catalogo/add', async (req, res) => {
    // obtener las categorias que hay en la bd
    const listaCategorias = await getCategorias();
    res.render('catalogo_registro', {
        categorias : listaCategorias
    })
})

app.post('/catalogo/add', async (req, res) => {
    const vj = {
        name : req.body.vj_name,
        price : parseFloat(req.body.vj_price),
        idCategory : parseInt(req.body.vj_category)
    }
    const vjGuardado = await createVideojuego(vj);
    console.log(vjGuardado)

    res.redirect('/catalogo')

})

app.get('/catalogo/delete/:id', async (req, res) => {
    const idVj = req.params.id;

    deleteVideojuego(parseInt(idVj))

    res.redirect('/catalogo')

})

app.get('/catalogo/edit/:id', async (req, res) => {
    const vjId = req.params.id;
    const vj = await getVideojuego(parseInt(vjId));
    const listaCategorias = await getCategorias();

    res.render('catalogo_edicion', {
        videojuego : vj,
        categorias : listaCategorias
    })
} )

app.post('/catalogo/edit', async (req, res) => {
    const vj = {
        id : parseInt(req.body.vj_id),
        name : req.body.vj_name,
        price : parseFloat(req.body.vj_price),
        idCategory : parseInt(req.body. vj_category)
    }

    await updateVideojuego(vj)

    res.redirect('/catalogo')
} )

app.listen(PORT, ()=> {
    console.log(`Servidor ejecutandose en el puerto ${PORT}`)
})
