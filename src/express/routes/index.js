import express from "express";

const rootRouter = express.Router();

rootRouter.get(`/`, (req, res) => res.send(`/`));

export default rootRouter;
