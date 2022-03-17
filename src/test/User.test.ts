import User from "../Models/User.model";

describe("User", ()=>{
    it('should return User', function(){
        let user=new User();
        expect(User.find());
    })
});