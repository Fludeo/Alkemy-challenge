# Alkemy-challenge

 Accounting app challenge

# Para correr el proyecto

La carpeta API y client son 2 apps diferentes, siendo "API" el servidor hecho en Express.js y "client" el cliente creado con ReactJS (create-react-app).

Recomiendo dejar seteado el puerto en el archivo .env en 8080,  ya que el cliente tiene definido en su package.json la configuracion "proxy": "http://localhost:8080/" 

En caso de setear otro puerto XXXX para el servidor hay que cambiar tambien la configuración del cliente a "proxy": "http://localhost:XXXX/" 

Para correr el proyecto simplemente hay que abrir 2 terminales (asegurarse de abrirlas en las respectivas carpetas), en una correr el cliente con "npm start" y en la otra correr el serrvidor con el script "npm run server"
