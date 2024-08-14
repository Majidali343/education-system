const express= require('express')
const router = express.Router()

const {savechat ,getchats,getmessagesuser,createMessage,getchatsbusiness} = require('../Controllers/chatController');

router.route('/savemessage').post(createMessage)
router.route('/getmessages/:chatid').get(getmessagesuser)
router.route('/savechat').post(savechat)
router.route('/getchats/:id').get(getchats)
router.route('/getchatsbusiness/:id').get(getchatsbusiness)

module.exports= router;