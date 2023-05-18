import express from "express";
import userService from "../services/userService.js";
import functions from "../utils/functions.js";
import isAuthorised from "../utils/middleware/auth.js";
import RedisClient from "../services/redisService.js";
const MainAll = express.Router();

MainAll.get("/:name/:method?", isAuthorised.isAuthorised, async (req, res) => {
  try {
    const params = req.params;
    //const allParams = params.name || params.method
    if (!functions.checkInvalid(req, res /*, ["_", "("]*/)) return false;

    switch (params.method) {
      case "all":
        const redislocal = await RedisClient.get("all_users");
        if (!redislocal) {
          await userService
            .getAll()
            .then((data) => {
              RedisClient.set("all_users", JSON.stringify(data));
              // Success
              return res.status(201).send(data);
            })
            .catch((_) => {
              // Error
              console.log(_);
              return res.status(201).send("An Error occured.");
              //return false;
              //throw new Error(err);
            });
        } else {
            // await RedisClient.disconnect();
            return res.status(201).send(redislocal);
        }

        break;

      case "specific":
        await userService
          .getByEmail(params.name)
          .then((data) => {
            // Success
            return res.status(201).send(data);
          })
          .catch((_) => {
            // Error
            console.log(_);
            return res.status(201).send("An Error occured.");
            //return false;
            //throw new Error(err);
          });
        break;

      default:
        await userService
          .getByEmail(params.name)
          .then((data) => {
            // Success
            return res.status(201).send(data);
          })
          .catch((_) => {
            // Error

            console.log(_);
            return res.status(201).send("An Error occured.");
            //return false;
          });
    }
  } catch (_) {
    console.log(_);
    return res.status(201).send("An Error occured.");
  }
});

export default MainAll;

// case isNaN(1):
//     console.log(allParams)
//     userService.getById(allParams)
//     .then(data => {
//         // Success
//         return res.status(201).send(data)
//     })
//     .catch(_ => {
//         // Error
//         return console.log(_)
//         //return false;
//         //throw new Error(err);
//     });
// break;
//throw new Error(err);
