## Install & Preparationn

1. Copy `.env.example` and rename to `.env`
2. Fill DB variable
3. Install dependencies

```bash
$ yarn
```

## Run

- Run document compodoc

```bash
$ yarn server:compodoc
```

- Run server

```bash
$ yarn server
```

- Run client

```bash
$ yarn client
```

## Database

- Migration Run

```bash
$ yarn migrate
```

- Migration generate

```bash
$ yarn migrate:generate <MigrationName>
```

## Results

- Server url http://localhost:3000

- Client url http://localhost:3001

- API Documentation by Swagger UI http://localhost:3000/docs
