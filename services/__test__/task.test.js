const mongodbController = require('../../controllers/mongo.db.manager');

describe('insert tasks', () => {
    test('insert valid task document', () => {
        const payload = {
            "data": [
                {
                    "schedule": "06/28/2023 03:01:38",
                    "task": "Do carwash",
                    "assigneeId": "0001",
                    "logDate":"2023-06-21T18:04:07.437Z"
                }
            ]
           
        }
        mongodbController.insertTask(payload, cb => {
            expect(cb.isSuccess).toEqual(true);
            expect(cb.result.acknowledged).toEqual(true);
            expect(cb.result.insertedCount).toEqual(1);
        });
    });
})
