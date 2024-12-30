# SwiftDex API

SwiftDex API es un servicio RESTful diseñado para gestionar usuarios, categorías, tareas, etiquetas, recordatorios y un historial de actividades. Este proyecto utiliza **Node.js** con **Express** y **Sequelize** para interactuar con una base de datos **MySQL**.

---

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints Disponibles](#endpoints-disponibles)
  - [Usuarios](#usuarios)
  - [Categorías](#categorías)
  - [Tareas](#tareas)
  - [Etiquetas](#etiquetas)
  - [Recordatorios](#recordatorios)
  - [Historial](#historial)
- [Autenticación](#autenticación)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

---

## Requisitos

- **Node.js** (versión 14 o superior)
- **MySQL** (versión 8 o superior)
- NPM o Yarn

---

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/swiftdex-api.git
   cd swiftdex-api
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura el archivo `.env` con tus credenciales de base de datos y clave JWT:

   ```env
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=swiftdex
   DB_PORT=3306
   JWT_SECRET=tu_clave_secreta
   PORT=3000
   ```

4. Ejecuta las migraciones para crear las tablas en la base de datos:

   ```bash
   npm run migrate
   ```

5. Inicia el servidor:

   ```bash
   npm start
   ```

6. Accede a la API desde: `http://localhost:3000`

---

## Uso

### Ejecutar en modo desarrollo

```bash
npm run dev
```

### Ejecutar pruebas (si están configuradas)

```bash
npm test
```

---

## Estructura del Proyecto

```
SwitfDexAPI/
├── config/
│   └── database.js   # Configuración de Sequelize
├── controllers/      # Lógica de cada modelo
├── middlewares/      # Middleware de autenticación
├── models/           # Modelos de Sequelize
├── routes/           # Rutas de la API
├── migrations/       # Migraciones para la base de datos
├── .env              # Variables de entorno
├── server.js         # Configuración del servidor
└── package.json      # Configuración del proyecto
```

---

## Endpoints Disponibles

### Usuarios

- **POST /api/usuarios/signup**: Crear un nuevo usuario.
- **POST /api/usuarios/login**: Iniciar sesión y obtener un token.

### Categorías

- **POST /api/categorias**: Crear una nueva categoría.
- **GET /api/categorias**: Obtener todas las categorías del usuario autenticado.
- **PUT /api/categorias/:id_categoria**: Actualizar una categoría.
- **DELETE /api/categorias/:id_categoria**: Eliminar una categoría.

### Tareas

- **POST /api/tareas**: Crear una nueva tarea.
- **GET /api/tareas**: Obtener todas las tareas del usuario.
- **PUT /api/tareas/:id_tarea**: Actualizar una tarea.
- **DELETE /api/tareas/:id_tarea**: Eliminar una tarea.

### Etiquetas

- **POST /api/etiquetas**: Crear una nueva etiqueta.
- **GET /api/etiquetas**: Obtener todas las etiquetas del usuario.
- **PUT /api/etiquetas/:id_etiqueta**: Actualizar una etiqueta.
- **DELETE /api/etiquetas/:id_etiqueta**: Eliminar una etiqueta.

### Tarea_Etiqueta

- **POST /api/tarea-etiqueta**: Asignar una etiqueta a una tarea.
- **DELETE /api/tarea-etiqueta**: Quitar una etiqueta de una tarea.

### Recordatorios

- **POST /api/recordatorios**: Crear un nuevo recordatorio para una tarea.
- **GET /api/recordatorios/:id_tarea**: Obtener recordatorios de una tarea.
- **DELETE /api/recordatorios/:id_recordatorio**: Eliminar un recordatorio.

### Historial

- **GET /api/historial/:id_tarea**: Obtener el historial de cambios de una tarea.

---

## Autenticación

Se utiliza **JWT** (JSON Web Tokens) para proteger los endpoints. El token se incluye en el encabezado `Authorization` de las solicitudes:

```
Authorization: Bearer <token>
```

---

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript.
- **Express**: Framework para construir aplicaciones web y APIs.
- **Sequelize**: ORM para interactuar con la base de datos.
- **MySQL**: Sistema de gestión de bases de datos relacional.
- **JWT**: Manejo de autenticación basada en tokens.
- **Bcrypt**: Encriptación de contraseñas.

---

## Contacto

Desarrollado por Felipe de Jesús Duarte Castillo
Correo: fduartecastillo2@gmail.com
Portafolio: https://felipeduarte2.netlify.app/
