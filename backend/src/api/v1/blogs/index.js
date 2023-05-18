import express from 'express';
import blogRoute from "./blog.js";
const MainUserRouter = express.Router();

MainUserRouter.use("/blog", blogRoute);

export default MainUserRouter;