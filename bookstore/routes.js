module.exports = (router) => {
    
    
        router.prefix('api/books').setGroup(() => {
            router.setRoute('/:id', 'readById').method('GET').middleware('iDvalidation');
            router.setRoute('/', 'readAll').method('GET');
            router.setRoute('/', 'create').method('POST').middleware('validationBookCreate');
            router.setRoute('/', 'update').method('PUT').middleware('validationBookUpdate');
            router.setRoute('/:id', 'delete').method('DELETE').middleware('iDvalidation');
            router.setRoute('comments/:id', 'getComments').method('GET');
            router.setRoute('/search', 'search').method('GET');
        }).controller('book-controller');
        
        router.prefix('api/tags').setGroup(function () {
            router.setRoute('/', 'readAll').method('GET');
            router.setRoute('/:id', 'readById').method('GET');
            router.setRoute('/', 'create').method('POST').middleware('validationTagCreate');
            router.setRoute('/', 'update').method('PUT').middleware('validationTagUpdate');
            router.setRoute('/:id', 'delete').method('DELETE').middleware('iDvalidation');
        }).controller('tag-controller');

        router.prefix('api/comments').setGroup(function () {
            router.setRoute('/:id', 'getComments').method('GET').middleware('iDvalidation');
            router.setRoute('/', 'leaveComment').method('POST').middleware('validationCommentCreate');
            router.setRoute('/', 'publishedComment').method('PUT');
            router.setRoute('/:id', 'delete').method('DELETE').middleware('iDvalidation');
        }).controller('comment-controller');

        router.prefix('api/users').setGroup(function () {
            router.setRoute('/:id', 'readById').method('GET').middleware('iDvalidation');
            router.setRoute('/', 'readAll').method('GET');
            router.setRoute('/', 'create').method('POST').middleware('validationUserCreate');
            router.setRoute('/', 'update').method('PUT').middleware('validationUserUpdate');
            router.setRoute('/:id', 'delete').method('DELETE').middleware('iDvalidation');
            router.setRoute('/orders/:id', 'ordersByUserId').method('GET');
        }).controller('user-controller');

        router.prefix('api/orders').setGroup(function () {
            router.setRoute('/:id', 'readById').method('GET').middleware('iDvalidation');
            router.setRoute('/', 'readAll').method('GET');
            router.setRoute('/', 'create').method('POST').middleware('validationOrderCreate');
            router.setRoute('/', 'approval').method('PUT').middleware('validationOrderApproval');
            router.setRoute('/:id', 'delete').method('DELETE').middleware('iDvalidation');
        }).controller('order-controller');

        router.prefix('api/admin').setGroup(function () {
            router.setRoute('tables', 'getAllTables').method('GET');
            router.setRoute('tables', 'dropAllTables').method('DELETE');
        }).controller('admin-controller');
};
