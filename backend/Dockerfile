# 1. Базовый образ
FROM node:20

# 2. Рабочая директория
WORKDIR /app

# 3. Копируем зависимости
COPY package*.json ./

# 4. Устанавливаем зависимости
RUN npm install

# 5. Копируем исходники
COPY . .

# 6. Ставим ts-node глобально и запускаем сервер
RUN npm install -g ts-node typescript
CMD ["ts-node", "src/index.ts"]
