import AddPost from "@/components/board/addPost";
import Article from "@/components/board/Article";
import { IArticle, IBoard } from '@/types'
import { remove } from "lodash";
import { InferGetServerSidePropsType } from "next";
import React, { useState } from "react";

export default function BoardPage({articles}: InferGetServerSidePropsType<typeof getStaticProps>){
    const [articleList, setArticleList] = useState(articles)
    const addPost = async (e:React.FormEvent, formDate: IArticle) => {
        e.preventDefault()
        const article: IArticle = {
            artId: Math.random(),
            title: formDate.title,
            content: formDate.content
        }
        setArticleList([article, ...articleList])
    }
    const deletePost = async (artId: number) => {
        //filter 사용해서 문제해결 한문장
        const arr: IArticle[] = articles.filter((article: IArticle)=>(article.artId !== artId))
        setArticleList(arr)
    }

    if(! articleList) return <h1>Loading...</h1> 

    return(<>
        <AddPost write={addPost}/>
        {articleList.map((article: IArticle)=>(
            <Article key={article.artId} deletePost={deletePost} article={article}/> 
        ))}
        </>
    )
}

export async function getStaticProps() {
  const res = await fetch(BASE_URL)  
  const articles: IArticle[] = await res.json()

  return {props: {articles}}
} 

const BASE_URL : string = "http://localhost:8080/articles"
