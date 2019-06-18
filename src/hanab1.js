const axios = require("axios");
const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false
});

class HanaB1 {
  async executeProcedure(authorization, xsjs, base, name, params) {
    //console.log("Executando Procedure");
    const response = await axios.get(xsjs, {
      httpsAgent: agent,
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization
      },
      data: { base, name, params }
    });

    return response.data;
  }
  async executeQuery(authorization, xsjs, query) {
    //console.log(query);

    const response = await axios.get(xsjs, {
      httpsAgent: agent,
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization
      },
      data: {
        data: query
      }
    });

    return response.data;
  }
}

module.exports = new HanaB1();
