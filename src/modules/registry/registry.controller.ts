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
  UseGuards,
} from '@nestjs/common';
import { RegistryService } from './registry.service';
import { CreateRegistryDto } from './dto/create-registry.dto';
import { UpdateRegistryDto } from './dto/update-registry.dto';
import Helper from './../../utils/helper';
import { NextFunction, Response, Request } from 'express';
import { ResponseInterface } from './../../utils/response.interface';
import { ActivityInterface, PresenceInterface } from './registry.interface';
import { AuthGuard } from '../auth/auth.guards';

@Controller('/api/registry')
@UseGuards(AuthGuard)
export class RegistryController {
  constructor(
    private readonly registryService: RegistryService,
    private helper: Helper,
  ) {}

  @Post()
  async create(
    @Res() res: Response,
    @Next() next: NextFunction,
    @Req() req: Request,
  ) {
    try {
      const activity: ActivityInterface[] = req.body.activity;
      const presences: PresenceInterface[] = req.body.presence;
      const createRegistryDto: CreateRegistryDto = req.body;

      const createRegistry: ResponseInterface =
        await this.registryService.create(
          createRegistryDto,
          activity,
          presences,
        );

      res.status(createRegistry.statusCode).json(createRegistry);
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
      const group: number = req.query.group ? Number(req.query.group) : null;
      const quarterly: number = req.query.quarterly
        ? Number(req.query.quarterly)
        : null;
      const month: number = req.query.month ? Number(req.query.month) : null;
      const year: number = req.query.year ? Number(req.query.year) : null;

      const registry: ResponseInterface = await this.registryService.findAll(
        req,
        limit,
        page,
        group,
        quarterly,
        month,
        year,
      );

      res.status(registry.statusCode).json(registry);
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
      const quarterly: ResponseInterface =
        await this.registryService.findOne(id);

      res.status(quarterly.statusCode).json(quarterly);
    } catch (error) {
      next(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request,
    @Next() next: NextFunction,
  ) {
    try {
      const activityUpdate: ActivityInterface[] = req.body.activity;
      const presencesUpdate: PresenceInterface[] = req.body.presence;
      delete req.body.activity;
      delete req.body.presence;

      const updateRegistryDto: UpdateRegistryDto = req.body;

      const result: ResponseInterface = await this.registryService.update(
        id,
        updateRegistryDto,
        activityUpdate,
        presencesUpdate,
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
      const result: ResponseInterface = await this.registryService.remove(id);

      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
}
