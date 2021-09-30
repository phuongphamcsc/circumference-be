const express = require("express");
const router = express.Router();

var result = "";
//#region calculate PI & Circumference
function calculatePI(digits) {
    result = "";
    digits++;

    var x = new Array(parseInt(digits * 10 / 3 + 2));
    var remainders = new Array(parseInt(digits * 10 / 3 + 2));

    var pi = new Array(digits);

    for (var j = 0; j < x.length; j++) {
        x[j] = 20;
    }


    for (var i = 0; i < digits; i++) {
        var carry = 0;
        for (var j = 0; j < x.length; j++) {
            var num = x.length - j - 1;
            var dem = num * 2 + 1;
            x[j] += carry;
            var quotient = parseInt(x[j] / dem);
            remainders[j] = x[j] % dem;
            carry = quotient * num;
        }

        pi[i] = parseInt(x[x.length - 1] / 10);
        remainders[x.length - 1] = parseInt(x[x.length - 1] % 10);

        for (var j = 0; j < x.length; j++) {
            x[j] = remainders[j] * 10;
        }
    }

    var c = 0;
    for (var i = pi.length - 1; i >= 0; i--) {
        pi[i] += c;
        c = parseInt(pi[i] / 10);
        if (i === 0) {
            result = (pi[i] % 10).toString() + "." + result;
        }
        else {
            result = (pi[i] % 10).toString() + result;
        }
    }

    if (digits == 1) {
        return result.replace('.', '');
    }
    return result;
};

function circumference() {
    const cPi = parseFloat(result || calculatePI(0));
    const diameter = 1.3927;
    return cPi * diameter;
};
//#endregion

//#region Swagger
/**
 * 
 * @swagger
 * components:
 *  schemas:
 *     Pi:
 *       type: object
 *       required:
 *          - digits
 *       properties:
 *          digits:
 *            type: number
 *            description: The number N digits of decimal places of precision.
 *       example:
 *          PI: 3.1415926535
 * 
 *     Circum:
 *       type: object
 *       example:
 *          Circum: 4.37529608852945
 */
//#endregion

//#region Swagger get PI
/**
 * 
 * @swagger 
 * /pi/{digits}:
 *   get:
 *    summary: Return the calculated PI is accurate to N digits decimal places.
 *    tags: [Pi]
 *    parameters:
 *      - in: path
 *        name: digits
 *        schema:
 *          type: number
 *        required: true
 *        description: The number N digits of decimal places of precision.
 *    responses: 
 *      200:
 *       description: Calculating PI to increasing accuracy e.g. digits is 10 then PI is 3.1415926535.
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Pi'
 *      404:
 *       description: Calculating PI was not found.
 */
//#endregion

router.get("/:digits", (req, res) => {
    pi = calculatePI(Number(req.params.digits));
    res.send({ pi });
});

module.exports = { router, circumference };
