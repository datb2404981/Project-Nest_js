# Dùng Node bản nhẹ
FROM node:20-alpine

# Thư mục làm việc trong container
WORKDIR /app

# Copy file package trước để tận dụng cache
COPY package*.json ./

# Cài deps
RUN npm install

# Copy toàn bộ source vào container
COPY . .

# Build Nest ra thư mục dist
RUN npm run build

# Container sẽ lắng nghe port 3000
EXPOSE 8080

# Chạy Nest ở mode production
CMD ["npm", "run", "start:prod"]