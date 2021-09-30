const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const {router} = require("./routes/pi");
const routerCircum = require("./routes/circum");

const port = process.env.PORT || 3000;

//#region Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "Circumference Sun API"
    },
    servers: [
      {
        url: "https://pi-spigot.herokuapp.com"
      }
    ]    
  },
  apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);
//#endregion

const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors({origin:'*'}));
app.use(express.json());
app.use("/pi", router);
app.use("/circum", routerCircum);
app.listen(port, () => console.log(`The server is running on ${port}`));
