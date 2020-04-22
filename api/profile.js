const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const User = require('../models/User');

// GET api/profile/me
// Get current user's profile
// Private

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', 'name');

        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.send(500).send('Server Error');
    }
});

// POST api/profile
// Create or update profile
// Private

router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const {company, website, location, bio, status, skills, youtube, facebook, twitter, instagram, linkedin } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    };

    // Build social
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id});

        if(profile){
            //Update
            profile = await Profile.findOneAndUpdate({ user: req.user.id}, { $set: profileFields}, { new: true });

            return res.json(profile);
        }
            //Create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// GET api/profile
// Get all profiles
// Public

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET api/profile/user/:user_id
// Get profile by user id
// Public

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name']);

        if(!profile){
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server Error');
    }
});

// DELETE api/profile
// DELETE profile,user and posts.
// Private

router.delete('/', auth, async (req, res) => {
    try {
        //@todo - remove user's posts
        //Remove profile
        await Profile.findOneAndRemove({user: req.params.id});
        //Remove user
        await User.findOneAndRemove({user: req.params.user_id});
        res.json({msg: 'User sucessfully removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT api/profile/experience
// Add profile experience
// Private
router.put('/experience', [auth, [
    check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','From date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const {title, company, location, from, to, current, description} = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.experience.unshift(newExp);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE api/profile/experience/:exp_id
// Delete profile experience
// Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});

        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT api/profile/education
// Add profile education
// Private
router.put('/education', [auth, [
    check('school','School is required').not().isEmpty(),
    check('degree','Degree is required').not().isEmpty(),
    check('fieldofstudy','Field of study is required').not().isEmpty(),
    check('from','From date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const {school, degree, fieldofstudy, from, to, current, description} = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.education.unshift(newExp);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE api/profile/education/:edu_id
// Delete profile education
// Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});

        // Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;