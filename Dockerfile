# 1. Cambiamos de 18-alpine a 20-alpine
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Exponemos el puerto de Vite
EXPOSE 5173

# Comando para desarrollo con el host habilitado
CMD ["npm", "run", "dev", "--", "--host"]