module.exports = (router) => {
    
    
        router.prefix('/books').setGroup(() => {
            router.setRoute('/:id', 'book-controller.readById').method('GET').middleware('iDvalidation');
            router.setRoute('/', 'book-controller.readAll').method('GET');
            router.setRoute('/', 'book-controller.create').method('POST').middleware('validationBookCreate');
            router.setRoute('', 'book-controller.update').method('PUT').middleware('validationBookUpdate');
            router.setRoute('/:id', 'book-controller.delete').method('DELETE').middleware('iDvalidation');
            
        });
        
        router.prefix('tags').setGroup(function () {
            router.setRoute('', 'tag-controller.readAll').method('GET');
            router.setRoute('', 'tag-controller.create').method('POST').middleware('validationTagCreate');
            router.setRoute('', 'tag-controller.update').method('PUT').middleware('validationTagUpdate');
            router.setRoute('/:id', 'tag-controller.delete').method('DELETE').middleware('iDvalidation');

        });

        router.prefix('comments').setGroup(function () {
            router.setRoute('/:id', 'comment-controller.getComments').method('GET').middleware('iDvalidation');
            router.setRoute('', 'comment-controller.leaveComment').method('POST').middleware('validationCommentCreate');
            router.setRoute('/:id', 'comment-controller.delete').method('DELETE').middleware('iDvalidation');

        });

        router.prefix('users').setGroup(function () {
            router.setRoute('/:id', 'user-controller.readById').method('GET').middleware('iDvalidation');
            router.setRoute('', 'user-controller.readAll').method('GET');
            router.setRoute('', 'user-controller.create').method('POST').middleware('validationUserCreate');
            router.setRoute('', 'user-controller.update').method('PUT').middleware('validationUserUpdate');
            router.setRoute('/:id', 'user-controller.delete').method('DELETE').middleware('iDvalidation');

        });

        router.prefix('orders').setGroup(function () {
            router.setRoute('/:id', 'order-controller.readByUser').method('GET').middleware('iDvalidation');
            router.setRoute('', 'order-controller.readAll').method('GET');
            router.setRoute('', 'order-controller.create').method('POST').middleware('validationOrderCreate');
            router.setRoute('', 'order-controller.approval').method('PUT').middleware('validationOrderApproval');
            router.setRoute('/:id', 'order-controller.delete').method('DELETE').middleware('iDvalidation');
        });
};
