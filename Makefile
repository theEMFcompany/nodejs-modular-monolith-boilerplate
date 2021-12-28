#!/usr/bin/make -f

# Configuration vars
source_dir := src
output_dir := dist
checkfile := ./scripts/checkfile.sh

tsc := node_modules/.bin/tsc

typescript_sources := $(shell find $(source_dir) -type f -name '*.ts' -not -path '*/__*/*' -not -path '*/__tests__/*' -not -path '*/__mocks__/*' -not -path '$(source_dir)/types/*')
typescript_output := $(patsubst $(source_dir)/%.ts,$(output_dir)/%.js,$(typescript_sources))

default: scripts

tsc.pid: install
	$(tsc) --watch --preserveWatchOutput && kill -- -$$PPID & echo $$! > tsc.pid

install: package.json yarn.lock
	yarn install
	@touch -m node_modules

scripts:
	$(tsc)

watch: tsc.pid
	@make && \
	trap 'trap - SIGINT SIGTERM ERR && rm -f tsc.pid' SIGINT SIGTERM ERR && \
	chmod +x $(checkfile)
	fswatch -0 --exclude scripts/ --exclude node_modules/ --exclude .git/  --exclude dist/ $(source_dir)| xargs -0 -I % $(checkfile) %
clean:
	rm -rf $(output_dir) && rm -f *.pid

.PHONY: all watch install scripts clean
