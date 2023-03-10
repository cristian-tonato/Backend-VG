# V.GAMER

## Descripción

Página web de juegos, tipo mobile para jugar en linea.

# FRONT

-   Header -> Logo coorporativo
-   Menu -> Muestra opciones de navegacion(inicio,favoritos,busqueda,cuenta)
-   Footer -> Muestra el logo.
-   Botones:
-   Paginación-> Recibe petición del usuario e interactúa con el mismo para pasar de página.
-   Favoritos-> Al click, agraga game a lista de favotiros.
-   Comentarios->Al click solo permite hacer comentarios a usuarios logados.

### HOME

Estará compuesta de la lista de juegos.

##### Menu:

-Login.
-Mi lista de favoritos.
-Logo coorporativo.

### PAGINA DETALLES

Compuesta por descripción de juegos.

#### ⛔ Usuarios no logados:

-Podrán visualizar la lista de juegos.
-Acceder a los detalles(descripción del juego, fecha de publicación,como se juega,valoración).
-No podrá jugar.

#### ✅Usuarios logados:

-Acceso a los detalles del juego.
-Podrá jugar.
-Acceso a lista de favoritos.
-Añadir y eliminar de favoritos.
-Dejar comentarios sobre los juegos.

#### Extras

#### Menu.

-Barra de busqueda.
-Clasificación por categoria.

#### Página detalles.

-Dar valoración de juego.
-Lista de juegos similares.

# BACK

/users

-   Post —> "user/register" —> registro de usuario.
-   Post —> "user/login" —> envía el email y la contraseña
-   Delete -> "user/delete/:id" -> eliminar cuenta.
-   Patch -> Añadir/borrar de favoritos

/games

-   GetAll -> "/" -> muestra el catálogo completo.
-   Get -> "/games/:id" -> muestra la página de detalles de cada juego.

/Comments -> EXTRA

-   Get -> "/comments" -> muestra los comentarios.
-   Post -> "/comments/:id" ->Añadir comentarios.
-   Delete: -> "/comments/delete/:id" ->Borrar comentarios.
-   Patch -> "/comments/update/:id" ->Modificar comentarios.

### Modelo de datos:

/user

```
users
            id: ObjectId;
            name: string;
            surname: string;
            nickname: string;
            email: string;
            password:string;
            comments?:

```

/games

```
games

            id: ObjectId;
            title:string;
            images: string;
            description: string;
            gameUrl: string;
            creator: string;
            genre: string;
            comments:

```

/comments /EXTRAS

```
comments?

            id: ObjectId;
            title:string;
            owner:Userd;
            images: string;
            comments: string;

```

## Diseño Figma

https://www.figma.com/proto/7dPrIalmsAhc00a1NDU5UM/VG?node-id=14%3A51&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=14%3A51
