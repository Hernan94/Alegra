# Usa una imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de la aplicación al contenedor
COPY . .

# Compila el proyecto TypeScript a JavaScript
RUN npm run build

# Expone el puerto en el que la aplicación escucha
EXPOSE 3001

# Define el comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]