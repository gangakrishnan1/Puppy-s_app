#!/bin/sh

# Run migrations and setup
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start supervisor (runs nginx & php-fpm)
exec supervisord -c /etc/supervisord.conf
