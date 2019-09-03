const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewsSchema = new Schema({
    videoId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Video'
    },
    time: {
        type: Date,
        default: Date.now
    }
});

//Register Model
const Views = mongoose.model('Views', viewsSchema);

//Tracks Video
exports.track = async (id) => {
    try{
        const track = await Views.create({videoId: id});
        return track;
    } catch(e) {
        return e;
    }
}

//Counts view documents - seperate from viewCount in Video Model
exports.countViews = async (id,date) => {
    let count;
    try{
        if(!date) {
            count = await Views.countDocuments({videoId: id});
        } else{
            count = await Views.countDocuments({videoId: id, time: { $gte: date}});
        }
        return count;
    }catch(e) {
        return e;
    }
}

