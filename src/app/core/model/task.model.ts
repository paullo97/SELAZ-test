import { EnumRole } from "./role.model";
import { EnumStatus } from "./status.model";
import { IUser } from "./user.model";

export interface ITask
{
  id: string,
  title: string,
  description: string,
  dataCriacao: string,
  dataVencimento: string,
  status: EnumStatus,
  responsavel: EnumRole;
  user: IUser;
}
