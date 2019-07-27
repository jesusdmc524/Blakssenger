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
    Online = 'Online',
    Offline = 'Offline',
    Busy = 'Busy',
    AppearOffline = 'Appear_Offline',
    Away = 'Away'
  }
