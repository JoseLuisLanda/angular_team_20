export interface Comunidad {
  id: string;
  name: string;
  uid: string;
  link: string;
  image: string;
  description: string;
  users: string[];
  lenguaje: string;
}
export interface Grupos {
  id: string;
  name: string;
  uid: string;
  link: string;
  image: string;
}
export interface Taller {
  uid: string;
  id: string;
  autor: string;
  autorLink: string;
  description: string;
  link: string;
  title: string;
  categoria: string;
  date: firebase.default.firestore.Timestamp;
  asistentes: Asistente[];
}
export interface Asistente {
  id: string;
  status: boolean;
}
export interface Insignia {
  id: string;
  description: string;
  image?: string;
  name: string;
  owners: string[];
}
export interface Categoria {
  id: string;
  name: string;
}
