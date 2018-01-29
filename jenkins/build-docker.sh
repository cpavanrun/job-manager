#!/bin/bash

# set -e -o pipefail

DOCKER_NAME=${DOCKER_NAME:-"jobmanager"}
REPO_NAME=${REPO_NAME:-"broadinstitute/${DOCKER_NAME}"}
SERVICE_LIST=${SERVICE_LIST:-"ui cromwell"}
COMPOSE_FILE=${COMPOSE_FILE:-"cromwell-compose-dev.yml"}
BRANCH=${BRANCH:-"master"}
TAGS=${TAGS:-""}

# set short GIT_HASH
GIT_SHORT=$(git rev-parse --short HEAD) 

# always apply git short tag
TAGS="${GIT_SHORT} ${TAGS}"

# if BRANCH is not master tag with branch name
if [ "${BRANCH}" != "master" ]
then
   # map slash to dash in branch names
   BRANCH_MAP=$(echo "${BRANCH}" | tr '/' '-')
   TAGS="${BRANCH_MAP} ${TAGS}"
fi

# find a way to determine if this commit is "git tagged" and add git tag to TAGS

# run docker-compose build
docker-compose -f ${COMPOSE_FILE} -p ${DOCKER_NAME} build

# if builds were clean.  

for tag in ${TAGS}
do
  for service in ${SERVICE_LIST}
  do
     docker tag ${DOCKER_NAME}_${service}:latest ${REPO_NAME}_${service}:${tag}
     docker push ${REPO_NAME}_${service}:${tag}
  done
done

exit 0
# clean up built/tagged docker 
for service in ${SERVICE_LIST}
do
   docker rmi ${DOCKER_NAME}_${service}:latest 
   for tag in ${TAGS}
   do
      docker rmi ${REPO_NAME}_${service}:${tag}
   done
done

exit 0
