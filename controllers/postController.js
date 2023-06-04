const Post = require('../models/postSchema')

const postController={
    add:async(req,res)=>{
        const {writer,title, postText, postImage} = req.body
        if (!postText && !postImage) {
            return res.status(400).json({msg:'no content to share'})
        }
        const newPost = await Post.create({
            writer : writer, 
            title: title,
            postText : postText,
            postImage : postImage
        })
        res.status(200).json({"writer":newPost.writer,"title":newPost.title, "postText":newPost.postText, "postImage":newPost.postImage})
    },
    get:async(req,res)=>{
        const posts = await Post.find()
        res.status(200).json({posts})
    },
    remove:async(req,res)=>{
        const postId = req.body._id
        const remove = await Post.findByIdAndRemove(postId)
        res.status(200).json({msg:'post removed'})
    },
    getSinglePost : async(req,res)=>{
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        res.status(200).json(post);
    },
    toggleLikes : async(req,res)=>{
        const loggedInUser = req.user.id;
        const { id: postId } = req.params;
        let post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  const isPostAlreadyLiked = post.likes.find(
    (user) => user.toString() === loggedInUser
  );

  if (isPostAlreadyLiked) {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loggedInUser },
      },
      { new: true }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loggedInUser },
      },
      { new: true }
    );
  }

  res.status(200).json(post);
}
    }


module.exports = postController