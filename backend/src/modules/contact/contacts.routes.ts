import Router,{type Request, type Response} from "express";
import contactController from "./contacts.controller.ts";

const contacts = Router();
contacts.get("/", async (req: Request, res: Response) => {
    req.log.info("GET /api/v1/contacts endpoint hit");
    await contactController.getAllContacts(req, res);
});
contacts.post("/", async (req: Request, res: Response) => {
    req.log.info("POST /api/v1/contacts endpoint hit with body: " + JSON.stringify(req.body));
    await contactController.createContact(req, res);
});

export default contacts;