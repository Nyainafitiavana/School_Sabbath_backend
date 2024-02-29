import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import Helper from './../../utils/helper';
import { NextFunction, Response, Request } from 'express';
export declare class MemberController {
    private readonly memberService;
    private helper;
    constructor(memberService: MemberService, helper: Helper);
    create(res: Response, next: NextFunction, createMemberDto: CreateMemberDto): Promise<void>;
    findAll(res: Response, next: NextFunction, req: Request): Promise<void>;
    findOne(id: number, res: Response, next: NextFunction): Promise<void>;
    update(id: number, res: Response, updateMemberDto: UpdateMemberDto, next: NextFunction): Promise<void>;
    remove(id: number, res: Response, next: NextFunction): Promise<void>;
}
