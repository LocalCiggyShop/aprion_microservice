import express from "express";
import blogService from "../services/blogService.js";
import functions from "../utils/functions.js";
import RedisClient from "../services/redisService.js";
import auth from "../utils/middleware/auth.js";
const MainAll = express.Router();

// Get Post or All Posts
MainAll.get("/:id?", auth.isAuthorised, async (req, res) => {
  try {
    const idParams = req.params.id;
    // if(!parseInt(idParams)) return res.status(201).send("ID must be an integer!");
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
            res.status(201).json(JSON.parse(cachedBlogs));
            return false;
        }
    } else {
        res.status(201).send("Must have an name with a request, like: 'all'");
        return false;
    }
  } catch (_) {
    console.log(_);
    return res.status(201).send("An Error occured.");
  }
});

// Create Post
MainAll.post("/", auth.isAuthorised, async (req, res) => {
  const { title, content, published, authorId } = req.body;
  if(!title && !content && !published && !parseInt(authorId)) return res.status(201).send("You need to specify all fields to create a blog post!")
  
  // if(!idParams) return res.status(201).send("Provide and ID to create blog post!")
  if (!functions.checkInvalid(req, res, true /*, ["_", "("]*/)) return false;
  await blogService.createBlog(title, content, published, parseInt(authorId))
    .then((_) => {
      RedisClient.del("all_blogs");
      // Success
      return res.status(201).send('SUCCESS')
    })
    .catch((e) => {
        console.log(e)
        return res.status(201).send( 'An Error occured.')
    })
})

// Delete Post
MainAll.delete("/:id", auth.isAuthorised, async (req, res) => {
  const { id } = req.params;
  if(!parseInt(id)) return res.status(201).send("You need to specify a valid ID to delete a blog post!")
  
  // if(!idParams) return res.status(201).send("Provide and ID to create blog post!")
  if (!functions.checkInvalid(req, res, true /*, ["_", "("]*/)) return false;
  await blogService.getById(parseInt(id))
    .then(async (_) => {
      RedisClient.del("all_blogs");
      await blogService.deleteBlog(id)
        .then((_) => {
          return res.status(201).send('SUCCESS')
          // return success ? res.status(201).send('SUCCESS') : res.status(201).send('Could not delete blog post!')
        })
        .catch((e) => {
          if(e.code == 'P2025')
            return res.status(201).send('Blog couldn\'t be found :/');
          else {
            console.log(e);
            return res.status(501).send('An Error occured.');
          }
        })
        // // Success
        // return res.status(201).send('SUCCESS')
      })
      .catch((e) => {
        if(e.code == 'P2025')
        return res.status(201).send('Blog couldn\'t be found :/');
        else {
        console.log(e);
        return res.status(501).send('An Error occured.');
      }
    })
})

export default MainAll;
