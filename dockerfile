# Etapa de construcción
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --prod

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos generados por Angular a la ubicación predeterminada de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Agregar configuraciones adicionales de Nginx si es necesario
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80 para que Nginx pueda ser accedido desde fuera del contenedor
EXPOSE 80

# Comando predeterminado para iniciar Nginx cuando se ejecute el contenedor
CMD ["nginx", "-g", "daemon off;"]
