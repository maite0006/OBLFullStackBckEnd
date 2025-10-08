const {allEtiquetas} = require("../models/repositorios/etiqueta.repository");

const getAllEtiquetas = async (req, res) => {
  try {
    const todas = await allEtiquetas(); 
    if (!todas || todas.length === 0) {
      return res.status(200).json({ message: "No se han encontrado etiquetas" });
    }
    res.status(200).json(todas);
  } catch (error) {           

    res.status(500).json({ message: `Ha ocurrido un error` });
  }
};

module.exports = {
  getAllEtiquetas
};