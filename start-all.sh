#!/bin/bash

echo "Создание общей сети (если ещё не существует)"
docker network inspect shared-network >/dev/null 2>&1 || \
  docker network create shared-network

echo "Запуск auth-сервера"
cd $AUTH_SERVER_PATH
docker compose up -d

echo "Запуск MongoDB"
cd $MONGODB_SERVER_PATH
docker compose up -d

echo "Запуск FrontEnd"
cd $FRONT_END_PATH
docker compose up -d

echo "Запуск BackEnd"
cd $BACK_END_PATH
docker compose up -d
