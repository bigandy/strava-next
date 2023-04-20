dev-migration:
	npx prisma migrate dev --preview-feature

run-migration:
	npx prisma migrate deploy --preview-feature

generate-schema:
	npm run generate

setup: npm-setup docker-setup

npm-setup:
	npm install

docker-setup:
	docker-compose pull

run-docker:
	docker-compose up

run-app:
	npm run dev

init: run-migration generate-schema

build: npm-setup generate-schema
