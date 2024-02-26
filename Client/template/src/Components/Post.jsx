import { useEffect, useState } from "react";
import { fetchPosts, makePosts, postUpdate, deletePost } from "./FetchingPost";
import { useParams } from "react-router-dom";


export default function Posts({user}) {
    const {id} = useParams()

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [allPosts, setAllPosts] = useState()

    useEffect(() => {
        const fetchData = async () => {
          const data = await fetchPosts(id);
          setAllPosts(data)
        }
        fetchData()
      }, [])
     
    async function createPost() {
        const postData = { title, description, id, userid: user?.id, animeid: id }
        const data = await makePosts(postData)
        const results = await fetchPosts(id)
        setAllPosts(results)
        return data
    }

        async function editPost() {
            try {
                const response = { post: {title, description} }
                const data = await postUpdate(response, { id })
                const results = await fetchPosts(id)
                setAllPosts(results)
                return data
            } catch (error) {
                console.error(error);
            }
        }
    
    async function postDelete({ postid }) {
        try {
            await deletePost({ postid })
        } catch (error) {
            console.error(error);
        }
    }


    const submitHandler = (event) => {
        event.preventDefault();
        createPost();
        setTitle('');
        setDescription('');
        editPost('');
        postDelete()
    }

    return (
        <>
            <h2>
                Leave a Pulse!
            </h2>
            <form className="postForm" onSubmit={submitHandler}>
                <label>
                    Name:
                    <input
                        placeholder="title"
                        value={title}
                        onChange={(event) => { setTitle(event.target.value) }}
                    />
                </label>
                <br />
                <label>
                    Comment:
                    <input
                        placeholder="type pulse here"
                        value={description}
                        onChange={(event) => { setDescription(event.target.value) }}
                    />
                </label>
                <br />
                <button type="submit">Submit Pulse</button>
            </form>
            <div>
                {allPosts && allPosts?.length > 0 && allPosts.map((post) => {
                    console.log(post)
                    return (
                        <>
                            <div>
                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                                <button onClick={() => deletePost(id)}>Delete Post</button>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}  