module.exports = async (req, res, next) => {
  const { SPS_SERVICE_LAYER_URL, B1SESSION, CompanyDB, ROUTEID } = req.cookies;

  if (!SPS_SERVICE_LAYER_URL || !B1SESSION || !CompanyDB || !ROUTEID) {
    res.status(401).send("Usuário não está autenticado");
  }
  next();
};
