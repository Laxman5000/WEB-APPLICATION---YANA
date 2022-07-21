/** @format */


const asyncHandler = require('./async');
const User = require('../model/userModel');
const ErrorResponse = require('./utils/errorHandler');
const Todo = require('../model/todoModel');
require('dotenv').config('./env');


// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Admin
exports.saveTodoBulk = asyncHandler(async (req, res, next) => {
	
	const todo = req.body;
    let todoExist = null;
    todo.map(async (todo) => {
        try {
            todoExist = await Todo.findOne({ id: todo.id });
        } catch (error) {
            console.log(error)
            return next(new ErrorResponse(error, 400));
        }
        if(todo.title === "" || todo.title === null || todo.title === undefined) {
		return next(new ErrorResponse('Please fill all the fields', 400));
	}
    if (!todoExist) {

        try {
            await Todo.create(todo);
        } catch (error) {
            console.log(error)
            return next(new ErrorResponse(error, 400));
        }
	}
    })
    const tolistDB = await Todo.find({user: req.user.id});
    res.status(200).json(tolistDB).send();
});


exports.saveTodo = asyncHandler(async (req, res, next) => {
	
	const todo = req.body;
	todo.user = req.user.id;
        if(todo.title === "" || todo.title === null || todo.title === undefined) {
		return next(new ErrorResponse('Please fill all the fields', 400));
	}
        try {
            await Todo.create(todo);
        } catch (error) {
            console.log(error)
            return next(new ErrorResponse(error, 400));
        }
    const tolistDB = await Todo.find({user: req.user.id});
    res.status(200).json(tolistDB).send();
});

exports.getTodoByUser = asyncHandler(async (req, res, next) => {
    const tolistDB = await Todo.find({user: req.user.id});
    res.status(200).json(tolistDB);
});

exports.deleteTodo = asyncHandler(async (req, res, next) => {
    const todo = await Todo.findOne({ id: req.body.id });
    if(!todo) {
        return next(new ErrorResponse('Todo not found', 404));
    }
    await Todo.findOneAndDelete({ id: req.body.id });
    const tolistDB = await Todo.find({user: req.user.id});
    res.status(200).json({
        success: true,
        data: tolistDB
    });
})






