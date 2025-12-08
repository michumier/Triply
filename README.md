# Triply - Aplicación de Planificación de Viajes

Aplicación full-stack para planificar y gestionar viajes, construida con React + TypeScript (frontend) y ASP.NET Core (backend).

## 🚀 Cómo arrancar la aplicación

### Requisitos previos

- .NET 9.0 SDK
- Node.js (v18 o superior)
- MySQL Server
- Base de datos `triply` creada en MySQL

---

### 1️⃣ Arrancar el Backend (API)

```bash
cd server
dotnet run
```

El backend estará disponible en: **http://localhost:5222**

**Nota**: Asegúrate de que la base de datos MySQL esté corriendo y que la cadena de conexión en `server/appsettings.json` sea correcta.

---

### 2️⃣ Arrancar el Frontend (React)

En una **nueva terminal**:

```bash
cd client-triply
npm install  # Solo la primera vez
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

---

## 📁 Estructura del Proyecto

```
Triply/
├── server/              # Backend ASP.NET Core
│   ├── Controllers/     # Controladores de API
│   ├── Models/          # Modelos de datos
│   ├── Services/        # Lógica de negocio
│   ├── Data/            # DbContext y configuración
│   └── Database/        # Scripts SQL
│
└── client-triply/       # Frontend React + TypeScript
    ├── src/
    │   ├── components/  # Componentes reutilizables
    │   ├── pages/       # Páginas de la aplicación
    │   ├── context/     # Context API (Auth, etc.)
    │   └── services/    # Servicios de API
    └── public/
```

---

## 🗄️ Base de Datos

### Configurar la base de datos

1. Crea la base de datos en MySQL:

   ```sql
   CREATE DATABASE triply;
   ```

2. Ejecuta el script de migración (opcional, para crear todas las tablas):

   ```bash
   mysql -u root -p triply < server/Database/migration.sql
   ```

3. Actualiza la cadena de conexión en `server/appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "server=localhost;port=3306;database=triply;user=root;password=TU_PASSWORD;"
     }
   }
   ```

---

## 🔑 Autenticación

La aplicación usa JWT (JSON Web Tokens) para autenticación:

- Los tokens se generan en el backend al hacer login/registro
- El frontend almacena el token en localStorage
- Las peticiones autenticadas incluyen el token en el header `Authorization`

---

## 🛠️ Tecnologías Utilizadas

### Backend

- ASP.NET Core 9.0
- Entity Framework Core
- MySQL (Pomelo.EntityFrameworkCore.MySql)
- JWT Authentication
- BCrypt para hashing de contraseñas

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- Lucide React (iconos)

---

## 📝 Endpoints de API

### Autenticación

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

### Usuarios

- `GET /api/user` - Obtener todos los usuarios
- `GET /api/user/{id}` - Obtener usuario por ID

---

## 🎨 Paleta de Colores (Coastal Breeze)

- **Primary**: `#2A6F97` - Azul océano
- **Secondary**: `#61A5C2` - Azul cielo
- **Sand**: `#E9D8A6` - Arena
- **Coral**: `#EE6C4D` - Coral
- **Snow**: `#F7F9FB` - Blanco nieve

---

## 👥 Desarrollo

Para contribuir al proyecto:

1. Clona el repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Realiza tus cambios y haz commit
4. Push a tu rama y crea un Pull Request

---

## 📄 Licencia

Este proyecto es privado y está en desarrollo.
