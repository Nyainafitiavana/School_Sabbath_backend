import { RegistryService } from './registry.service';
import Helper from './../../utils/helper';
import { NextFunction, Response, Request } from 'express';
export declare class RegistryController {
    private readonly registryService;
    private helper;
    constructor(registryService: RegistryService, helper: Helper);
    create(res: Response, next: NextFunction, req: Request): Promise<void>;
    findAll(res: Response, next: NextFunction, req: Request): Promise<void>;
    findOne(id: number, res: Response, next: NextFunction): Promise<void>;
    update(id: number, res: Response, req: Request, next: NextFunction): Promise<void>;
    remove(id: number, res: Response, next: NextFunction): Promise<void>;
}
