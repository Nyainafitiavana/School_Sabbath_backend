import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { Repository } from 'typeorm';
import { Presence } from './entities/presence.entity';
import { ResponseInterface } from 'src/utils/response.interface';
import Helper from 'src/utils/helper';
export declare class PresenceService {
    private presenceRepository;
    private helper;
    constructor(presenceRepository: Repository<Presence>, helper: Helper);
    create(createPresenceDto: CreatePresenceDto): Promise<ResponseInterface>;
    update(id: number, updatePresenceDto: UpdatePresenceDto): Promise<ResponseInterface>;
}
