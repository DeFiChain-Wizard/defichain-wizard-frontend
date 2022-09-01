#!/bin/bash
cd ${APPCENTER_SOURCE_DIRECTORY}
echo "STAGE=${STAGE} CODE_PUSH_KEY=${CODE_PUSH_KEY}" >> .env
# export BUNDLE_COMMAND=webpack-bundle
npx pod-install