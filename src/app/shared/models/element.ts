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
    images?: ElementId[];
    item?: ElementId;
    dateBirth?: string;
    pais?: string;
    genero?: string;
    facebook?:string;
    linkedin?: string;
    twitter?: string;
    github?: string;
    date?: firebase.default.firestore.Timestamp;
}

export interface ElementId extends Elemento { uid: string; }

export class Item implements Elemento{
    name:string;
    description: string;
    url: string;
    id:string;

    constructor() {
        this.name = "";
        this.description = "";
        this.url = "";
        this.id="";
    }
}
export class Comunidad extends Item{
    owner:string;
    tags: string;
    constructor() {
        super();
        this.owner = "";
        this.tags = "";
        
    }
}
export class Taller extends Item{
    autor:string;
    link: string;
    constructor() {
        super();
        this.autor = "";
        this.link = "";
        
    }
   
}
export interface Profile extends Elemento{
    displayName:string;
    nick: string;
    email: string;
    photoURL: string;
}
export class ElementModel {

    id?: string;
    name: string;
    description: string;
    duration?: number;
    status: boolean;
    dateCreated: Date;



    constructor() {
        this.name = "",
        this.description = "";
         this.status = true;
         this.dateCreated = new Date();
    }
}