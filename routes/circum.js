const express = require("express");
const routerCircum = express.Router();
const {circumference} = require("./pi");

//#region Swagger get circumference
/**
 * 
 * @swagger 
 * /circum:
 *   get:
 *    summary: Return circumference.
 *    tags: [Circumference]
 *    responses: 
 *      200:
 *       description: Return circumference the most accurate value that the server has calculated PI.
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Circum'
 *      404:
 *       description: Calculating Circumference was not found.
 */
//#endregion

routerCircum.get("/", (req, res) => {
    const circum = circumference();
    res.send({circum});
    console.log(circum);
  });

module.exports = routerCircum;