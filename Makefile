COMPOSE := docker compose

.PHONY: up down logs psql

up:
$(COMPOSE) up --build

down:
$(COMPOSE) down --remove-orphans

logs:
$(COMPOSE) logs -f

psql:
$(COMPOSE) exec postgres psql \
-U $${POSTGRES_USER:-postgres} \
-d $${POSTGRES_DB:-futurenavigator}
