# pull official base image
FROM node

# set working directory
RUN mkdir /usr/src/app

# copy all files to the new directory
COPY . /usr/src/app

# set workingDir
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install
RUN npm install react-scripts@3.4.1 -g --silent

# start app
CMD ["npm", "start"]