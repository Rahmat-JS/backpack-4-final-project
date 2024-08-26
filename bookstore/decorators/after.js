module.exports = class AfterDecorators {

    static async passwordDeleterForList(result) {
        const usersList = result.data;

        usersList.forEach((Element) => {
            delete Element.body.password;
        });

        return usersList;
    }

    static async passwordDeleterForOne(result) {
        delete result.data.body.password;

        return result;
    }

    static async getConfirmedOrders(result) {

        const oerdersList = result.data
        
        const confirmedOrders = oerdersList.filter(item => item.details.confirmed);
        
        return confirmedOrders
    }
    
    static async getPublishedComments(result) {
        
        const commentsList = result.data
        
        const confirmedComments = commentsList.filter(item => item.details.published);
        
        return confirmedComments

    }
};
