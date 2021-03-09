export interface Comunidad {
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
}
export interface Categoria {
  id: string;
  name: string;
}
