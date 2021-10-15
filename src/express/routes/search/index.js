import express from "express";

const searchRouter = express.Router();

searchRouter.get(`/`, (req, res) => res.send(`/search`));

export default searchRouter;
