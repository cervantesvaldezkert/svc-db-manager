const models = require('../../models/response.model');


describe('resolve model', () => {
    test('test resolve success model', () => {
        models.successModel = {
            "isSuccess": true,
            "message": "Successfully inserted documents",
            "result": {
                "acknowledged": true,
                "insertedCount": 1,
                "insertedIds": {
                    "0": "649403c70bad015bcfa92466"
                }
            }
        }

        let res = models.resolveResponse(models.successModel, models.failModel);
       
        expect(res.isSuccess).toEqual(true);   
        expect(res.message).toEqual('Successfully inserted documents');    
        expect(res.result.acknowledged).toEqual(true);   
    });
})
