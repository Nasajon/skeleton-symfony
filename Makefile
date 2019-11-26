.PHONY: config_common composer_install yarn_install start db_migrate

config_common:
	cp common.env.dist common.env

composer_install:
	composer install --ignore-platform-reqs --no-scripts

yarn_install:
	yarn install

start:
	docker-compose up -d

check_db_up: 
	@for i in `seq 1 5`; do \
		if (docker-compose exec postgres sh -c 'psql -U bancosweb -d integratto2 -c "select 1;"' 2>&1 > /dev/null) then break; \
		else echo "postgres initializing..."; sleep 5; fi \
	done

db_migrate:
	make check_db_up
	@while true; do \
		if (docker-compose exec postgres bash -c 'psql -qAt -U bancosweb -d integratto2	 -c "SELECT count(*) FROM pg_stat_activity where state IS NOT NULL" > /tmp/count && if grep -q "1" /tmp/count ;then true; else false; fi') then break; \
		else echo "postgres initial script still running..."; sleep 5; fi \
	done
	docker-compose exec app app/console doctrine:migration:migrate --no-interaction

permission:
	sudo chmod -R 777 var/cache
	sudo chmod -R 777 var/logs

transform:
	docker-compose run --rm php-node

run:
	make config_common
	make composer_install
	make yarn_install
	make start
	make db_migrate
	make permission
	make transform
