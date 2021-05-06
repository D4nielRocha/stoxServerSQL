const router = require('express').Router();
const myaccountService = require('../services/myaccountService');
const { checkJwt } = require('../middleware/jwtAuth');
const myaccountRepository = require('../repositories/myaccountRepository.js')



router.get('/:id', checkJwt, async (req, res) => {

    let id = req.params.id;
    // console.log(id);

    let result = await myaccountService.getStoxById(id);
    res.json(result) 

})


router.put('/update', async (req, res) => {

    let stox = req.body;
    // console.log(stox);

    try{

        const result = await myaccountService.updateStox(stox);
        res.json(result);

    }catch(e){
        // console.log(e.message);
        e.status(500);
        res.send(e.message);
    }
});


router.delete('/:id', checkJwt, async (req, res) => {

    let deletedStox = req.params.id;
    // console.log(deletedStox);

    try{

        const result = await myaccountService.deleteStox(deletedStox);
        res.json(result);

    }catch(e){
        // console.log(e.message);
        e.status(500);
        res.send(e.message);
    }

});


module.exports = router;


