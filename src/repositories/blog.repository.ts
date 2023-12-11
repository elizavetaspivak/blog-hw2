import {db} from "../db/db";
import {OutputBlogType} from "../models/blog/output/blog.output.models";

export class BlogsRepository {
    static getAllBlogs(): OutputBlogType[] {
        return db.blogs.map(b => ({
            id: b.id,
            name: b.name,
            description: b.description,
            websiteUrl: b.websiteUrl
        }))
    }

    static getBlogById(id: string): OutputBlogType | undefined {
        return db.blogs.find((b) => b.id === id)
    }

    static createBlog(createdData: OutputBlogType): OutputBlogType {
        db.blogs.push(createdData)

        return createdData
    }

    static updateBlog(updatedData: OutputBlogType): OutputBlogType | null {
        let blogIndex = db.blogs.findIndex(b => b.id === updatedData.id)

        if (blogIndex === -1){
            return null
        }

        db.blogs.splice(blogIndex, 1, updatedData)

        return updatedData;
    }

    static deleteBlogById(id: string): boolean | null {
        let blogIndex = db.blogs.findIndex(b => b.id === id)

        if (blogIndex === -1){
            return null
        }

        db.blogs.splice(blogIndex, 1)

        return true
    }
}