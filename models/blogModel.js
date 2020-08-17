const mongoose = require('mongoose')
const blogImageBasePath = 'assets/blog-assets'
const path = require('path')

const blogSchema = new mongoose.Schema({
    blog_title: {
        type: String,
        default: 'no title'
    },
    blog_link: {
        type: String
    },
    blog_imageName: {
        type: String,
        default: ''
    },
    blog_imageOrignalName: {
        type: String,
        default: ''
    },
    blog_imageMimeType: {
        type: String,
        default: ''
    },
    blog_primaryTag: {
        type: String,
        default: 'Nutrition'
    },
    blog_secondaryTag: {
        type: String,
        default: ''
    },
    blog_body: {
        type: String,
        default: 'no content'
    },
    blog_uploadDate: {
        type: Date,
        default: Date.now
    }
})


blogSchema.virtual('blogImagePath').get( function() {
    if (this.blog_imageName != null ) {
        return path.join('/', blogImageBasePath, this.blog_imageName ) 
    }
}) 


const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog
module.exports.blogImageBasePath = blogImageBasePath 