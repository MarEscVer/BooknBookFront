#for dev
# Etapa de desarrollo
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Agregar la configuración para que Angular escuche en todas las interfaces
CMD ["npm", "start", "--", "--host", "0.0.0.0"]


#for prod
#FROM node:16-alpine AS build
#WORKDIR /app

#COPY . .
#RUN npm install
#RUN npm run build
# Serve Application using Nginx Server
#FROM nginx:alpine
#COPY --from=build /app/dist/project-name/ /usr/share/nginx/html
#EXPOSE 80
