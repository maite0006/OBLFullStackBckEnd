require("dotenv").config();

const express = require("express");
const morgan = require("morgan"); //info consola
const cors = require("cors"); // conexión desde otro dominio
const jwt = require("jsonwebtoken");  //  autenticación
const mongoose = require("mongoose");  // conexión  MongoDB
const Joi = require("joi"); //validacion de datos

const app = express();


app.use(express.json());
app.use(morgan("dev"));
app.use(cors());