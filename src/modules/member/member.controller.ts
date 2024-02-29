import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Next,
  Res,
  Req,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import Helper from './../../utils/helper';
import { NextFunction, Response, Request } from 'express';
import { ResponseInterface } from './../../utils/response.interface';
import { AuthGuard } from '../auth/auth.guards';

@Controller('/api/member')
@UseGuards(AuthGuard)
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private helper: Helper,
  ) {}

  @Post()
  async create(
    @Res() res: Response,
    @Next() next: NextFunction,
    @Body() createMemberDto: CreateMemberDto,
  ) {
    try {
      const creactMember: ResponseInterface =
        await this.memberService.create(createMemberDto);

      res.status(creactMember.statusCode).json(creactMember);
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
      const value: string = req.query.value ? (req.query.value as string) : '';

      const members: ResponseInterface = await this.memberService.findAll(
        req,
        limit,
        page,
        value,
        group,
      );

      res.status(members.statusCode).json(members);
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
      const member: ResponseInterface = await this.memberService.findOne(id);

      res.status(member.statusCode).json(member);
    } catch (error) {
      next(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Res() res: Response,
    @Body() updateMemberDto: UpdateMemberDto,
    @Next() next: NextFunction,
  ) {
    try {
      const result: ResponseInterface = await this.memberService.update(
        id,
        updateMemberDto,
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
      const result: ResponseInterface = await this.memberService.remove(id);

      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
}
