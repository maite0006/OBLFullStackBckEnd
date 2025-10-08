const { cambiarPalan,addFavorito, getFavoritos } = require("../models/repositorios/user.repository");

const cambiarP = async (req, res) => {
  const { body } = req;
  const { id } = req.user;
  try {
    await cambiarPalan(id, body);
    res.status(200).json({ message: "Plan cambiado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: `Ha ocurrido un error` });
    return;
  }
};
const agregarFavorito = async (req, res) => {
  const { multimediaId } = req.body;
  const { id } = req.user;  
  try {
    const favoritos = await addFavorito(id, multimediaId);
    res.status(200).json({ message: "Multimedia añadida a favoritos", favoritos });
  } catch (error) {
    res.status(error.status||500).json({ message: error.message|| 'Ha ocurrido un error' });
    return;
  }
};

const obtenerFavoritos= async (req, res)=>{
  const { id } = req.user;
  try {
    const favoritos = await getFavoritos(id);
    if (favoritos.length === 0) {
      return res.status(200).json({ message: "No hay elementos en favoritos" });
    }
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(error.status||500).json({ message: error.message|| 'Ha ocurrido un error' });
    return;
  }
}

module.exports = {
  cambiarP,
  agregarFavorito,
  obtenerFavoritos
};
