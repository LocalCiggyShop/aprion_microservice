FROM node:18.14.1
WORKDIR /app

# COPY package.json
COPY ./package.json ./

# generated prisma files
COPY prisma ./prisma/

RUN npm i
RUN npx prisma generate
COPY . .
CMD ["npm", "run", "start"]