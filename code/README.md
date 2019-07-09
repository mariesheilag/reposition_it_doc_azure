# Reposition.it

Run the services monolith via

```
$ nodemon --exec ts-node -- --files compose/api.ts
```

Run the ui via

```
$ nodemon --exec ts-node -- --files compose/ui.ts
```

Create a distribution

```
$ ./ci/build-dist.sh
$ cd dist

# ensure that a .env is available in that `dist` folder

$ node compose/api.js
```

Migrate DB to latest schema

```
npm run migrate:latest
```

Rollback DB

```
npm run migrate:rollback
```

Seed DB

```
npm run seed:run
```
