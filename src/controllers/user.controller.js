const { cambiarPalan } = require("../models/repositorios/user.repository");

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

module.exports = {
  cambiarP,
};
