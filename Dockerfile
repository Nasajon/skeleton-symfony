FROM arquiteturansj/php:7.4-fpm-symfony5

ENV ENV "production"
USER nginx
COPY . /var/www/html/
USER root

RUN mkdir -p /var/www/html/var/cache /var/www/html/var/logs && chown -R nginx:www-data /var/www/html/var
