import express from "express";

const categoriesRouter = express.Router();

categoriesRouter.get(`/`, (req, res) => res.send(`/categories`));

export default categoriesRouter;
