import mongoose from "mongoose";


const BlogSchema = new mongoose.Schema({
    title: String,
    description: String
})
console.log(mongoose.models, 'mongoose.models')
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema)

export default Blog;