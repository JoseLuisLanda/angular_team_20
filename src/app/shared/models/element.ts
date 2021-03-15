export interface Elemento {
    name?: string;
    displayName?: string;
    emailVerified?: boolean;
    photoURL?: string;
    role?: string;
    duration?: number;
    dateCreated?: Date;
    dateModified?: Date;
    title?: string;
    description?: string;
    type?: string;
    url?: string;
    email?: string;
    psw?: string;
    tokn?: string;
    elements?: ElementId[];
    id?:string;
    owner?: string;
    idUser?: string;
    autor?: string;
    grupos?: ElementId[];
    insignias?: ElementId[];
    talleres?: ElementId[];
}

export interface ElementId extends Elemento { uid: string; }
export interface Taller extends Elemento{
    name:string;
    description: string;
    dateStart: Date;
}
export interface Comunidad extends Elemento{
    name:string;
    description: string;
    dateStart: Date;
}
export interface Profile extends Elemento{
    displayName:string;
    nick: string;
    email: string;
    photoURL: string;
}