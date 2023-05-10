import express from 'express';
import registerRoute from "./register.js";
import loginRoute from "./login.js";
import allRoute from "./search.js";
const MainUserRouter = express.Router();

MainUserRouter.use("/register", registerRoute);
MainUserRouter.use("/login", loginRoute);
MainUserRouter.use("/search", allRoute);

export default MainUserRouter;