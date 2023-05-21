import express from 'express';
import isAuthorised from "../utils/middleware/auth.js";
import registerRoute from "./register.js";
import loginRoute from "./login.js";
import allRoute from "./search.js";
const MainUserRouter = express.Router();

MainUserRouter.use("/register", registerRoute);
MainUserRouter.use("/login", loginRoute);
MainUserRouter.use("/search", isAuthorised.isAuthorised, allRoute);

export default MainUserRouter;