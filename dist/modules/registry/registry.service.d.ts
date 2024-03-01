import { CreateRegistryDto } from './dto/create-registry.dto';
import { UpdateRegistryDto } from './dto/update-registry.dto';
import { ResponseInterface } from './../../utils/response.interface';
import { Repository } from 'typeorm';
import { Registry } from './entities/registry.entity';
import Helper from 'src/utils/helper';
import { ActivityInterface, PresenceInterface } from './registry.interface';
import { PresenceService } from '../presence/presence.service';
import { Request } from 'express';
export declare class RegistryService {
    private registryRepository;
    private helper;
    private readonly presenceService;
    constructor(registryRepository: Repository<Registry>, helper: Helper, presenceService: PresenceService);
    create(createRegistryDto: CreateRegistryDto, createActivityData: ActivityInterface[], createPresenceData: PresenceInterface[]): Promise<ResponseInterface>;
    findAll(req: Request, limit: number, page: number, group?: number, quarterly?: number, month?: number, year?: number): Promise<ResponseInterface>;
    findOne(id: number): Promise<ResponseInterface>;
    update(id: number, updateRegistryDto: UpdateRegistryDto, createActivityData: ActivityInterface[], createPresenceData: PresenceInterface[]): Promise<ResponseInterface>;
    remove(id: number): Promise<ResponseInterface>;
}
