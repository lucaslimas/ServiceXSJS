require("regenerator-runtime");
require("dotenv").config();

const express = require("express");
const service = express();
const cors = require("cors");
const hanab1 = require("./hanab1");

const port = process.env.PORT || 3000;

service.use(cors());
service.use(express.json());

service.get("/", (req, res) => {
  res.send("Serviço is running...");
});

service.post("/query", async (req, res) => {
  const { xsjs, query } = req.body;
  const { authorization } = req.headers;
  const response = await hanab1.executeQuery(authorization, xsjs, query);
  res.send(response);
});

service.post("/stored_procedure", async (req, res) => {
  const { xsjs, base, name, params } = req.body;
  const { authorization } = req.headers;
  const response = await hanab1.executeProcedure(
    authorization,
    xsjs,
    base,
    name,
    params
  );
  res.send(response);
});

service.listen(port, () => {
  console.log(
    "Running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown"
  );
});
