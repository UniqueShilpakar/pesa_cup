import Router, {type Request,type Response} from 'express';
import scorersController from './scorers.controllers';

const scorersRouter = Router();

scorersRouter.get('/', async (req: Request, res: Response) =>{
    req.log.info('Fetching all scorers');
   await scorersController.getAllScorers(req, res);
}
);

scorersRouter.get('/:id', async (req:Request,res:Response)=>{
    req.log.info(`Fetching scorer with id: ${req.params.id}`);
    await scorersController.getScorerById(req, res);
});

export default scorersRouter;