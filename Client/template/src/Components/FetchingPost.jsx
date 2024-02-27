export const fetchPosts = async (animeid) => {
    try {
        const response = await fetch(`http://localhost:8080/api/posts/${animeid}`)
        const data = await response.json()
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
    }
}

export const makePosts = async (post) => {
    try {
        const response = await fetch(`http://localhost:8080/api/posts/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                title: post.title,
                userid: post.userid,
                description: post.description,
                animeid: post.animeid
            })
        })
        const data = await response.json()
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
    }
}

export const postUpdate = async (postid, post) => {
    try {
        const res = await fetch(`http://localhost:8080/api/post/${postid}`, {
            method: 'PUT',
            // headers: {
            //     "content-type": "application/json",
            //     authorization: `Bearer ${data.token}`,
            // },
            body: JSON.stringify(post)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error);
    }
}

export const deletePost =async (postid) => {
    try {
        const res = await fetch(`http://localhost:8080/api/posts/${postid}`, {
            method: "DELETE",
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error);
    }
}