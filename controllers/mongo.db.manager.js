const mongodbService = require('../services/mongo.db.serv');
const tasksConfig = require('../cofigs/tasks.mongodb.config');
const utilServ = require('../services/util.serv');
const { v4: uuidv4 } = require('uuid');
const models = require('../models/response.model');


//controller method for inserting tasks in the collection
exports.insertTask = async(req, callback) => {
    try{

        let data = [];
        req.data.forEach(d => {
          d.docId = uuidv4();
          data.push(d);
        })
  
        mongodbService.insert(data, tasksConfig.dbName, tasksConfig.collectionName)
        .then(result => {
            if(result.acknowledged) {
                models.successModel = {
                    isSuccess: result.acknowledged,
                    message: 'Successfully fetched documents',
                    result: result
                }
            }else{
                models.failModel = {
                    isSuccess: false,
                    message: 'No documents found'
                }
            }
            callback(models.resolveResponse(models.successModel, models.failModel));
        })
    }catch(e){
        console.log('Error in insert insertTask..');
        console.log(e);
    }
}


//controller method for fetching tasks list using the docId
exports.getTaskById = async(docId, callback) => {
    try{

        mongodbService.findByDocId(docId, tasksConfig.dbName, tasksConfig.collectionName)
        .then(result => {
            if(result.length > 0) {
                models.successModel = {
                    isSuccess: true,
                    message: 'Successfully fetched documents',
                    result: result
                }
            }else{
                models.failModel = {
                    isSuccess: false,
                    message: 'No documents found'
                }
            }
            callback(models.resolveResponse(models.successModel, models.failModel));
        })
    }catch(e){
        console.log('Error in getTaskById..');
        console.log(e);
    }
}

//controller for fetching list tasks without limitation
exports.getTasks = async(req, callback) => {
    try{

        mongodbService.findAll(tasksConfig.dbName, tasksConfig.collectionName)
        .then(result => {
            if(result.length > 0) {
                models.successModel = {
                    isSuccess: true,
                    message: 'Successfully fetched documents',
                    result: result
                }
            }else{
                models.failModel = {
                    isSuccess: false,
                    message: 'No documents found'
                }
            }
            callback(models.resolveResponse(models.successModel, models.failModel));
        })
    }catch(e){
        console.log('Error in getTasks..');
        console.log(e);
    }
}

//controller method for getting tasks with pagination parameter
exports.getTasksPaginated = async(req, callback) => {
    try{
        //get pagination offset by computation
        //used manual offset due to small data size
        let offset = utilServ.getPageOffset(req.page, req.limit);

        mongodbService.findAll(tasksConfig.dbName, tasksConfig.collectionName)
        .then(result => {
            if(result.length > 0) {
                models.successModel = {
                    isSuccess: true,
                    message: 'Successfully fetched documents',
                    result: result.slice(offset.start,offset.end)
                }
            }else{
                models.failModel = {
                    isSuccess: false,
                    message: 'No documents found'
                }
            }
            callback(models.resolveResponse(models.successModel, models.failModel));
        })
    }catch(e){
        console.log('Error in insert task..');
        console.log(e);
    }
}

//controller method to update tasks in collection
exports.updateTask = async(req, callback) => {
    try{

        mongodbService.update(req,tasksConfig.dbName, tasksConfig.collectionName)
        .then(result => {
            if(result.lastErrorObject.updatedExisting){
                models.successModel.isSuccess = result.lastErrorObject.updatedExisting
                models.successModel.message = 'Document successfully updated.'
                models.successModel.result = {
                  value: result.value
                }
              }else{
                models.failModel.message = 'Document update failed.'
              }

            callback(models.resolveResponse(models.successModel,models.failModel));
        })
    }catch(e){
        console.log('Error in update task..');
        console.log(e);
    }
}

//controller method for removing tasks by docId
exports.removeTaskById = async(docId, callback) => {
    try{

        mongodbService.deleteByDocId(docId, tasksConfig.dbName, tasksConfig.collectionName)
        .then(result => {
            if(result.acknowledged) {
                models.successModel = {
                    isSuccess: true,
                    message: result > 0 ? 'Successfully removed document' : 'No documents removed',
                    result: result
                }
            }else{
                models.failModel = {
                    isSuccess: false,
                    message: 'No documents found'
                }
            }
            callback(models.resolveResponse(models.successModel, models.failModel));
        })
    }catch(e){
        console.log('Error in remove task..');
        console.log(e);
    }
}
