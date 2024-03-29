const router=require('express').Router()
const passport=require('passport')

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));


  router.get('/auth/google/callback', 
  passport.authenticate('google', {failureRedirect: 'https://social-network-webaap.vercel.app/loginFailure',successRedirect:'https://social-network-webaap.vercel.app/loginSuccessful' })
  );

module.exports=router