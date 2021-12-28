
## Development Environment Requirements
1. Docker
## Development Steps

## Initial Setup
* `cd <project-directory>`
* `docker compose build`
* `docker compose up`

## Consequent Use
* `docker compose up`

## Commands
Run commands (eg testing) in the docker-compose service with `docker compose exec <command>`

## Migrations
Run migrations in the docker-compose service with `docker compose exec api yarn run migrate:latest`
Rollback migrations in the docker-compose service with `docker compose exec api yarn run migrate:rollback`

The Boilerplate for this project was generated on 2021-12-28 using [ts-ddd-modulith-boilerplate](https://github.com/theEMFcompany/ts-ddd-modulith-boilerplate).