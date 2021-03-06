"use strict";

const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var professor = mongoose.model('professor_Sch');


//module.exports = updater;

exports.updateRecord = (req, res) => {
    professor.findOneAndUpdate({_id: req.body._id}, req.body, {new : true}, (err, doc) =>{
        if(!err){
            res.redirect('professor/list');
        }else{
            if (err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("professor/addOrEdit", {
                    viewTitle: 'Update Professor',
                    professor: req.body
                });
            }else{
                console.log('Error during record update: ' + err);
            }
        }
    })
}




// handle validation error
function handleValidationError(err, body) {
    for (const field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

exports.insertRecord = (req, res) => {
    var prof = new professor();


    // setting up parameters
    prof.name = req.body.name;
    prof.email = req.body.email;
    prof.course = req.body.course;
    prof.prof_id = req.body.prof_id;
    prof.schedule = req.body.schedule;
    prof.markModified('course');

    // save to the database
    prof.save((err, doc) => {
        if (!err)
            res.redirect('professor/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("professor/addOrEdit", {
                    viewTitle: "Insert Professor",
                    prof: req.body
                });
            }
            else{
                if(err.name == 'ValidationError'){
                    handleValidationError(err, req.body);
                    res.render("professor/addOrEdit", {
                        viewTitle: "Insert Professor",
                        prof: req.body
                    });
                }else{
                    console.log('Error during record insertion : ' + err);
                }
            }
        }
    });
}