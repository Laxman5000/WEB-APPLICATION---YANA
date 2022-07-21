const mongoose = require('mongoose');
const subsSchema = new mongoose.Schema({
    id:{
        type: String,
        unique: true,
		required: [true, 'Please add the id'],
    },
	endpoint: {
		type: String,
		required: [true, 'Please add the endpoint'],
	},
	expirationTime: {
		type: String,
		default: null,
	},
	
	keys: {
		type: Object,
		default: {},
	},
	
});

module.exports = mongoose.model('subscription', subsSchema);
