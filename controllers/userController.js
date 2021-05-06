const router = require('express').Router();
const userService = require('../services/userServices');
const { checkJwt } = require('../middleware/jwtAuth');


router.get('/', checkJwt, async (req, res) => {

    // console.log(req)

    let result = await userService.getUsers();
    res.json(result) 
})


router.get('/:email', checkJwt, async (req, res) => {

    let email = req.params.email;

    let result = await userService.getSingleUser(email);
    res.json(result) 
})



router.put('/update', async (req, res) => {

    let updatedUser = req.body;
    // console.log(`this is the new user`, updatedUser);

    
    let result = await userService.updateUser(updatedUser);
    res.json(result);

})


router.post('/newuser', async (req, res) => {

    let newUser = req.body;
    // console.log(`this is the new user`, newUser);

    
    let result = await userService.createNewUser(newUser);
    res.json(result);
});



module.exports = router;