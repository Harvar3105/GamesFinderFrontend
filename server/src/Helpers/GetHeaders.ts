import express, {Request, Response} from "express";

export default function GetHeaders(req: Request, res: Response){
    const headers = { ...req.headers };
    delete headers.host;

    return { headers: headers };
}