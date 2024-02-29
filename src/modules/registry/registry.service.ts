import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRegistryDto } from './dto/create-registry.dto';
import { UpdateRegistryDto } from './dto/update-registry.dto';
import { ResponseInterface } from './../../utils/response.interface';
import { Constant } from './../../utils/constant';
import { Repository } from 'typeorm';
import { Registry } from './entities/registry.entity';
import Helper from 'src/utils/helper';
import { ActivityInterface, PresenceInterface } from './registry.interface';
import { PresenceService } from '../presence/presence.service';
import { CreatePresenceDto } from '../presence/dto/create-presence.dto';
import { UpdatePresenceDto } from '../presence/dto/update-presence.dto';
import { Member } from '../member/entities/member.entity';
import { Request } from 'express';

@Injectable()
export class RegistryService {
  constructor(
    @Inject('REGISTRY_REPOSITORY')
    private registryRepository: Repository<Registry>,
    private helper: Helper,
    private readonly presenceService: PresenceService,
  ) {}

  async create(
    createRegistryDto: CreateRegistryDto,
    createActivityData: ActivityInterface[],
    createPresenceData: PresenceInterface[],
  ): Promise<ResponseInterface> {
    //Create registry
    const newRegistry: Registry = this.registryRepository.create({
      ...createRegistryDto,
    });

    await this.registryRepository.save(newRegistry);

    //Create presence by regitry
    createPresenceData.map((presence) => {
      presence.registry = newRegistry;
      const createPresenceDto: CreatePresenceDto = presence;

      this.presenceService.create(createPresenceDto);
    });

    return {
      statusCode: HttpStatus.OK,
      message: Constant.OK,
    };
  }

  async findAll(
    req: Request,
    limit: number,
    page: number,
    group: number = null,
    quarterly: number = null,
    month: number = null,
    year: number = null,
  ): Promise<ResponseInterface> {
    const user: Member = req['user'];
    const offset: number = await this.helper.calculOffset(limit, page);
    const query = this.registryRepository
      .createQueryBuilder('qb')
      .leftJoinAndSelect('qb.group', 'gp')
      .leftJoinAndSelect('qb.presence', 'prc')
      .leftJoinAndSelect('prc.member', 'mbr');

    if (!user.isAdmin) {
      query.where('gp.id = :groupId', { groupId: user.group.id });
    } else {
      query.where('true');
    }

    if (group) {
      query.andWhere('gp.id = :groupId', { groupId: group });
    }

    if (quarterly) {
      query.andWhere('qb.id = :quarterly', { quarterly: quarterly });
    }

    if (month) {
      query.andWhere('qb.month = :month', { month: month });
    }

    if (year) {
      query.andWhere('qb.year = :year', { year: month });
    }

    query.skip(offset);
    query.take(limit);

    const [registry, count] = await query.getManyAndCount();

    return {
      statusCode: HttpStatus.OK,
      message: Constant.OK,
      data: registry,
      limit,
      page,
      totalRows: count,
    };
  }

  async findOne(id: number): Promise<ResponseInterface> {
    const registry: Registry | undefined = await this.registryRepository
      .createQueryBuilder('registry')
      .where('registry.id = :id', { id })
      .leftJoinAndSelect('registry.presence', 'presence')
      .leftJoinAndSelect('presence.member', 'member')
      .getOneOrFail();

    if (!registry) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: Constant.CONFLICT,
        data: registry,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: Constant.OK,
      data: registry,
    };
  }

  async update(
    id: number,
    updateRegistryDto: UpdateRegistryDto,
    createActivityData: ActivityInterface[],
    createPresenceData: PresenceInterface[],
  ): Promise<ResponseInterface> {
    const registry: Registry | undefined =
      await this.registryRepository.findOne({
        where: { id: id },
      });

    if (!registry) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: Constant.CONFLICT,
        data: registry,
      };
    }

    await this.registryRepository.update(registry.id, updateRegistryDto);

    //Create presence by regitry
    createPresenceData.map((presence) => {
      const updatePresenceDto: UpdatePresenceDto = presence;

      this.presenceService.update(presence.id, updatePresenceDto);
    });

    return {
      statusCode: HttpStatus.OK,
      message: "L'opération a été exécutée avec succès.",
    };
  }

  async remove(id: number): Promise<ResponseInterface> {
    const registry: Registry | undefined =
      await this.registryRepository.findOne({
        where: { id: id },
      });

    if (!registry) {
      return {
        statusCode: HttpStatus.OK,
        message: Constant.CONFLICT,
        data: registry,
      };
    }

    await this.registryRepository.delete({ id: registry.id });

    return {
      statusCode: HttpStatus.OK,
      message: "L'opération a été exécutée avec succès.",
    };
  }
}
