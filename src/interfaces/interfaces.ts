export interface iUser
{
    nombre: string;
    age?: number;
    email: string;
    active:boolean;
    uid: any;
    status: Status;
    description?:string;
    ImageProfile?: string
    friends:any
}
export enum Status {
    Online = 'En línea',
    Offline = 'Desconectado',
    Busy = 'Ocupado',
    AppearOffline = 'Desconectado',
    Away = 'Ausente'
  }
