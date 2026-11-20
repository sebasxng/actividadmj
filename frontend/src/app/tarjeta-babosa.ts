import { Component, computed, input, signal } from '@angular/core';
import { Babosa } from './babosa';

/** Tarjeta de una babosa: al hacer click (o Enter/Espacio) se voltea y muestra su ficha. */
@Component({
  selector: 'app-tarjeta-babosa',
  templateUrl: './tarjeta-babosa.html',
  styleUrl: './tarjeta-babosa.css',
})
export class TarjetaBabosa {
  readonly babosa = input.required<Babosa>();

  protected readonly volteada = signal(false);

  protected readonly esVideo = computed(() =>
    /\.(mp4|webm)$/i.test(this.babosa().transformacion ?? ''),
  );

  protected readonly barras = computed(() => {
    const e = this.babosa().estadisticas;
    return e
      ? [
          { etiqueta: 'Ataque', valor: e.ataque },
          { etiqueta: 'Defensa', valor: e.defensa },
          { etiqueta: 'Velocidad', valor: e.velocidad },
        ]
      : [];
  });

  protected girar() {
    this.volteada.update((v) => !v);
  }
}
