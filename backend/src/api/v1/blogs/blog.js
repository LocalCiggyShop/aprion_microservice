import express from "express";
import blogService from "../services/blogService.js";
import functions from "../utils/functions.js";
import RedisClient from "../services/redisService.js";
const MainAll = express.Router();

MainAll.get("/:id?", async (req, res) => {
  try {
    const idParams = req.params.id;
    if (!functions.checkInvalid(req, res /*, ["_", "("]*/)) return false;

    if(idParams == "all") {
        const cachedBlogs = await RedisClient.get("all_blogs");
        if (!cachedBlogs) {
            blogService.getAll()
                .then((data) => {
                    RedisClient.set("all_blogs", JSON.stringify(data));
                    // Success
                    return res.status(201).send(data);
                })
            .catch((_) => {
                // Error
                console.log(_);
                return res.status(201).send("An Error occured.");
            });
        } else {
            res.status(201).send(cachedBlogs);
            return false;
        }
    } else {
        res.status(201).send("Must have an id with a request.");
        return false;
    }
  } catch (_) {
    console.log(_);
    return res.status(201).send("An Error occured.");
  }
});

export default MainAll;
