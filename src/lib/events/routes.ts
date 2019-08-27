import { Router } from "express";

import eventRepository from "./repository/event-repository";

export const routes = () => {
    const route = Router();

    route.get("/", (_req, res) => {
       eventRepository.findAll()
           .then((events) => res.send(events))
           .catch(() => res.sendStatus(500));
    });

    route.post("/", (req, res) => {
        // WIP - this is just a placeholder that echoes the body received from the scraper client
        res.send(req.body);
    });

    return route;
};
