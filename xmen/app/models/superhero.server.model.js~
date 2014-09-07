'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Superhero Schema
 */
var SuperheroSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Superhero name',
		trim: true
	},
	superpower: {
	type: String,
	default: '',
	trim: true
	},
	sat_math_score: {
	type: Number,
	default: -1
	},
	sat_reading_score: {
	type: Number,
	default: -1
	},
	sat_writing_score: {
	type: Number,
	default: -1
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Superhero', SuperheroSchema);
