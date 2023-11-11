import React, {useState} from "react";
import MyInput from "./UI/inputs/MyInput";
import MyButton from "./UI/buttons/MyButton";

const PostForm = ({create}) => {
    const [post, setPost] = useState({ title: '', description: '' }) //useState как раз заменяет очиску инпутов при нажатии на button

    const addNewPost = (e) => {
        e.preventDefault()
        // const newPost = {
        //   id: Date.now(),
        //   title,
        //   description
        // }
        // setPosts([...posts, { ...post, id: Date.now() }]);
        const newPost= {
            ...post,
            id: Date.now()
        }
        create(newPost);
        setPost({ title: '', description: '' });
    }

    return (
        <form>
            <MyInput
                value={post.title}
                // onChange={e => setTitle(e.target.value)}
                onChange={e => setPost({ ...post, title: e.target.value })}
                type="text"
                placeholder="List title"
            />
            <MyInput
                // ref={bodyInputRef}
                value={post.description}
                // onChange={e => setDescription(e.target.value)}
                onChange={e => setPost({ ...post, description: e.target.value })}
                type="text"
                placeholder="List description"
            />
            <MyButton onClick={addNewPost}>Create post</MyButton>
        </form>
    )
};

export default PostForm