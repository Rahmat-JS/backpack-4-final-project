const Controller = require('@partFramework/baseController');

exports.controller = class SampleController extends Controller {
  httpGet(){
    return 'Hello from PartFramework 10';
  }
};

exports.introduceToLoader = {
  config: require('./config'),
  schema: require('./schema')
};