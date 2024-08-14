 import Post from "../models/Post.js";
import { errorHandller } from "../utils/ErrorHandller.js";

export const getPosts = async (req, res) => {
    try {
        try {
            let queryRes;
            const keyWord = req.query.keyWord;
            if (keyWord){
                queryRes = await Post.find({
                    medicine: { $regex: keyWord, $options: "i" },
                });
                if(!queryRes.length)
                    queryRes = await Post.find({
                discretion: { $regex: keyWord, $options: "i" },
            });
        }
            else queryRes = await Post.find({});
            res.status(200).send(queryRes);
        } catch (error) {
            res.status(500).json(error);
        }
    } catch (error) {
        errorHandller(error, res);
    }
};


export const create =  async (req,res)=>{
    try {
        const {
            medicine,
            discretion,
            price,
            // category,
            images
            }= req.body
        const owner = req.app.locals.pharmaId;
        let payload = {
            medicine,
            discretion,
            price,
            // category,
            owner };
            console.log(payload);
        if (images) {
            let imagesPath= [];
            images.map((image) => {
                imagesPath.push(`/pictures/posts/${image}`);
            });
            payload = { ...payload, images:imagesPath };
        }

        const post = new Post(payload);
        const savedpost= await post.save();
        res.status(201).json(savedpost);
    } catch (error) {
        errorHandller(error, res);
    }
}

export const patch =  async (req,res)=>{
    const { postId } = req.query;
    const postProps = req.body;

    const post = await Post.findOne({ _id: postId });
    const owner = req.app.locals.pharmaId;
    if(post.owner!=owner){
        res.status(500).json({ error: "this operation not authorized" });
        return;
    }
    let updatedPost;
    if (post) {
        updatedPost = await post.updateOne(postProps);
    }
    console.log(updatedPost);
    res.status(200).json({ message: "updated" });
}
export const remove =  async (req,res)=>{
    try {
        const { postId } = req.query;
        const post = await Post.findOne({ _id: postId });
        const owner = req.app.locals.pharmaId;
        if(post.owner!=owner){
            res.status(500).json({ error: "this operation not authorized" });
            return;
        }
        const deletedPost = await Post.findByIdAndDelete({ _id: postId });
        if (!deletedPost) {
            res.status(500).json({ error: "there no post with this id" });
            return;
        }
        res.status(200).json({ message: "deleted" });
    } catch (error) {
        errorHandller(error, res);
    }
}
export const search =  async (req,res)=>{

}