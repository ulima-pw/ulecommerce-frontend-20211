const getCategorias = require("../models/dao_categorias");

const resource = {
    get : (req, resp) => {
        // TODO
    },
    post : (req, resp) => {

    },
    put : (req, resp) => {

    },
    delete : (req, resp) => {

    },
    getAll : async (req, resp) => {
        const listaCategorias = await getCategorias();
        resp.send(listaCategorias);
    }
}

module.exports = resource;