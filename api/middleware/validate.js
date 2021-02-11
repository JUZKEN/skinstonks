const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

exports.register = (req, res, next) => {
   const { error } = Joi.object({
      username: Joi.string().alphanum().min(2).max(30).required(),
      name: Joi.string().max(50).optional(),
      email: Joi.string().min(5).max(255).required().email(),
      password: passwordComplexity(),
      confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}

exports.login = (req, res, next) => {
   const { error } = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}

exports.userUpdate = (req, res, next) => {
   const { error } = Joi.object({
      username: Joi.string().alphanum().min(2).max(30).optional(),
      name: Joi.string().max(50).optional()
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}

exports.recover = (req, res, next) => {
   const { error } = Joi.object({
      email: Joi.string().email().required()
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}

exports.resetPassword = (req, res, next) => {
   const { error } = Joi.object({
      password: passwordComplexity(),
      confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}

exports.resend = (req, res, next) => {
   const { error } = Joi.object({
      email: Joi.string().email().required()
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}

exports.revokeToken = (req, res, next) => {
   const { error } = Joi.object({
       token: Joi.string().empty('')
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}