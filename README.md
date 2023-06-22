svc-db-manager
a simple node express API that is built generically for multiple database integration such as
mongoDB, couchbase etc..

Configs
 > server.config.js
   holds the configuration for the server such as exposed port used and other addition server configuration that will be added
 > tasks.mongodb.config.js
   holds the configuration for mongodb connection such as database name, collection name, connectio string etc..

Models
 > response.model.js
   defines reponse model format to standardized api response as a default this would include successModel and failModel templates

Controllers
 > task.mongodb.controller.js
   collection of methods for controlling the processes that need to happen before and/or after executing the function for mongodb query
   although this controls the process it should also have minimal code and encapsulated functions using the local services, this will make the process easier to read for future developers of this project

Routes
 > mongo.db.routes.js
   this is where the exposed routes for mongodb would be listed such us /tasks/get etc.. whether get/post method
   to have stand file format it is recommended to create another for a diffent type of connection such as couchbase.db.routes.js for couchbase routes or other route functionalities

Services
 > mongo.db.serv.js
   this is the collection of methods for the querys/connection to mongodb server, each functionality(create,update,delete,read etc..) should be in a seperate function for easy manipulation of request and result
   if in case in the future another database will be integrated in this service, it would be better to create a differe .js file for the different database (ex. couchbase.db.serv.js) this would make the file less confusing for future developers of the project

Others
> .gitignore
   this is where you list the files and/or folders to be ignored by your code tracker such as git

> init-server.js
  this is the initial file or it is the first file that service will start on although can be renamed for easier understandability and debugging we should name this file as specific as possible such as boot.js,server.js or if you have a standard naming used in the company that would be highly prefered

> package-lock.json
  package-lock.json is automatically generated for any operations where npm modifies either the node_modules tree or package.json

> package.json
  package. json file contains descriptive and functional metadata about a project, such as a name, version, and dependencies. The file provides the npm package manager with various information to help identify the project and handle dependencies.

> Dockerfile
  this file will the determines how the docker image is to be built, you can browse base images on https://hub.docker.com/ and select a base image to be used based on your project's needs, for this project we will just be using a basic node-slim image

> Jenkinsfile
  if you are using jenkins as your build piple this will be the file where you put your script/configuration for build instructions and where the built project will be housed
  this will also include the configuration for your security scanning such as aquasec, nexus, polaris and such
  this may also include automated deployment instructions
  typically this is configured by your devops team

=======================================
Build image from docker file locally
docker build -t cervanteskert/svc-db-manager:<image_version>

Version Currently @ 1.0.1

=======================================
Pull currently built image from dockerhub

docker pull cervanteskert/svc-db-manager:<tag_name>

Available tags:
 - 1.0.1

========================================
Running the code locally  

Run command `npm install`
Run command `npm run dev`

========================================

This project is build as per requirement for my application in Union Digital.
Kert V. Cervantes
6.22.2023
https://www.linkedin.com/in/cervanteskert/