import express from "express";
import {blogRoute} from "./routes/blog.route";
import {deleteAllDataRoute} from "./routes/testing.route";
import {postRoute} from "./routes/post.route";

export const app = express()

app.use(express.json())

app.use('/testing/all-data', deleteAllDataRoute)
app.use('/blogs', blogRoute)
app.use('/posts', postRoute)