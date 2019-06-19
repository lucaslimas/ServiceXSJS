const axios = require("axios");
const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false
});

module.exports = {
  async login(serviceLayerUrl, database, username, password) {
    try {
      const url = `${serviceLayerUrl}/Login`;

      const response = await axios.post(
        url,
        {
          CompanyDB: database,
          UserName: username,
          Password: password
        },
        {
          httpsAgent: agent
        }
      );

      const headerCookie = response.headers["set-cookie"];

      const cookies = [];

      headerCookie.map(cookie => {
        const [key, value] = cookie.split("=");
        cookies.push({
          key,
          value
        });
      });

      return cookies;
    } catch (err) {
      const message = err.response.data.error.message.value
        ? err.response.data.error.message.value
        : err.response.data;

      throw new Error(message);
    }
  },
  async logout(serviceLayerUrl) {
    try {
      const url = `${serviceLayerUrl}/Logout`;

      const response = await axios.post(
        url,
        {},
        {
          httpsAgent: agent
        }
      );
    } catch (err) {
      const message = err.response.data.error.message.value
        ? err.response.data.error.message.value
        : err.response.data;

      throw new Error(message);
    }
  },
  async executeGet(url, cookies) {
    try {
      const { SPS_SERVICE_LAYER_URL, B1SESSION, CompanyDB, ROUTEID } = cookies;

      const newUrl = `${SPS_SERVICE_LAYER_URL}/${url}`;

      const response = await axios.get(newUrl, {
        httpsAgent: agent,
        headers: {
          Cookie: `B1SESSION=${B1SESSION};CompanyDB=${CompanyDB};ROUTEID=${ROUTEID}`
        }
      });

      return response.data;
    } catch (err) {
      const message = err.response.data.error.message.value
        ? err.response.data.error.message.value
        : err.response.data;

      throw new Error(message);
    }
  },
  async executePost(url, params, cookies) {
    try {
      const { SPS_SERVICE_LAYER_URL, B1SESSION, CompanyDB, ROUTEID } = cookies;

      const newUrl = `${SPS_SERVICE_LAYER_URL}/${url}`;

      const response = await axios.post(newUrl, params, {
        httpsAgent: agent,
        headers: {
          Cookie: `B1SESSION=${B1SESSION};CompanyDB=${CompanyDB};ROUTEID=${ROUTEID}`
        }
      });

      return response.data;
    } catch (err) {
      const message = err.response.data.error.message.value
        ? err.response.data.error.message.value
        : err.response.data;

      throw new Error(message);
    }
  },
  async executePatch(url, params, cookies) {
    try {
      const { SPS_SERVICE_LAYER_URL, B1SESSION, CompanyDB, ROUTEID } = cookies;

      const newUrl = `${SPS_SERVICE_LAYER_URL}/${url}`;

      const response = await axios.patch(newUrl, params, {
        httpsAgent: agent,
        headers: {
          Cookie: `B1SESSION=${B1SESSION};CompanyDB=${CompanyDB};ROUTEID=${ROUTEID}`
        }
      });

      return response.data;
    } catch (err) {
      const message = err.response.data.error.message.value
        ? err.response.data.error.message.value
        : err.response.data;

      throw new Error(message);
    }
  }
};
