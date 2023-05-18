import express from 'express';
import userRouter from "./user/index.js";
import blogsRoute from "./blogs/index.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.status(201)
        res.json({
            health: "OK"
        });
});
router.use("/blogs", blogsRoute);
router.use("/user", userRouter);

export default router;