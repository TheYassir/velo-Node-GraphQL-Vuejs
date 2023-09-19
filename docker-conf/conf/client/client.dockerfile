FROM node:current-alpine3.16

COPY ./frontend /var/www/html/frontend

COPY ./entrypoint.sh /entrypoint.sh
# Grant Linux permissions and run entrypoint script
RUN chmod +x ./entrypoint.sh


RUN sh ./entrypoint.sh
