const express = require('express');
const router = new express.Router();
const Video = require('../models/video');
const Views = require('../models/views');

//Lists all videos in database - For frontend app
router.get('/listVideos', async (req,res) => {
    try{
        const test = await Video.get();
        res.status(200).send(test);
    } catch(e) {
        res.status(500).send(e);
    }
});

//Creates a new video
router.post('/createVideo', async (req,res) => {
    try {
        const video = await Video.createVideo(req.body);
        return res.status(201).send(video);
    } catch(e) {
        console.log(e)
        return res.status(500).send(e);
    }
});

//Tracks a view for a video
router.patch('/trackVideo/:id', async (req,res) => {
    try{
        const track = await Video.trackVideo(req.params.id);
        await Views.track(req.params.id);
        res.status(200).send();
    } catch(e) {
        res.status(404).send();
    }  
});

//Analytics for single video
router.get('/analytics/:id', async (req,res) => {
    try{
        const report = await Video.videoReport(req.params.id,req.body.date);
        res.status(200).send(report);
    } catch(e){
        res.status(500).send();
    }
});

module.exports = router;