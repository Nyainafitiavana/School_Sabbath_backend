import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Res,
  Next,
  Req,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import Helper from './../../utils/helper';
import { ResponseInterface } from './../../utils/response.interface';
import { Response, NextFunction, Request } from 'express';
import { CreateGroupDto } from './dto/create-group.dto';
import { AuthGuard } from '../auth/auth.guards';

@Controller('/api/groups')
@UseGuards(AuthGuard)
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private helper: Helper,
  ) {}

  @Post()
  async create(
    @Res() res: Response,
    @Next() next: NextFunction,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    try {
      const creactGroup: ResponseInterface =
        await this.groupsService.create(createGroupDto);

      res.status(creactGroup.statusCode).json(creactGroup);
    } catch (error) {
      next(error);
    }
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Next() next: NextFunction,
    @Req() req: Request,
  ) {
    try {
      const limit: number = Number(req.query.limit);
      const page: number = Number(req.query.page);
      const value: string = req.query.value ? (req.query.value as string) : '';

      const groups: ResponseInterface = await this.groupsService.findAll(
        limit,
        page,
        value,
      );

      res.status(groups.statusCode).json(groups);
    } catch (error) {
      next(error);
    }
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const group: ResponseInterface = await this.groupsService.findOne(id);

      res.status(group.statusCode).json(group);
    } catch (error) {
      next(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Res() res: Response,
    @Body() updateGroupDto: UpdateGroupDto,
    @Next() next: NextFunction,
  ) {
    try {
      const result: ResponseInterface = await this.groupsService.update(
        id,
        updateGroupDto,
      );

      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result: ResponseInterface = await this.groupsService.remove(id);

      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
}
