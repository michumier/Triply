# 🌍 Triply — Plataforma de Planificación Inteligente de Viajes

Triply es una aplicación web diseñada para ayudar a los usuarios a planificar viajes personalizados de forma rápida, sencilla e inteligente. Combina preferencias del usuario con un modelo de IA alojado en HuggingFace, capaz de generar itinerarios detallados adaptados a cada experiencia.

## 🚀 Descripción General

Triply permite que cualquier usuario, tras iniciar sesión, pueda crear un viaje ajustado exactamente a sus gustos. El proceso consiste en seleccionar:

*   Un destino
*   El número de días
*   Las personas participantes
*   Los intereses clave del viaje (gastronomía, museos, fiesta, ocio, fútbol, viaje en pareja, viaje con amigos, etc.)
*   Los medios de transporte

Con esta información, Triply envía los datos a un modelo de IA que genera automáticamente un informe personalizado del viaje, el cual incluye:

*   Recomendaciones diarias de actividades
*   Restaurantes y zonas para comer
*   Sitios icónicos y lugares de interés
*   Planes adaptados al estilo del viajero
*   Sugerencias de alojamiento
*   Consejos útiles específicos del destino

Además, la plataforma cuenta con un pequeño apartado social donde los usuarios pueden ver itinerarios recientes creados por otras personas, sirviendo como inspiración para futuras aventuras.

El objetivo general de Triply es transformar el proceso de planificación de viajes en algo cómodo, intuitivo y casi instantáneo, ofreciendo al usuario itinerarios útiles sin necesidad de pasar horas buscando información en blogs o redes sociales.

## 🧩 Funcionalidades Principales

### 🔐 Autenticación
*   Login con email
*   Gestión básica de usuarios
*   Pantalla de bienvenida tras iniciar sesión

### 🏠 Pantalla Principal
*   Visualización de viajes recurrentes o recomendados
*   Buscador de ciudades
*   Mapa interactivo con destinos disponibles
*   Botón “Iniciar nuevo viaje”

### ✈️ Creación de un Nuevo Viaje
*   Selección de:
    *   Destino
    *   Número de días
    *   Número de participantes
    *   Intereses (checklist):
        *   Gastronomía
        *   Lugares icónicos
        *   Museos
        *   Fiesta
        *   Ocio
        *   Con amigos
        *   En pareja
        *   Fútbol
        *   Otros
    *   Medios de transporte
*   Proceso automático:
    *   Envío de la información al modelo de IA en HuggingFace
    *   Generación de informe personalizado
    *   Visualización del itinerario al usuario

### 👤 Pantalla de Perfil
*   Viajes ya realizados por el usuario
*   Acceso a informes generados anteriormente

### 🌐 Pantalla Social
*   Listado de viajes recientes creados por otros usuarios
*   Inspiración para nuevos viajes

### ❓ Pantalla de Ayuda
*   Preguntas frecuentes
*   Guía para crear un viaje
*   Información de soporte

## 🛠️ Requisitos Técnicos

### 🖥️ Frontend (React)
*   Diseño limpio y accesible
*   Consumo de API REST
*   Manejo de estado global
*   Mapa interactivo (Leaflet, Mapbox o Google Maps)

### ⚙️ Backend (.NET)
*   API REST con endpoints para:
    *   Autenticación
    *   Gestión de usuarios
    *   CRUD de viajes
    *   Solicitudes a HuggingFace
    *   Guardado y recuperación de itinerarios
    *   Comunicación vía HTTP con modelo de IA

### 🗄️ Base de Datos (MySQL)
*   Tablas principales:
    *   `Users`
    *   `Trips`
    *   `TripPreferences`
    *   `GeneratedReports`

## 🎯 Objetivo del Proyecto

El propósito de Triply es ofrecer una experiencia completa de planificación de viajes con un enfoque moderno y personalizado. La plataforma combina simplicidad, recomendaciones basadas en IA y un entorno social ligero para ayudar a cualquier usuario a obtener un itinerario único en cuestión de segundos.

## 📚 Tecnologías Principales

*   **Frontend**: React
*   **Backend**: .NET
*   **Base de datos**: MySQL
*   **IA**: HuggingFace (modelo generador de itinerarios)

🎨 Paleta Colores — “Coastal Breeze” (moderna, limpia, muy viajera)

Ideal si quieres una web fresca y luminosa.

Azul océano (primario): #2A6F97

Azul claro (secundario): #61A5C2

Arena suave: #E9D8A6

Coral suave (acento): #EE6C4D

Blanco nieve: #F7F9FB