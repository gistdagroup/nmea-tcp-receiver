.PHONY: build push

build:
	docker build -t gistda/nmea-tcp-receiver .

push:
	docker push gistda/nmea-tcp-receiver

default: build
