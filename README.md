# Babosas de Bajoterra

Catálogo de las babosas de Bajoterra. Al hacer click en una tarjeta se voltea y muestra su ficha
(habilidad, dónde se encuentra, estadísticas y la imagen o clip de su transformación).

- **Backend:** Python + FastAPI (`backend/`)
- **Frontend:** Angular (`frontend/`)

## Cómo correrlo

Se necesitan dos terminales, una para el backend y otra para el frontend.

**Backend** (puerto 8000):

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

La documentación automática de la API queda en http://localhost:8000/docs

**Frontend** (puerto 4200):

```bash
cd frontend
npm install
npm start
```

Abre http://localhost:4200

## Cómo agregar o completar una babosa

Todos los datos están en `backend/data/babosas.json`. Cada babosa tiene estos campos:

| Campo | Qué es |
| --- | --- |
| `id` | Identificador único, en minúsculas y sin espacios |
| `nombre` | Nombre que se muestra en la tarjeta |
| `categoria` | `babosas`, `elementales` o `malvadas` |
| `bando` | `buena` o `malvada` |
| `imagen` | Ruta de la imagen, por ejemplo `images/Burpy.webp` |
| `elemento` | Elemento de la babosa (opcional) |
| `habilidad` | Qué hace la babosa (opcional) |
| `donde_se_encuentra` | Cavernas o zonas donde vive (opcional) |
| `estadisticas` | `{ "ataque": 7, "defensa": 5, "velocidad": 8 }`, valores de 1 a 10 (opcional) |
| `transformacion` | Imagen o clip de la transformación, por ejemplo `media/burpy.mp4` (opcional) |
| `por_confirmar` | `true` muestra el aviso "Dato por confirmar" en la ficha |

Las imágenes van en `frontend/public/images` y los clips de transformación en
`frontend/public/media`. Los clips pueden ser `.mp4` o `.webm`; cualquier otra extensión se
muestra como imagen (por ejemplo `.gif` o `.webp`).

Después de editar el JSON, reinicia el backend para que lea los cambios.
