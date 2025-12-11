#!/bin/bash

# Start FlowerSSOFrontend
(
    cd FlowerSSOFrontend || exit
    npm install
    npm run dev
) &

# Start BRLFrontend
(
  cd BRLFrontend || exit
  npm install
  npm run dev
  echo "BRL Frontend launched."
) &

# Wait for both background processes to finish
wait