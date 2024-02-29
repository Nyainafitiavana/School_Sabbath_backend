export interface ActivityInterface {
  id?: number;
  quantity: number;
  typeActivity: OnObject;
  registry: OnObject;
}

export interface PresenceInterface {
  id?: number;
  member: OnObject;
  isPonctual: boolean;
  isPresent: boolean;
  participation: number;
  registry: OnObject;
}

export interface OnObject {
  id: number;
}
