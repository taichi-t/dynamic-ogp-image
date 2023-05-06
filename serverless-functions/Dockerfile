FROM zenika/alpine-chrome:with-node

USER root

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# npm installを実行
RUN npm install

# ローカルのソースコードをコンテナ内にコピー
COPY . .

# ポート番号を指定
EXPOSE 8080

ENV PORT 8080

# コンテナ起動時に実行するコマンドを指定
CMD ["node", "/usr/src/app/src/index"]