const db = require('../sequelize/models')

const getCategorias = async () => {
    const listaCategorias = await db.Category.findAll();
    return listaCategorias;
}

module.exports = getCategorias;