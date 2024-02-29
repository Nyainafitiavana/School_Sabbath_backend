import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Constant } from 'src/utils/constant';
import { ResponseInterface } from 'src/utils/response.interface';
import { Repository, Brackets } from 'typeorm';
import Helper from './../../utils/helper';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entities/member.entity';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Request } from 'express';

@Injectable()
export class MemberService {
  constructor(
    @Inject('MEMBER_REPOSITORY')
    private memberRepository: Repository<Member>,
    private helper: Helper,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<ResponseInterface> {
    const newMember = this.memberRepository.create({ ...createMemberDto });

    await this.memberRepository.save(newMember);

    return {
      statusCode: HttpStatus.OK,
      message: Constant.OK,
    };
  }

  async findOneByEmail(email: string): Promise<Member> {
    const member: Member = await this.memberRepository.findOne({
      where: { email: email },
      relations: ['group'],
    });

    return member;
  }

  async findAll(
    req: Request,
    limit: number,
    page: number,
    value: string,
    group: number,
  ): Promise<ResponseInterface> {
    const offset: number = await this.helper.calculOffset(limit, page);
    const user: Member = req['user'];
    const query = this.memberRepository
      .createQueryBuilder('qb')
      .leftJoinAndSelect('qb.group', 'gp');

    if (!user.isAdmin) {
      query.where('gp.id = :groupId', { groupId: user.group.id });
    } else {
      query.where('true');
    }

    if (group) {
      query.andWhere('gp.id = :groupId', { groupId: group });
    }

    query
      .andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(qb.fullName) LIKE LOWER(:val)', {
            val: `%${value}%`,
          })
            .orWhere('LOWER(qb.address) LIKE LOWER(:val)', {
              val: `%${value}%`,
            })
            .orWhere('LOWER(qb.phoneNumber) LIKE LOWER(:val)', {
              val: `%${value}%`,
            });
        }),
      )
      .skip(offset)
      .take(limit);

    const [members, count] = await query.getManyAndCount();

    return {
      statusCode: HttpStatus.OK,
      message: Constant.OK,
      data: members,
      limit,
      page,
      totalRows: count,
    };
  }

  async findOne(id: number): Promise<ResponseInterface> {
    const member: Member | undefined = await this.memberRepository.findOne({
      where: { id: id },
      relations: ['group'],
    });

    if (!member) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: Constant.CONFLICT,
        data: member,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: Constant.OK,
      data: member,
    };
  }

  async update(
    id: number,
    updateMemberDto: UpdateMemberDto,
  ): Promise<ResponseInterface> {
    const member: Member | undefined = await this.memberRepository.findOne({
      where: { id: id },
    });

    if (!member) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: Constant.CONFLICT,
        data: member,
      };
    }

    await this.memberRepository.update(member.id, updateMemberDto);

    return {
      statusCode: HttpStatus.OK,
      message: "L'opération a été exécutée avec succès.",
    };
  }

  async remove(id: number): Promise<ResponseInterface> {
    const member: Member | undefined = await this.memberRepository.findOne({
      where: { id: id },
    });

    if (!member) {
      return {
        statusCode: HttpStatus.OK,
        message: Constant.CONFLICT,
        data: member,
      };
    }

    await this.memberRepository.delete({ id: member.id });

    return {
      statusCode: HttpStatus.OK,
      message: "L'opération a été exécutée avec succès.",
    };
  }
}
