import express from "express";

const articlesRouter = express.Router();

articlesRouter.get(`/category/:id`, (req, res) =>
  res.send(`articles/category/${req.params.id}`)
);
articlesRouter.get(`/add`, (req, res) => res.send(`articles/category/add`));
articlesRouter.get(`/edit/:id`, (req, res) =>
  res.send(`articles/edit/${req.params.id}`)
);
articlesRouter.get(`/:id`, (req, res) =>
  res.send(`/articles/${req.params.id}`)
);

export default articlesRouter;
