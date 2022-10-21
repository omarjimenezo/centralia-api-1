import { Types } from "mongoose";

type userLogResp = {
  avatar: string;
  nombre: string;
  apellido: string;
  rol: number;
  telefono_personal: number;
  usuarioEmail: string;
};

export type messageDB = {
  mensaje: string;
  nombre?: string;
  rol?: string;
  token?: string | undefined;
  codigo_de_error?: number;
  user?: userLogResp;
};

export type argumenstJWT = {
  nombre: string;
  uid: Types.ObjectId;
  usuarioRol: number | undefined;
};

export type buildResp = {
  token?: string;
  isUniqueEmail?: any;
  responseDB?: any;
  usuario?: any;
  validPassword?: boolean;
  user?: userLogResp;
};
