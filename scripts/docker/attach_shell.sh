chmod uga=rwx ./launch.sh
docker run -d -it --name apicore --mount type=bind,source="$(pwd)",target=/app -p 3001:3001 api_core