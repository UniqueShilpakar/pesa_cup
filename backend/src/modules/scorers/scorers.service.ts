import {ScorersRepository} from './scorers.repository';
import {z} from "zod";
import {scorerSchema} from "./scorers.schema";

type Scorer = z.infer<typeof scorerSchema>;

const repository = new ScorersRepository();

const scorersService = {
    getAllScorers: async (): Promise<Scorer[]> => {
        return repository.getAllScorers();
    },
    getScorerById: async (scorerId: number): Promise<Scorer | null> => {
        return repository.getScorerById(scorerId);
    }
};

export default scorersService;