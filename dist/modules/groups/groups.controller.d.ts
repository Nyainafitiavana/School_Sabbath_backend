import { GroupsService } from './groups.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import Helper from './../../utils/helper';
import { Response, NextFunction, Request } from 'express';
import { CreateGroupDto } from './dto/create-group.dto';
export declare class GroupsController {
    private readonly groupsService;
    private helper;
    constructor(groupsService: GroupsService, helper: Helper);
    create(res: Response, next: NextFunction, createGroupDto: CreateGroupDto): Promise<void>;
    findAll(res: Response, next: NextFunction, req: Request): Promise<void>;
    findOne(id: number, res: Response, next: NextFunction): Promise<void>;
    update(id: number, res: Response, updateGroupDto: UpdateGroupDto, next: NextFunction): Promise<void>;
    remove(id: number, res: Response, next: NextFunction): Promise<void>;
}
