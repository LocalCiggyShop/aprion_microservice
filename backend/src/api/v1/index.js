import express from 'express';
import userRoute from "./user/index.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.status(201)
        res.json({
            health: "OK"
        });
});

router.use("/user", userRoute);

export default router;