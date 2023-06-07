# Define a imagem base
FROM node:14-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código fonte para o diretório de trabalho
COPY . .

# Expõe a porta em que o servidor do Nest.js está executando
EXPOSE 3000

# Inicia o servidor do Nest.js
CMD ["npm", "run", "start:dev"]
