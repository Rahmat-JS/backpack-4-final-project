module.exports = (router) => {
    
    
        router.prefix('/books').setGroup(() => {
            router.setRoute('/:id', 'book-controller.readById').method('GET');
            router.setRoute('/', 'book-controller.readAll').method('GET');
            router.setRoute('/', 'book-controller.create').method('POST')
                .middleware('validationBook');
            router.setRoute('', 'book-controller.update').method('PUT');
            router.setRoute('/:id', 'book-controller.delete').method('DELETE');
            
        });
        
        router.prefix('tags').setGroup(function () {
            router.setRoute('', 'tag-controller.readAll').method('GET');
            router.setRoute('', 'tag-controller.create').method('POST');
            router.setRoute('', 'tag-controller.update').method('PUT');
            router.setRoute('/:id', 'tag-controller.delete').method('DELETE');

        });

        router.prefix('comments').setGroup(function () {
            router.setRoute('/:id', 'comment-controller.getComments').method('GET');
            router.setRoute('', 'comment-controller.leaveComment').method('POST');
            router.setRoute('/:id', 'comment-controller.delete').method('DELETE');

        });

        router.prefix('users').setGroup(function () {
            router.setRoute('/:id', 'user-controller.readById').method('GET');
            router.setRoute('', 'user-controller.readAll').method('GET');
            router.setRoute('', 'user-controller.create').method('POST');
            router.setRoute('', 'user-controller.update').method('PUT');
            router.setRoute('/:id', 'user-controller.delete').method('DELETE');

        });

        router.prefix('orders').setGroup(function () {
            router.setRoute('/:id', 'order-controller.readByUser').method('GET');
            router.setRoute('', 'order-controller.readAll').method('GET');
            router.setRoute('', 'order-controller.create').method('POST');
            router.setRoute('', 'order-controller.approval').method('PUT');
            router.setRoute('/:id', 'order-controller.delete').method('DELETE');
        });
};
