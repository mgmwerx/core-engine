import { Router } from "express";
import asyncMiddleware from "../async-middleware";

import eventRepository from "./repository/event-repository";

export const routes = () => {
    const route = Router();

    route.get("/", asyncMiddleware(async (_req, res) => {
       const events = await eventRepository.findAll();
       res.json(events);
    }));

    route.post("/", (req, res) => {
        // WIP - this is just a placeholder that echoes the body received from the scraper client
        res.send(req.body);
    });

    return route;
};
