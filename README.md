# Restaurant API built using Node.js

    Refer to the package.json for the dependencies utilized.
    .env values are for my own local dev. change them as you need.

# How to use

1. `docker compose up` if you do not have postgres running in your environment. If you do, make sure it is running on 5432 or change .env values
2. run the project with `npm start`
3. use schema_creation and schema_generation.pgsql for test data population
4. for testing of redpanda and unleash, u will need to create topic and feature toggle in ur own local docker containers with the same names as the ones defined in restaurant.service.ts
5. refer to app.ts for REST methods that are available
6. Exec them from ur choice of REST API client
