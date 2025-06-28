import {Express} from "express";
import {gamesInstance} from "../ControllersInit.js";
import GetHeaders from "../Helpers/GetHeaders";
import ResponseError from "../Helpers/ResponseError";
import * as process from "node:process";

export default function RegisterGamesApi(app: Express) {
    app.get(process.env.VITE_NODE_SERVER_GAMES_GETALL!, async (req, res) => {
        const response = await gamesInstance.getAllGames(GetHeaders(req, res));

        if (response instanceof ResponseError) {
            return res.status(response.status).json(response.error);
        }

        return res.status(200).json(response);
    });

    app.post(process.env.VITE_NODE_SERVER_GAMES_GET_PAGED!, async (req, res) => {
        const { page, pageSize} = req.body;

        const response = await gamesInstance.getGamesPaged({page, pageSize}, GetHeaders(req, res));

        if (response instanceof ResponseError) {
            return res.status(response.status).json(response.error);
        }

        return res.status(200).json(response);
    })

    app.post(process.env.VITE_NODE_SERVER_CRAWL_STEAM!, async (req, res) => {
        const { gamesIds, forceUpdate } = req.body;

        const response = await gamesInstance.crawlSteam({gamesIds, forceUpdate}, GetHeaders(req, res));

        if (response instanceof ResponseError) {
            return res.status(response.status).json(response.error);
        }

        return res.status(200).json(response);
    })
}