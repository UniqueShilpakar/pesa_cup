
import {type Request, type Response} from 'express';
import scorersService from './scorers.service';

const scorersController = {
    getAllScorers: async (req: Request, res: Response): Promise<void> => {
        const result = await scorersService.getAllScorers();
        if (!result) {
            res.status(404).json({error: 'No scorers found'});
            return;
        }
        res.json(result);
    },
    
    getScorerById: async (req: Request, res: Response): Promise<void> => {
        if (!req.params.id || Array.isArray(req.params.id)) {
            res.status(400).json({error: 'Invalid or missing id parameter'});
            return;
        }
        const scorerId = parseInt(req.params.id, 10);
        if (Number.isNaN(scorerId)) {
            res.status(400).json({error: 'Id must be a valid number'});
            return;
        }
        const result = await scorersService.getScorerById(scorerId);
        if (!result) {
            res.status(404).json({error: `Scorer with id ${scorerId} not found`});
            return;
        }
        res.json(result);
    }
};

export default scorersController;