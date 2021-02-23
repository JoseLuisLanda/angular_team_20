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
}

export interface ElementId extends Elemento { uid: string; }