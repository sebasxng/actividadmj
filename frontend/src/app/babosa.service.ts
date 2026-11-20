import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Babosa, CategoriaInfo } from './babosa';

/** Habla con la API de Python. En desarrollo, proxy.conf.json envía /api al puerto 8000. */
@Injectable({ providedIn: 'root' })
export class BabosaService {
  private readonly http = inject(HttpClient);

  babosas() {
    return this.http.get<Babosa[]>('/api/babosas');
  }

  categorias() {
    return this.http.get<CategoriaInfo[]>('/api/categorias');
  }
}
