export interface Comunidad {
  id: string;
  name: string;
  uid: string;
  link: string;
  image: string;
  users?: string[];
  images: Image[];
  lenguaje: string;
  description: string;
  url: string;
}
export interface Leaders {
  id: string;
  name: string;
  path: string;
  tecnologia: string;
}
export interface Image {
  id: string;
  name: string;
  uid: string;
  url: string;
}
export interface Taller {
  name: string;
  uid: string;
  id: string;
  autor: string;
  autorLink: string;
  description: string;
  image?: string;
  link: string;
  url: string;
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
  owners?: string[];
}
export interface Categoria {
  id: string;
  name: string;
}

export interface Sponsor {
  id: string;
  name: string;
  foto: string;
}