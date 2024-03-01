import { ResponseInterface } from 'src/utils/response.interface';
import { Repository } from 'typeorm';
import Helper from './../../utils/helper';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entities/member.entity';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Request } from 'express';
export declare class MemberService {
    private memberRepository;
    private helper;
    constructor(memberRepository: Repository<Member>, helper: Helper);
    create(createMemberDto: CreateMemberDto): Promise<ResponseInterface>;
    findOneByEmail(email: string): Promise<Member>;
    findAll(req: Request, limit: number, page: number, value: string, group: number): Promise<ResponseInterface>;
    findOne(id: number): Promise<ResponseInterface>;
    update(id: number, updateMemberDto: UpdateMemberDto): Promise<ResponseInterface>;
    remove(id: number): Promise<ResponseInterface>;
}
