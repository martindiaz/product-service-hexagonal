# Imagen base oficial de Node
FROM node:18

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar TypeScript
RUN npm run build

# Exponer puerto de la app
EXPOSE 3000

# Comando para arrancar la app
CMD ["node", "dist/main.js"]