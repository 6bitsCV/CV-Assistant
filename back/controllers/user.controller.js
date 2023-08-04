// Importacion de userService para inyectar en el controlador.

const userService = require('../services/user.service');
//
// controlador que redirige al servicio para registrar un usuario
async function recordUser(req, res) {
  const {
    /* Extraer los datos del cuerpo de la solicitud */
    rolesId,
    nick,
    password,
    name,
    lastName,
    email,
    phone,
  } = req.body;
  // Llamas al servicio para registrar un usuario
  const user = await userService.recordUser(rolesId, nick, password, name, lastName, email, phone);
  // Enviar respuesta con el usuario registrado
  res.status(201).send(user);
}

// Controlador que redirige al servicio para Login

async function login(req, res, next) {
  const {
    nick,
    password,
  } = req.body;
  try {
    const result = await userService.login(nick, password);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
}

// Controlador que redirige al servicio para actulizar un usuario

async function updateUser(req, res) {
  const {
    id,
  } = req.params;
  const {
    nick,
    password,
    name,
    lastName,
    email,
    phone,
  } = req.body;
  const user = await userService.updateUser(id, nick, password, name, lastName, email, phone);
  res.status(201).send(user);
}

async function userDeleted(req, res, next) {
  const { id } = req.params;
  try {
    await userService.deleteUser(id);
    res.status(201).send('usuario eliminado correctamente');
  } catch (error) {
    next(error);
  }
}
// Modulos a exportar para inyectar en routes
module.exports = {
  recordUser,
  updateUser,
  login,
  userDeleted,
};
