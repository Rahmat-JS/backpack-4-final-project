module.exports = (router) => {

        router.prefix('api/books').setGroup(() => {
            router.setRoute('/:id', 'readById').method('GET');
            router.setRoute('/', 'readAll').method('GET');
            router.setRoute('/', 'create').method('POST');
            router.setRoute('/', 'update').method('PUT');
            router.setRoute('/:id', 'delete').method('DELETE');
            router.setRoute('comments/:id', 'getComments').method('GET');
            router.setRoute('/search', 'search').method('GET');
        }).controller('book-controller');
        
        router.prefix('api/tags').setGroup(function () {
            router.setRoute('/', 'readAll').method('GET');
            router.setRoute('/:id', 'readById').method('GET');
            router.setRoute('/', 'create').method('POST');
            router.setRoute('/', 'update').method('PUT');
            router.setRoute('/:id', 'delete').method('DELETE');
        }).controller('tag-controller').middleware('replaceSpaces').validate();

        router.prefix('api/comments').setGroup(function () {
            router.setRoute('/', 'getAllComments').method('GET');
            router.setRoute('/:id', 'getCommentById').method('GET');
            router.setRoute('/', 'leaveComment').method('POST');
            router.setRoute('/', 'publishedComment').method('PUT');
            router.setRoute('/:id', 'delete').method('DELETE');
        }).controller('comment-controller').validate();

        router.prefix('api/users').setGroup(function () {
            router.setRoute('/:id', 'readById').method('GET');
            router.setRoute('/', 'readAll').method('GET');
            router.setRoute('/', 'create').method('POST');
            router.setRoute('/', 'update').method('PUT');
            router.setRoute('/:id', 'delete').method('DELETE');
            router.setRoute('/orders/:id', 'ordersByUserId').method('GET');
        }).controller('user-controller').middleware('replaceSpaces').validate();

        router.prefix('api/orders').setGroup(function () {
            router.setRoute('/:id', 'readById').method('GET');
            router.setRoute('/', 'readAll').method('GET');
            router.setRoute('/', 'create').method('POST');
            router.setRoute('/', 'approval').method('PUT');
            router.setRoute('/:id', 'delete').method('DELETE');
        }).controller('order-controller').validate();

        router.prefix('api/admin').setGroup(function () {
            router.setRoute('tables', 'getAllTables').method('GET');
            router.setRoute('tables', 'createAllTables').method('POST');
            router.setRoute('tables', 'dropAllTables').method('DELETE');
        }).controller('admin-controller');
};
