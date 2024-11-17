import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: true },
    image: { type: String, required: true },
    created_at: { type: String, required: true }
}, { 
    toJSON: { virtuals: true },
    toObject: { virtuals: true }  
});

postSchema.virtual('short_description').get(function () {
    return this.description.length > 10 ? this.description.substring(0, 10) + '....' : this.description;
});

const PostModel = mongoose.models.Post || mongoose.model('Post', postSchema);

export default PostModel;
