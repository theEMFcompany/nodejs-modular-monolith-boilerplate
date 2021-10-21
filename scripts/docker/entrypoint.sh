#!/bin/bash
main() {
    yarn install
    if [ "$NODE_ENV" == "development" ] 
    then
        pm2_dev
    else
        pm2_runtime
    fi
}

run_migration() {
    echo "Running DB migrations"
    node node_modules/knex/bin/cli.js migrate:rollback
    node node_modules/knex/bin/cli.js migrate:latest
}

run_db_seeders() {
    echo "Run DB seeders"
    node node_modules/knex/bin/cli.js seed:run
}

pm2_dev() {
    echo "Launching PM2 Dev Runtime"
    # rm -rf dist
    yarn run build:dev & run_migration & run_db_seeders &
    pm2-dev ecosystem-dev.json --only dev
}

pm2_runtime() {
    run_migration
    run_db_seeders
    echo "Launching PM2 Runtime"
    pm2-runtime ecosystem.json --only app
}

trap control_c SIGINT SIGTERM SIGHUP

main

exit