import {Request, Response} from "express";

export default function GetHeaders(req: Request, res: Response){
    const headers = { ...req.headers };
    const authorization = headers.authorization;
    const accept = headers.accept;
    const contentType = headers.contentType;

    return { headers: {
        'Authorization': authorization,
        'Content-Type': contentType,
        'Accept': accept,
        } };
}