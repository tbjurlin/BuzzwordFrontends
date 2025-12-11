#!/bin/bash

./startFlowerSSO.sh &
echo "Flower SSO Frontend launched." &
./startFrontEnd.sh &
echo "BRL Frontend launchd."