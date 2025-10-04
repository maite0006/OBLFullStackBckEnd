const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const isValidPassword = async (password, userPassword) => {
  const result = await bcrypt.compare(password, userPassword);
  return result;
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
const cambiarPalan = async (userId, /* nuevoPaln, */ payload) => {
  const user = await User.findOne({ _id: userId });
  if (user) {
    Object.entries(payload).forEach(([key, value]) => {
      user[key] = value;
    });
    await user.save();
  }
  return user;
};

module.exports = {
  findUserByEmail,
  isValidPassword,
  saveUser,
  cambiarPalan,
};
