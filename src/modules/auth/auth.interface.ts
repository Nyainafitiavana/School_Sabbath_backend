import { Group } from '../groups/entities/group.entity';

export interface AuthInterface {
  statusCode: number;
  message: string;
  access_token?: string;
  isAdmin?: boolean;
  isManager?: boolean;
  group?: Group;
}
