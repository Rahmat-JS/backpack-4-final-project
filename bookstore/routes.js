module.exports = (router) => {
  router
    .setRoute('httpGet', 'sample-controller.httpGet')
    .method('GET');
};
