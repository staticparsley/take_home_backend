const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Views = require('./views');

const VideoSchema = new Schema({
    videoName: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    viewCount: {
        type: Number,
        required: false,
        default: 0
    },
});

//Register Model
const Video = mongoose.model('Video', VideoSchema);

//Retrieves all database entries for Video
exports.get = async () => {
    const videos = await Video.find({}).sort('-publishDate');
    return videos;
}

//Creates new video document
exports.createVideo = async (data) => {
    const video = await Video.create(data);
    return video._id;
}

//Tracks video by incrementing field
exports.trackVideo = async (id) => {
    const track = await Video.findOneAndUpdate({_id: id}, { $inc: {viewCount: 1}} );
    return track;
}

//Indivual analytics on single video
exports.videoReport = async (id,date) => {
    try{
        const report = await Video.findOne({ _id: id }).select('-__v');
         if(!date) {
            return report;
         }

        const viewsSince = await Views.countViews(id,date);
         
        const fullReport = {
            report,
            viewsSince
        }
        return fullReport;
    } catch(e) {
        res.status(500).send(e);
    }
   
}