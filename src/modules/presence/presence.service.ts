import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { Repository } from 'typeorm';
import { Presence } from './entities/presence.entity';
import { ResponseInterface } from 'src/utils/response.interface';
import { Constant } from 'src/utils/constant';
import Helper from 'src/utils/helper';

@Injectable()
export class PresenceService {
  constructor(
    @Inject('PRESENCE_REPOSITORY')
    private presenceRepository: Repository<Presence>,
    private helper: Helper,
  ) {}

  async create(
    createPresenceDto: CreatePresenceDto,
  ): Promise<ResponseInterface> {
    const newPresence = this.presenceRepository.create({
      ...createPresenceDto,
    });

    await this.presenceRepository.save(newPresence);

    return {
      statusCode: HttpStatus.OK,
      message: Constant.OK,
    };
  }

  async update(
    id: number,
    updatePresenceDto: UpdatePresenceDto,
  ): Promise<ResponseInterface> {
    const presence: Presence | undefined =
      await this.presenceRepository.findOne({
        where: { id: id },
      });

    if (!presence) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: Constant.CONFLICT,
        data: presence,
      };
    }

    await this.presenceRepository.update(presence.id, updatePresenceDto);

    return {
      statusCode: HttpStatus.OK,
      message: "L'opération a été exécutée avec succès.",
    };
  }
}
