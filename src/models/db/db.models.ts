import {OutputBlogType} from "../blog/output/blog.output.models";
import {OutputPostModel} from "../post/output/post.output.models";

export type DBType = {
    blogs: OutputBlogType[]
    posts: OutputPostModel[]
}