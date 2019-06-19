const hanab1Service = require("../services/hanab1Service");
class XsjsController {
  async query(req, res) {
    const { xsjs, query } = req.body;
    const { authorization } = req.headers;
    const response = await hanab1Service.executeQuery(
      authorization,
      xsjs,
      query
    );
    res.send(response);
  }

  async storedProcedure(req, res) {
    const { xsjs, base, name, params } = req.body;
    const { authorization } = req.headers;
    const response = await hanab1Service.executeProcedure(
      authorization,
      xsjs,
      base,
      name,
      params
    );
    res.send(response);
  }
}

module.exports = new XsjsController();
