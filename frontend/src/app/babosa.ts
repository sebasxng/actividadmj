export type Categoria = 'babosas' | 'elementales' | 'malvadas';
export type Bando = 'buena' | 'malvada';

export interface Estadisticas {
  ataque: number;
  defensa: number;
  velocidad: number;
}

export interface Babosa {
  id: string;
  nombre: string;
  categoria: Categoria;
  bando: Bando;
  imagen: string;
  elemento: string | null;
  habilidad: string | null;
  donde_se_encuentra: string | null;
  estadisticas: Estadisticas | null;
  /** Ruta a la imagen o clip de la transformación (por ejemplo "media/burpy.mp4") */
  transformacion: string | null;
  por_confirmar: boolean;
}

export interface CategoriaInfo {
  id: Categoria;
  titulo: string;
  descripcion: string;
}
