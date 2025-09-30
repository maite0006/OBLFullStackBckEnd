const jwt = require("jsonwebtoken");
const {
  findUserByEmail,
  isValidPassword,
  saveUser,
} = require("../models/repositorios/user.repository");

const postAuthLogin = async (req, res) => {
  const { body } = req;
  const { email, password } = body;

  const user = await findUserByEmail(email);
  if (!user) {
    res.status(400).json({ message: "Credenciales invalidas" });
    return;
  }

  const isValidPass = await isValidPassword(password, user.password);

  if (!isValidPass) {
    res.status(401).json({ message: "Credenciales invalidas" });
    return;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, plan: user.plan },
    process.env.AUTH_SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.json({ token });
};

const postAuthSignup = async (req, res) => {
  const { body } = req;
  const { name, password, email } = body;

  const user = await findUserByEmail(email);

  if (user) {
    res.status(400).json({ message: "Email ya registrado" });
    return;
  }

  try {
    await saveUser(name, password, email);
    res.status(201).json({ message: "usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error inesperado" });
  }
};

module.exports = {
  postAuthLogin,
  postAuthSignup,
};
