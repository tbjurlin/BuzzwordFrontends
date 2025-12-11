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
) &

# Wait for both background processes to finish
wait