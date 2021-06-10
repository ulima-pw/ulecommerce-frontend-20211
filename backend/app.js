const express = require('express')
const getVideojuegos = require('./models/dao_videojuegos')

const app = express()
const PORT = 3000

app.use(express.static('assets')) // configurar archivos estaticos
app.set('view engine', 'ejs') // configurar ejs template

app.get('/', (req, res)=> {
    res.render('index')
})

app.get('/catalogo', (req, res) => {
    const listaVideojuegos = getVideojuegos()
    res.render('catalogo', {
        videojuegos : listaVideojuegos
    })
})

app.listen(PORT, ()=> {
    console.log(`Servidor ejecutandose en el puerto ${PORT}`)
})
