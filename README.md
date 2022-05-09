# Alkemy-challenge

 Accounting app challenge

# Para correr el proyecto

La carpeta API y client son 2 apps diferentes, siendo "API" el servidor hecho en Express.js y "client" el cliente creado con ReactJS (create-react-app).

Recomiendo dejar seteado el puerto en el archivo .env en 8080,  ya que el cliente tiene definido en su package.json la configuracion "proxy": "http://localhost:8080/" 

En caso de setear otro puerto XXXX para el servidor hay que cambiar tambien la configuración del cliente a "proxy": "http://localhost:XXXX/" 

Para correr el proyecto simplemente hay que abrir 2 terminales (asegurarse de abrirlas en las respectivas carpetas) e instalar las 2 apps con "npm install", luego correr el cliente con "npm start" y en la otra correr el servidor con el script "npm run server"

# Detalles

Frontend realizado con ReactJS, TypeScript , CSS para estilos y React-icons

Backend realizado con Express.js , rsdi (paquete para lograr inyección de dependencias) y el ORM Sequelize (sqlite).

Sesiones ,Login y Autenticación implementadas con jsonwebtoken  (access and refresh token strategy)

El proyecto tiene una arquitectura MVC Donde las vistas las provee el cliente que a su vez se comunica con el Modelo a traves de los controladores mediante http Requests y Responses. 
Nótese que esta comunicación es siempre unidireccional es decir, siempre avanza hacia capas mas profundas y cuando vuelve, vuelve siempre hacia capas mas superficiales:

Cliente(View)--Request--->Controller---method--->Services---method-->Repository---Model--->DB

DB---data--->Repository----data---->Service----data----->Controller----Response---->Cliente(View)

En el archivo  DIconfig.js en la carpeta API/src/config  estan resueltas todas las dependencias del proyecto.  

# Lo que quedó sin hacer

Tests unitarios (jest), Test integradores (cypress).

Mejoras minimas en en UI para mejor UX  (ej: Al tener éxito cuando se crea un usuario, no hay feedback, solo se cierra el formulario.)

Crear custom hooks o funciones en archivos a parte para agregar cache y hacer Fetchs mas limpios 

Agregar otra base de datos mas robusta que sqlite, cuando en el .env la configuración está en producción (MySQL)
 
