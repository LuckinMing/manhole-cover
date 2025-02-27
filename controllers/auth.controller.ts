import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class AuthController {
    static register(req: Request, res: Response) {
        const { username, password } = req.body;
        const user = UserService.register(username, password);
        res.status(201).json(user);
    }

    static login(req: Request, res: Response) {
        const { username, password } = req.body;
        const user = UserService.login(username, password);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
}
