#!/bin/sh
set -e

if [ -n "$DB_SSL_CA_B64" ]; then
    printf '%s' "$DB_SSL_CA_B64" | base64 -d > /tmp/aiven-ca.pem
    export MYSQL_ATTR_SSL_CA=/tmp/aiven-ca.pem
fi

php artisan config:clear
php artisan migrate --force
php artisan db:seed --force
php artisan config:cache

exec php artisan serve --host=0.0.0.0 --port="${PORT:-10000}"