module.exports = (router) => {
    
    
        router.prefix('/books').setGroup(() => {
            router.setRoute('/:id', 'book-controller.readById').method('GET');
            router.setRoute('/', 'book-controller.readAll').method('GET');
            router.setRoute('/', 'book-controller.create').method('POST');
            router.setRoute('', 'book-controller.update').method('PUT');
            router.setRoute('/:id', 'book-controller.delete').method('DELETE');
            
        });
        
        router.prefix('tags').setGroup(function () {
            router.setRoute('', 'tagController.readAll').method('GET');
            router.setRoute('', 'tagController.create').method('POST');
            router.setRoute('', 'tagController.update').method('PUT');
            router.setRoute('/:id', 'tagController.delete').method('DELETE');

        });

        router.prefix('comments').setGroup(function () {
            router.setRoute('/:id', 'commentController.getComments').method('GET');
            router.setRoute('', 'commentController.leaveComment').method('POST');
            router.setRoute('/:id', 'commentController.delete').method('DELETE');

        });

        router.prefix('users').setGroup(function () {
            router.setRoute('/:id', 'userController.readById').method('GET');
            router.setRoute('', 'userController.readAll').method('GET');
            router.setRoute('', 'userController.create').method('POST');
            router.setRoute('', 'userController.update').method('PUT');
            router.setRoute('/:id', 'userController.delete').method('DELETE');

        });

        router.prefix('orders').setGroup(function () {
            router.setRoute('/:id', 'orderController.readByUser').method('GET');
            router.setRoute('', 'orderController.readAll').method('GET');
            router.setRoute('', 'orderController.create').method('POST');
            router.setRoute('', 'orderController.approval').method('PUT');
            router.setRoute('/:id', 'orderController.delete').method('DELETE');
        });
};
