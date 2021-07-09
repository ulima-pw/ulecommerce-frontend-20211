const { getVideojuegos } = require("../models/dao_videojuegos");

const resource = {
    get : (req, resp) => {},
    post : (req, resp) => {},
    put : (req, resp) => {},
    delete : (req, resp) => {},
    getAll : async (req, resp) => {
        const listaVideojuegos = await getVideojuegos()
        resp.send(listaVideojuegos);
    },
}

module.exports = resource;