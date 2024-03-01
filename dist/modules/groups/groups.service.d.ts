import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ResponseInterface } from './../../utils/response.interface';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import Helper from './../../utils/helper';
export declare class GroupsService {
    private groupRepository;
    private helper;
    constructor(groupRepository: Repository<Group>, helper: Helper);
    create(createGroupDto: CreateGroupDto): Promise<ResponseInterface>;
    findAll(limit: number, page: number, value: string): Promise<ResponseInterface>;
    findOne(id: number): Promise<ResponseInterface>;
    update(id: number, updateGroupDto: UpdateGroupDto): Promise<ResponseInterface>;
    remove(id: number): Promise<ResponseInterface>;
}
