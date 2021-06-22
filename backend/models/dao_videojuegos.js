// const data = {
//     videojuegos : [
//         {codigo: 1, nombre : "Demons Souls", categoria : "FP RPG", precio : 45},
//         {codigo: 2, nombre : "Fifa 2021", categoria : "Deportes", precio : 40},
//         {codigo: 3, nombre : "GTA V", categoria : "Open World", precio : 35}
//     ],
//     categorias : [
//         { id : 1 , nombre : "FP RPG"},
//         { id : 2 , nombre : "Deportes"},
//         { id : 3 , nombre : "Open World"}
//     ]
// }
const db = require('../sequelize/models')


const getVideojuegos = async () => {
    const vgs = await db.Videogame.findAll();
    const videogames = []
    for (let vg of vgs) {
        videogames.push({
            id : vg.id,
            name : vg.name,
            price : vg.price,
            // category : await db.Category.findOne({
            //     where : {
            //         id : vg.idCategory
            //     }
            // })
            category : await vg.getCategory()
        })
    }
    console.log(videogames);
    return videogames;
}

module.exports = getVideojuegos;