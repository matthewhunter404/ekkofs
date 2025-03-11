# Ekko FS Challenge project 

## Description
Challenge was to develop a system that facilitates hierarchical role-based permission
management, allowing groups of users to access other users' information based on their
roles within the organisation.

## Project setup

```bash
$ yarn install
```

## Compile and run the project
Project will require a postgres database to connect to, the easiest way to get one set up is to install Docker and then run docker compose:
```bash
# development
$ docker compose up
```

Database details can be changed by editing the .env file

Once a Postgres database is running, the rest of the project can be run locally with this command:

```bash
# development
$ yarn run start
```

