#!/usr/bin/env bash
set -euo pipefail

cd /var/www/html

PORT="${PORT:-10000}"

php artisan config:clear

echo "Running migrations..."
php artisan migrate --force

echo "Creating/updating default users..."
php artisan db:seed --force

php artisan config:cache

echo "Listen ${PORT}" > /etc/apache2/ports.conf

sed "s/__PORT__/${PORT}/g" \
    /etc/apache2/sites-available/000-default.conf.template \
    > /etc/apache2/sites-available/000-default.conf

exec apache2-foreground