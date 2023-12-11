import {db} from "../db/db";
import {OutputPostModel} from "../models/post/output/post.output.models";

export class PostsRepository {
    static getAllPosts(): OutputPostModel[] {
        return db.posts.map(p => ({
            id: p.id,
            title: p.title,
            shortDescription: p.shortDescription,
            content: p.content,
            blogName: p.blogName,
            blogId: p.blogId,
        }))
    }

    static getPostById(id: string): OutputPostModel | undefined {
        return db.posts.find(p => p.id === id);
    }

    static createPost(postData: OutputPostModel): OutputPostModel {
        db.posts.push(postData)

        return postData
    }

    static updatePost(postData: OutputPostModel): OutputPostModel | null {
        let postIndex = db.posts.findIndex(p => p.id === postData.id)

        if (postIndex === -1) {
            return null
        }

        db.posts.splice(postIndex, 1, postData)

        return postData;
    }

    static deletePostById(id: string): boolean | null {
        let postIndex = db.posts.findIndex(p => p.id === id)

        if (postIndex === -1) {
            return null
        }

        db.posts.splice(postIndex, 1)

        return true
    }
}