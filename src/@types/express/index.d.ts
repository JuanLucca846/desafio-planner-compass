import { UserInterface } from "../../domains/model/User";
declare global{
     namespace Express{
        export interface Request extends Request{
            user?: UserInterface;
        }
    }
}
