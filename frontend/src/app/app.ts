import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { Categoria } from './babosa';
import { BabosaService } from './babosa.service';
import { TarjetaBabosa } from './tarjeta-babosa';

@Component({
  selector: 'app-root',
  imports: [TarjetaBabosa],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly api = inject(BabosaService);

  protected readonly error = signal(false);
  protected readonly activa = signal<Categoria>('babosas');

  protected readonly categorias = toSignal(
    this.api.categorias().pipe(catchError(() => of([]))),
    { initialValue: [] },
  );

  private readonly babosas = toSignal(
    this.api.babosas().pipe(
      catchError(() => {
        this.error.set(true);
        return of([]);
      }),
    ),
    { initialValue: [] },
  );

  protected readonly info = computed(() => this.categorias().find((c) => c.id === this.activa()));

  /** Las elementales se muestran en dos filas: las buenas y las malvadas */
  protected readonly grupos = computed(() => {
    const lista = this.babosas().filter((b) => b.categoria === this.activa());
    if (this.activa() !== 'elementales') {
      return [{ titulo: '', babosas: lista }];
    }
    return [
      { titulo: 'Elementales', babosas: lista.filter((b) => b.bando === 'buena') },
      { titulo: 'Elementales malvadas', babosas: lista.filter((b) => b.bando === 'malvada') },
    ];
  });
}
