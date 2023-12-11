import {Router} from "express";
import {PostsRepository} from "../repositories/post.repository";
import {
    HTTP_RESPONSE_CODES,
    ParamType,
    RequestType,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    ResponseType
} from "../models/common";
import {OutputPostModel} from "../models/post/output/post.output.models";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {BlogsRepository} from "../repositories/blog.repository";
import {postValidation} from "../validators/post.validator";
import {UpdatePostModel} from "../models/post/input/update.post.input.models";
import {CreatePostModel} from "../models/post/input/create.post.input.models";

export const postRoute = Router({})

postRoute.get('/', (req: RequestType, res: ResponseType<OutputPostModel[]>) => {
    const posts = PostsRepository.getAllPosts()

    res.send(posts)
})

postRoute.get('/:id', (req: RequestWithParams<ParamType>, res: ResponseType<OutputPostModel>) => {
    const id = req.params.id

    const foundedPost = PostsRepository.getPostById(id)

    if (!foundedPost) {
        res.sendStatus(HTTP_RESPONSE_CODES.NOT_FOUND)
        return
    }

    res.send(foundedPost)
})

postRoute.post('/', authMiddleware, postValidation(), (req: RequestWithBody<CreatePostModel>, res: ResponseType<OutputPostModel>) => {
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const blogId = req.body.blogId

    const blog = BlogsRepository.getBlogById(blogId)

    const newPost: OutputPostModel = {
        id: new Date().toISOString(),
        title,
        shortDescription,
        content,
        blogId,
        blogName: blog!.name
    }

    const createdPost = PostsRepository.createPost(newPost)

    res.status(HTTP_RESPONSE_CODES.CREATED).send(createdPost)
})

postRoute.put('/:id', authMiddleware, postValidation(), (req: RequestWithParamsAndBody<ParamType, UpdatePostModel>, res: ResponseType<void>) => {
    const id = req.params.id

    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const blogId = req.body.blogId

    const post = PostsRepository.getPostById(id)
    const blog = BlogsRepository.getBlogById(blogId)

    if (!post) {
        res.sendStatus(HTTP_RESPONSE_CODES.NOT_FOUND)
        return;
    }

    const updatedPost: OutputPostModel = {
        id, title, shortDescription, content, blogId, blogName: blog!.name
    }

    const isUpdatePost = PostsRepository.updatePost(updatedPost)

    if (!isUpdatePost) {
        res.sendStatus(HTTP_RESPONSE_CODES.NOT_FOUND)
        return
    }

    res.sendStatus(HTTP_RESPONSE_CODES.NO_CONTENT)
})

postRoute.delete('/:id', authMiddleware, (req: RequestWithParams<ParamType>, res: ResponseType<void>) => {
    const id = req.params.id

    const post = PostsRepository.getPostById(id)

    if (!post) {
        res.sendStatus(404)
        return;
    }

    PostsRepository.deletePostById(id)

    res.sendStatus(HTTP_RESPONSE_CODES.NO_CONTENT)
})