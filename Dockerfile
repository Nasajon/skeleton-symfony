FROM nasajon/php:7.1-fpm-symfony
MAINTAINER Jefferson Santos <jeffersonsantos@nasajon.com.br>

ENV ENV "production"
USER nginx
COPY . /var/www/html/
USER root

RUN cp app/config/parameters.docker.dist app/config/parameters.yml && \
    chmod 777 -R /var/www/html/app/cache
