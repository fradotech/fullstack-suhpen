## Install & Preparation

1. Copy `.env.example` and rename to `.env`
2. Fill DB variable
3. Install dependencies

```bash
$ yarn
```

## Run

- Run server

```bash
$ yarn server:dev
```

- Run client

```bash
$ yarn client:dev
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

- Client url http://localhost:8080

- API Documentation by Swagger UI http://localhost:3000/api/v1/docs
