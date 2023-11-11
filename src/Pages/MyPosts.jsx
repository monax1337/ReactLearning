import React, { useEffect, useRef, useState } from "react";
import '../Styles/App.css';
import PostItem from "../Componets/PostItem";
import PostList from "../Componets/PostList";
import Counter from "../Componets/Counter";
import MyButton from "../Componets/UI/buttons/MyButton";
import MyInput from "../Componets/UI/inputs/MyInput";
import PostForm from "../Componets/PostForm";
import MySelect from "../Componets/UI/selects/MySelect";
import { useMemo } from "react";
import PostFilter from "../Componets/PostFilter";
import MyModal from "../Componets/UI/modals/MyModal";
import { usePosts } from "../Hooks/usePosts";
import axios from "axios";
import PostService from "../API/PostService";
import MyLoader from "../Componets/UI/loaders/MyLoader";
import { useFetching } from "../Hooks/useFetching";
import { getPageCount, getPagesArray } from "../Utils/Pages";
import MyPagination from "../Componets/UI/paginations/MyPagination";
import { useObserver } from "../Hooks/useObserver";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  })

  // const [count, SetCount] = useState(0);
  // const [value, SetValue] = useState(0);

  // function increment(){
  //   SetCount(count + 1);
  // }

  // function decrement(){
  //   SetCount(count  - 1);
  // }

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");

  // const bodyInputRef = useRef();

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    fetchPosts(limit, page);
  }, [limit, page]) //массив зависимостей пуст, чтобы callback отработал единожды

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
  }

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id)) //идет проверка id, если id совпадает с тем, который мы передвли, то мы его удаляем 
  }

  return (
    <div className="App">
      <button onClick={fetchPosts}>
        GET POSTs
      </button>
      <MyButton style={{ margin: '10px 0 0 0' }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Кол-во элементов на станице"
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: -1, name: 'Показать все' }
        ]}
      />
      {postError &&
        <h2>Произошла ошибка: {postError}</h2>
      }
      {isPostsLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><MyLoader /></div>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов" />
      <div ref={lastElement} style={{ height: '20px', backgroundColor: 'red' }} />
      <MyPagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default MyPosts;
