"""API de Bajoterra: entrega el catálogo de babosas que consume el frontend en Angular."""

import json
from pathlib import Path
from typing import Literal, Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

RUTA_DATOS = Path(__file__).parent / "data" / "babosas.json"

Categoria = Literal["babosas", "malvadas", "elementales"]
Bando = Literal["buena", "malvada"]


class Estadisticas(BaseModel):
    ataque: int
    defensa: int
    velocidad: int


class Babosa(BaseModel):
    id: str
    nombre: str
    categoria: Categoria
    bando: Bando
    imagen: str
    elemento: Optional[str] = None
    # Dato corto sobre la babosa (por ejemplo, de cuál babosa es la versión ghoul)
    descripcion: Optional[str] = None
    habilidad: Optional[str] = None
    donde_se_encuentra: Optional[str] = None
    estadisticas: Optional[Estadisticas] = None
    # Ruta a la imagen o clip de la babosa transformada, por ejemplo "media/burpy.mp4"
    transformacion: Optional[str] = None
    # True cuando el dato aún no está confirmado con la serie
    por_confirmar: bool = False


class CategoriaInfo(BaseModel):
    id: Categoria
    titulo: str
    descripcion: str


CATEGORIAS = [
    CategoriaInfo(
        id="babosas",
        titulo="Babosas de Bajoterra",
        descripcion="Las babosas más conocidas del mundo subterráneo.",
    ),
    CategoriaInfo(
        id="elementales",
        titulo="Babosas Elementales",
        descripcion=(
            "Las cinco babosas elementales regulan la fuerza vital de Bajoterra y, según la "
            "leyenda, todas las babosas evolucionaron a partir de ellas. Abajo están también "
            "sus versiones ghoul."
        ),
    ),
    CategoriaInfo(
        id="malvadas",
        titulo="Babosas Malvadas",
        descripcion=(
            "Babosas ghoul: fueron corrompidas con Energía Oscura y se pueden "
            "devolver a la normalidad con babosas sanadoras o con el Lightwell."
        ),
    ),
]


def cargar_babosas() -> list[Babosa]:
    with open(RUTA_DATOS, encoding="utf-8") as archivo:
        return [Babosa(**datos) for datos in json.load(archivo)]


BABOSAS = cargar_babosas()

app = FastAPI(title="API de Bajoterra", version="0.1.0")

# Permite que Angular (en el puerto 4200 durante el desarrollo) consulte la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/categorias", response_model=list[CategoriaInfo])
def listar_categorias():
    return CATEGORIAS


@app.get("/api/babosas", response_model=list[Babosa])
def listar_babosas(
    categoria: Optional[Categoria] = Query(default=None),
    bando: Optional[Bando] = Query(default=None),
):
    resultado = BABOSAS
    if categoria:
        resultado = [b for b in resultado if b.categoria == categoria]
    if bando:
        resultado = [b for b in resultado if b.bando == bando]
    return resultado


@app.get("/api/babosas/{babosa_id}", response_model=Babosa)
def obtener_babosa(babosa_id: str):
    for babosa in BABOSAS:
        if babosa.id == babosa_id:
            return babosa
    raise HTTPException(status_code=404, detail="Babosa no encontrada")
