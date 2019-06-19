require("regenerator-runtime");
require("dotenv").config();

const express = require("express");
const service = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const xsjsController = require("./controllers/xsjsController");
const serviceLayerController = require("./controllers/serviceLayerController");

const authServiceLayer = require("./middleawres/authServiceLayer");

const port = process.env.PORT || 3000;

service.use(cors());
service.use(cookieParser());
service.use(express.json());

service.get("/", (req, res) => {
  res.send("Serviço is running...");
});

service.post("/xsjs/query", xsjsController.query);
service.post("/xsjs/storedprocedure", xsjsController.storedProcedure);

service.post("/servicelayer/login", serviceLayerController.login);
service.post("/servicelayer/logout", serviceLayerController.logout);

/*VALIDA SESSÃO DO USUÁRIO*/
service.use("/servicelayer", authServiceLayer);

service.post("/servicelayer/invalid", serviceLayerController.invalid);
service.get("/servicelayer/:action", serviceLayerController.get);
service.post("/servicelayer/:action", serviceLayerController.post);
service.patch("/servicelayer/:action", serviceLayerController.patch);
service.get("/servicelayer/smlsvc/:action", serviceLayerController.smlsvc);

service.listen(port, () => {
  console.log(
    "Running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown"
  );
});
