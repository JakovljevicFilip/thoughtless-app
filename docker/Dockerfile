FROM node:20

WORKDIR /app

# Copy entire project before install so postinstall works
COPY . .

RUN npm install

COPY docker/scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
