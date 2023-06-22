const utilServ = require('../../services/util.serv');


describe('insert tasks', () => {
    test('test page offset', () => {
        
        let res = utilServ.getPageOffset(3,20)
        expect(res.start).toEqual(39);
        expect(res.end).toEqual(59);
        
    });
})
