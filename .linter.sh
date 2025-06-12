#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-classic-48099-fe25f592/tic_tac_toe_game
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

