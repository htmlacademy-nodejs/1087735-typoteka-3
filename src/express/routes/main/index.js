import express from "express";

const mainRoutes = express.Router();

mainRoutes.get(`/`, (req, res) => res.send(`/`));
mainRoutes.get(`/login`, (req, res) => res.send(`/login`));
mainRoutes.get(`/register`, (req, res) => res.send(`/register`));
mainRoutes.get(`/search`, (req, res) => res.send(`/search`));
mainRoutes.get(`/categories`, (req, res) => res.send(`/categories`));

export default mainRoutes;
