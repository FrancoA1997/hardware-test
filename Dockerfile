# Usa una imagen base de Node.js para la fase de construcción
FROM node:22-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración y manifiestos de dependencia
COPY package.json package-lock.json ./

# Instala las dependencias de producción
RUN npm install

# Copia todo el código de la aplicación
COPY . .

# Construye la aplicación de Next.js

RUN npm run build

# Usa una imagen base de Node.js más ligera para la fase de producción
FROM node:22-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo la salida "standalone" de la fase de construcción
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expone el puerto 3000
EXPOSE 3000



# Comando para iniciar la aplicación
CMD ["node", "server.js"]