import { getPosts } from "../../services/Api";
import React from "react";

const Post = () => {
    const[posts,setPosts]=React.useState([]);
    React.useEffect(()=>{
        getPosts({}).then(({data})=>setPosts(data));
     },[]);

   
    return (
        <table class="table table-dark table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
            {
            posts.map((post)=>
            <tr>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
            </tr>)
        } 
                 
            </tbody>
        </ table >
    )
}
export default Post;