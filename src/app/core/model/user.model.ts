import { EnumRole } from "./role.model";

export interface IUser
{
  id: string;
  name: string;
  role: EnumRole;
}
