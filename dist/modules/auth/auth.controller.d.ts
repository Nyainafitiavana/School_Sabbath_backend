import { AuthService } from './auth.service';
import { NextFunction, Response, Request } from 'express';
import Helper from './../../utils/helper';
export declare class AuthController {
    private authService;
    private helper;
    constructor(authService: AuthService, helper: Helper);
    signIn(req: Request, res: Response, next: NextFunction): Promise<void>;
}
