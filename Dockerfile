# Declare the base image
FROM node:lts-alpine
# Build step
# 1. copy package.json and package-lock.json to /app dir
RUN mkdir /app
COPY . /app
# 2. Change working directory to newly created app dir
WORKDIR /app
# 3 . Install dependencies
# COPY ../ ./app
RUN npm i
RUN npm run build



# # 4. Copy the source code to /app dir
# # 5. Expose port 3001 on the container
EXPOSE 3001
# # 6. Run the app
CMD ["npm", "run", "preview"]