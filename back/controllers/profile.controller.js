const { profileService } = require('../services');

/**
 * Controlador para obtener un PROFILE por su ID.
 *
 * Se Extrae los valores de los parametros de la solicitud HTTP mediante la
 * destructuracion del req.params
 *
 * Si la busqueda es exitosa, devuelve un PROFILE
 * y una respuesta HTTP con un código de estado 200 (Ok)
 *
 * Si ocurre algún error durante la operacion,
 * la función captura el error y llama a la función next,
 * lo que permite que el control pase al siguiente middleware que maneja los errores.
 */
async function getProfile(req, res, next) {
  const { id } = req.params;

  try {
    const profile = await profileService.getProfileById(id);

    res.status(200).send(profile);
  } catch (error) {
    next(error);
  }
}

// Controlador para obetner todos los Perfiles de un Usuario
async function getProfilesByUserIdController(req, res) {
  // Desestructuración del objeto req.params para obtener directamente el userId
  const { id } = req.params;
  try {
    const profiles = await profileService.getProfileByUserId(id);
    // Respondemos con los perfiles obtenidos en formato JSON
    res.status(201).send(profiles);
  } catch (error) {
    // Manejo de errores si ocurre algún problema en el servicio
    res.status(500).json({ error: 'Error al obtener los perfiles del usuario' });
  }
}

module.exports = {
  getProfile,
  getProfilesByUserIdController,
};
