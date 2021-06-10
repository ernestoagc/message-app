#!/bin/bash
sed "s/\s\s*/DOCKER_APPLICATION_IMAGE/$1/g" deployment.yaml > deployment-frontend.yaml
