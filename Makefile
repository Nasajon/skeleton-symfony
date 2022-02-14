.PHONY: run final_test config_common composer_install transformer tests database generate_migration migrate clean down start_application end_alert bash run_no_test

run:	config_common composer_install transformer migrate start_application end_alert

run_no_test: config_common composer_install transformer migrate start_application end_alert

final_test: clean run tests

config_common:
	cp .env .env.dev

composer_install:
	composer install --ignore-platform-reqs --no-scripts

mda4:
	docker-compose run --rm  mda4

transformer:
	docker-compose run --rm  transformer

build:
	docker-compose run --rm  mda4
	docker-compose run --rm  transformer

tests:
	docker-compose exec app vendor/bin/codecept run functional $(test) --fail-fast

generate_migration:
	docker-compose exec app php bin/console doctrine:migration:generate

migrate:	database
	docker-compose up -d app
	docker-compose exec postgres sh -c 'while ! pg_isready -U $POSTGRES_USER -h postgres; do echo "postgres initial script still running..."; sleep 5; done'
	docker-compose exec app php bin/console --no-interaction doctrine:migrations:migrate

database: 
	docker-compose up -d postgres

clean:
	docker-compose down
	sudo rm -rf vendor/
	sudo rm -rf mda/Nasajon/MDABundle

down:
	docker-compose down

start_application:
	docker-compose up -d app

end_alert:
	notify-send 'Api' 'Aplicação Iniciada'

bash:
	docker-compose run --rm app sh