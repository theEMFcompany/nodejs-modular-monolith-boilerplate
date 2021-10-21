#!/bin/bash

main() {
    if [ "$DOCKER_RUN_BUILD" == "YES" ]
    then
        build
    fi
    if [ "$DOCKER_RUN_LAUNCH" == "YES" ]
    then
        launch
    fi
}
launch(){
    echo "Launching containers"
    docker-compose -f ./docker-compose.yml up
}
build() {
    echo "Building images from context"
    docker-compose -f ./docker-compose.yml build
}
control_c() {
    echo ""
    exit
}
trap control_c SIGINT SIGTERM SIGHUP

main

exit