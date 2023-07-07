const {Schema} = require('mongoose');

const listSchema = Schema ({
    
    id: Number,
    list: String,
    active: Boolean

})

exports.listSchema = {listSchema}