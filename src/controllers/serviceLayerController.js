const axios = require("axios");
const https = require("https");

const {
  login,
  logout,
  executeGet,
  executePost,
  executePatch
} = require("../services/serviceLayerService");
const { encrypt, decrypt } = require("../services/cryptoService");

class ServiceLayerController {
  async logout(req, res) {
    try {
      const { SPS_SERVICE_LAYER_URL } = req.cookies;

      if (SPS_SERVICE_LAYER_URL) {
        await logout(SPS_SERVICE_LAYER_URL);
      }

      for (var prop in req.cookies) {
        res.clearCookie(prop);
      }

      res.sendStatus(200);
    } catch (err) {
      res.status(err.status || 500).send(err.message);
    }
  }

  async login(req, res) {
    try {
      const { serviceLayerUrl, database, username, password } = req.body;

      const cookies = await login(
        serviceLayerUrl,
        database,
        username,
        password
      );

      cookies.map(({ key, value }) => {
        res.cookie(key, value);
      });

      res.cookie("SPS_SERVICE_LAYER_URL", serviceLayerUrl);
      res.cookie("SPS_DATABASE", database);
      res.cookie("SPS_USERNAME", username);
      res.cookie("SPS_PASSWORD", encrypt(password));

      res.sendStatus(200);
    } catch (err) {
      res.status(err.status || 500).send(err.message);
    }
  }

  invalid(req, res) {
    res.cookie("B1SESSION", "REMOVIDO");
    res.sendStatus(200);
  }

  async get(req, res) {
    try {
      const url = req.originalUrl;

      const newUrl = url.replace("/servicelayer/", "");

      const response = await executeGet(newUrl, req.cookies);

      res.send(response);
    } catch (err) {
      res.status(err.status || 500).send(err.message);
    }
  }

  async post(req, res) {
    try {
      const url = req.originalUrl;

      const newUrl = url.replace("/servicelayer/", "");

      const response = await executePost(newUrl, req.body, req.cookies);

      res.send(response);
    } catch (err) {
      res.status(err.status || 500).send(err.message);
    }
  }

  async patch(req, res) {
    try {
      const url = req.originalUrl;

      const newUrl = url.replace("/servicelayer/", "");

      const response = await executePatch(newUrl, req.body, req.cookies);

      res.send(response);
    } catch (err) {
      res.status(err.status || 500).send(err.message);
    }
  }

  async smlsvc(req, res) {
    try {
      const url = req.originalUrl;

      const newUrl = url.replace("/servicelayer/smlsvc/", "sml.svc/");

      const response = await executeGet(newUrl, req.cookies);

      res.send(response);
    } catch (err) {
      res.status(err.status || 500).send(err.message);
    }
  }
}

module.exports = new ServiceLayerController();
