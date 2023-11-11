import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../Hooks/useFetching";
import PostService from "../API/PostService";
import MyLoader from "../Componets/UI/loaders/MyLoader";

const MyPageId = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  })

  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  })

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, [])

  return (
    <div>
      <h1>Вы попали на страницу поста с ID = {params.id}</h1>
      {isLoading
        ?
        <MyLoader />
        :
        <div>{post.id}. {post.title}</div>
      }
      <h2>
        Комментрарии к посту:
      </h2>
      {isComLoading
        ?
        <MyLoader />
        :
        <div>
          {comments.map(comm =>
            <div key={comm.id} style={{ margin: '15px' }}>
              <h3>{comm.email}</h3>
              <div>{comm.body}</div>
            </div>
          )

          }
        </div>
      }
    </div>
  )
};

export default MyPageId