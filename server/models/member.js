import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Create Schema
const MemberSchema = new mongoose.Schema(
    {
        writer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        name: {
            type: String,
            maxlength: 50,
        },
        camera: {
            type: String,
        },
        age: {
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
            default: [],
        },
        sex: {
            type: Number,
            default: 1,
        },
        views: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);


MemberSchema.plugin(mongoosePaginate);

const Member = mongoose.model('member', MemberSchema);

export default Member;
