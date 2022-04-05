#!/bin/sh

rm -rf ./dist
yarn codegen
yarn build
docker-compose pull
docker-compose up
