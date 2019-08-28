import { Router } from "express";
import asyncMiddleware from "../async-middleware";

import IEvent from "./model/event";
import EventAppender from "./event-appender";
import { findAllEvents } from "./repository/event-repository";

const eventAppender = new EventAppender();

export const routes = () => {
    const route = Router();

    route.get("/", asyncMiddleware(async (_req, res) => {
       const events = await findAllEvents();
       res.json(events);
    }));

    route.post("/", (req, res) => {
        const events: IEvent[] = Array.isArray(req.body) ? req.body : [req.body];
        eventAppender.appendEvents(events);
        res.sendStatus(200);
    });

    return route;
};
