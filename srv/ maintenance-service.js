/* Main implementation file for handling chat */
const cds = require('@sap/cds');
const request = require('request-promise-native');

const { INSERT, SELECT, UPDATE } = cds.ql;
// Helper method to get the current timestamp
function getCurrentTimestamp() {
    return new Date().toISOString();
}

module.exports = function () {


    this.on('createReq', async (req) => {
        const { Notices } = this.entities;
        const { noticeId, equipment, location, conversationID } = req.data;
        // const currentTimestamp = getCurrentTimestamp();
        const noticesEntry = {
            "ID": noticeId,
            "equipment": equipment,
            "location": location,
            "cID": conversationID

        };
        const conversationInsertStatus = await INSERT.into(Notices).entries([noticesEntry]);
        if (!conversationInsertStatus) {
            throw new Error("Insertion of conversation into db failed!");
        };

    });
    // this.on('chatCompletion', async (req) => {
    //     try {
    //         console.log("request ==========" + req.data);
    //         const { messages } = req.data;
    //         const chatClient = new AzureOpenAiChatClient('gpt-4o');
    //         const response = await chatClient.run({
    //             messages: [
    //                 {
    //                     role: 'user',
    //                     content: messages
    //                 }
    //             ]
    //         });

    //         const responseContent = response.getContent();
    //         console.log("response ==========" + responseContent);
    //         return responseContent;
    //     } catch (error) {
    //         console.log('Error while generating response for ai call:', error);
    //         throw error;
    //     }

    // });
    this.on('uploadImage', async (req) => {
        try {
            console.log("request ==========" + req.data)
            const options = {
                url: 'http://165.192.137.163:5000/api',
                json: true,
                body: req.data
            };
            let aiResult = await request.post(options);
            const response = { "message": JSON.stringify(aiResult) };
            console.log("response ==========" + response)
            return response;
        } catch (error) {
            console.log('Error while generating response for user query:', error);
            throw error;
        }
    });

}