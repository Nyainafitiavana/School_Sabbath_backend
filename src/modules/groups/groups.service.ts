import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ResponseInterface } from './../../utils/response.interface';
import { Group } from './entities/group.entity';
import { Brackets, Repository } from 'typeorm';
import Helper from './../../utils/helper';
import { Constant } from './../../utils/constant';

@Injectable()
export class GroupsService {
  constructor(
    @Inject('GROUP_REPOSITORY')
    private groupRepository: Repository<Group>,
    private helper: Helper,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<ResponseInterface> {
    const newGroup = this.groupRepository.create({ ...createGroupDto });

    await this.groupRepository.save(newGroup);

    return {
      statusCode: HttpStatus.OK,
      message: Constant.OK,
    };
  }

  async findAll(
    limit: number,
    page: number,
    value: string,
  ): Promise<ResponseInterface> {
    const offset: number = await this.helper.calculOffset(limit, page);
    const query = this.groupRepository
      .createQueryBuilder('qb')
      .where(
        new Brackets((qb) => {
          qb.where('LOWER(qb.designation) LIKE LOWER(:val)', {
            val: `%${value}%`,
          }).orWhere('qb.year LIKE :val', { val: `%${value}%` });
        }),
      )
      .skip(offset)
      .take(limit);

    const [groups, count] = await query.getManyAndCount();

    return {
      statusCode: HttpStatus.OK,
      message: Constant.OK,
      data: groups,
      limit,
      page,
      totalRows: count,
    };
  }

  async findOne(id: number): Promise<ResponseInterface> {
    const group: Group | undefined = await this.groupRepository.findOne({
      where: { id: id },
    });

    if (!group) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: Constant.CONFLICT,
        data: group,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: Constant.OK,
      data: group,
    };
  }

  async update(
    id: number,
    updateGroupDto: UpdateGroupDto,
  ): Promise<ResponseInterface> {
    const group: Group | undefined = await this.groupRepository.findOne({
      where: { id: id },
    });

    if (!group) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: Constant.CONFLICT,
        data: group,
      };
    }

    await this.groupRepository.update(group.id, updateGroupDto);

    return {
      statusCode: HttpStatus.OK,
      message: "L'opération a été exécutée avec succès.",
    };
  }

  async remove(id: number): Promise<ResponseInterface> {
    const group: Group | undefined = await this.groupRepository.findOne({
      where: { id: id },
    });

    if (!group) {
      return {
        statusCode: HttpStatus.OK,
        message: Constant.CONFLICT,
        data: group,
      };
    }

    await this.groupRepository.delete({ id: group.id });

    return {
      statusCode: HttpStatus.OK,
      message: "L'opération a été exécutée avec succès.",
    };
  }
}
