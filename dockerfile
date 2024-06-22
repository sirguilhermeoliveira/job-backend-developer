# Use a imagem Node.js alpine como base
FROM node:14-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do aplicativo para o contêiner
COPY . .

# Compile o código do TypeScript
RUN npm run build

# Exponha a porta 3000 (ou a porta que seu servidor NestJS está ouvindo)
EXPOSE 3000

# Comando para iniciar o aplicativo quando o contêiner for iniciado
CMD ["node", "dist/main"]
