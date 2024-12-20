const Blog = require("../models/blog")

const dummy = () => {
    return 1
}

const favBlog = (blogs) => {
    let favorite = blogs[0].likes
    let favIndex = 0
    for (i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > favorite) {
            favorite = blogs[i].likes
            favIndex = i;
        }
    }
    return blogs[favIndex]
}
//

const total_likes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};
//

const mostBlogs = (blogs) => {
    const authorsAndLikes = {}

    blogs.forEach(blog => {
        if (authorsAndLikes[blog.author]) {
            authorsAndLikes[blog.author] += blog.likes
        } else {
            authorsAndLikes[blog.author] = blog.likes
        }
    })

    const authors = Object.keys(authorsAndLikes)
    const likes = Object.values(authorsAndLikes)

    let maxLike = 0;
    let maxLikeIndex = null;

    for (let i = 0; i < likes.length; i++) {

        if (likes[i] > maxLike) {
            maxLike = likes[i]
            maxLikeIndex = i
        }

    }

    let favAuthor = authors[maxLikeIndex]

    const blogsByFavAuthor = blogs.filter(blog => blog.author === favAuthor)

    let favAuthorBlogCount = blogsByFavAuthor.length;

    return { author: favAuthor, blogs: favAuthorBlogCount }
};
//

const mostLikes = (blogs) => {
    const authorsAndLikes = {}

    blogs.forEach(blog => {
        if (authorsAndLikes[blog.author]) {
            authorsAndLikes[blog.author] += blog.likes
        } else {
            authorsAndLikes[blog.author] = blog.likes
        }
    })

    const authors = Object.keys(authorsAndLikes)
    const likes = Object.values(authorsAndLikes)

    let maxLike = 0;
    let maxLikeIndex = null;

    for (let i = 0; i < likes.length; i++) {

        if (likes[i] > maxLike) {
            maxLike = likes[i]
            maxLikeIndex = i
        }

    }

    let favAuthor = authors[maxLikeIndex]

    const blogsByFavAuthor = blogs.filter(blog => blog.author === favAuthor)

    let favAuthorBlogCount = blogsByFavAuthor.length;

    return { author: favAuthor, likes: maxLike }
};

module.exports = { dummy, favBlog, total_likes, mostBlogs, mostLikes }