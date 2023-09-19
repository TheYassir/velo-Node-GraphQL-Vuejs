#!/bin/sh

ROOT_DIR=/var/www/html/frontend

#echo "Replacing env constants in JS"
  #for file in $ROOT_DIR/js/app.*.js* $ROOT_DIR/index.html $ROOT_DIR/precache-manifest*.js;
#do
echo "Processing $ROOT_DIR/docker-env-conf.js";

echo "$PWD";

sed -i "s|VUE_APP_GRAPHQL_URI|${VUE_APP_GRAPHQL_URI}|g" $ROOT_DIR/docker-env-conf.js

#done
