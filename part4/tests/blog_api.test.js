const { test, after, beforeEach } = require("node:test")
const assert = require("assert")
const supertest = require("supertest")
const mongoose = require("mongoose")
const app = require("../app")
const api = supertest(app)
listHelper = require("./list_helper.test")
const { blogsInDb } = require("../tests/list_helper.test")
const Blog = require("../models/blog")

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log("cleared")

    const blogObject = listHelper.blogs
        .map(blog => new Blog(blog))

    const promiseArray = blogObject.map(blog => blog.save())

    await Promise.all(promiseArray);

    console.log("done")
})

test("correct amount of blogs are returned in JSON format", async () => {
    console.log("entered test")
    await api.get("/api/blogs").expect(200).expect('Content-Type', /application\/json/)
})

test("POST request successfully creates a blog", async () => {
    const initialBlogs = listHelper.blogs

    const newBlog = {
        "title": "test",
        "author": "test",
        "url": "test.com",
        "likes": 1
    }

    await api.post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await blogsInDb()
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
})

test("defaults to 0 when likes property is not mentioned", async () => {
    const newBlog = {
        "title": "test",
        "author": "test",
        "url": "test.com",
    }

    await api.post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)
})

test("if title or author is missing, responde with bad request error", async () => {
    const newBlog = {
        "author": "test",
        "url": "test.com",
        "likes": 123
    }

    await api.post("/api/blogs")
        .send(newBlog)
        .expect(400)

})

test("successfully delete a blog", async () => {
    const initialBlogs = await blogsInDb();
    const blogToDelete = initialBlogs[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

    const blogsAtEnd = await blogsInDb()

    assert.strictEqual(initialBlogs.length - 1, blogsAtEnd.length);
})

test("successfully updates likes in blogs", async () => {
    const initialBlogs = await blogsInDb();
    const blogToUpdate = initialBlogs[0];

    const updatedData = { likes: blogToUpdate.likes + 10 }

    const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedData)
        .expect(200)
        .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 10);

    const blogsAtEnd = await blogsInDb();
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id);
    assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 10);
})

after(async () => {
    await mongoose.connection.close()
})
