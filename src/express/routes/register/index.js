import express from "express";

const registerRouter = express.Router();

registerRouter.get(`/`, (req, res) => res.send(`/register`));

export default registerRouter;
