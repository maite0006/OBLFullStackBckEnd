const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const isValidPassword = async (password, userPassword) => {
  const result = await bcrypt.compare(password, userPassword);
  return result;
};
const getFavoritos = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }
  return user.favoritos;
};
const addFavorito = async (userId, multimediaId) => {
  const user = await User.findById(userId);
  if (!user) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }

  if (!user.favoritos.includes(multimediaId)) {
    user.favoritos.push(multimediaId);
    await user.save();
  } else {
    const err = new Error("La multimedia ya está en favoritos");
    err.status = 400;
    throw err;
  }
  return user.favoritos;
};

const saveUser = async (name, password, email) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    nombre: name,
    password: hashedPassword,
    email: email,
  });
  console.log(newUser);

  const res = await newUser.save();
  return res;
};

//TODO: Arreglar cambiar plan
const cambiarPalan = async (userId, plan) => {
  const user = await User.findOne({ _id: userId });
  if (user) {
    user.plan = plan || user.plan;
    await user.save();
  }
  return user;
};

module.exports = {
  findUserByEmail,
  isValidPassword,
  saveUser,
  cambiarPalan,
  addFavorito,
  getFavoritos,
};
