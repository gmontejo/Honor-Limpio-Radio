import React, { useEffect, useState } from "react";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import * as client from "../../client";

export default function Articles() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsData();
  }, []);

  const getPostsData = async () => {
    const postQuery = await client.getPosts();

    const htmlArray = postQuery.data.map((post) => {
      let converter = new QuillDeltaToHtmlConverter(post.content, {});
      let html = converter.convert();
      return {
        title: post.title,
        content: html,
        timestamp: post.timestamp,
        createdAt: post.createdAt,
      };
    });

    htmlArray.sort((a, b) => {
      const timeA = a.timestamp;
      const timeB = b.timestamp;

      return timeA === timeB ? 0 : timeA < timeB ? 1 : -1;
    });

    setIsLoading(false);
    setPosts(htmlArray);
  };

  return (
    <div className="articlesContainer">
      <div className="articleContent">
        <h1>Honor Limpio Blog</h1>
        {!isLoading ? (
          posts.map((post) => {
            return (
              <div key={post.timestamp} className="article">
                <div className="articleInfo">
                  <img
                    src="https://placekitten.com/40/40"
                    alt="posted by avatar"
                  />
                  <h5>Emi</h5>
                  <span>- {post.createdAt || ""}</span>
                </div>
                <h2>{post.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            );
          })
        ) : (
          <p>Cargando Contenido</p>
        )}
      </div>
    </div>
  );
}
