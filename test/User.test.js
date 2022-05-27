import User from "../Models/User.model";
//aaaaaaaaaaaaaaaaaaaaaa
describe("User", ()=>{
    it('should return User', function(){
        let user=new User();
        expect(User.find());
    })
});
//aaaaaa