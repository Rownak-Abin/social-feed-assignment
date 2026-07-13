"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/feed/Navbar";
import Sidebar from "../../components/feed/Sidebar";
import StorySection from "../../components/feed/Story";
import CreatePost from "../../components/feed/CreatePost";
import PostCard from "../../components/feed/PostCard";
import RightSidebar from "../../components/feed/Friends";
import type { Post } from "../../components/feed/PostCard";
import { getPosts } from "../../src/services/post.service";

export default function FeedPage() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getPosts(1).then(({ posts }) => setPosts(posts));
    }, []);

    return (
        <>
            <Navbar />

            <main className="_layout_main_wrapper _padd_t20 _padd_b20">
                <div className="container _custom_container">
                    <div className="row align-items-start">

                        <Sidebar />

                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">

                            <StorySection />

                            <CreatePost
                                onPostCreated={(newPost) =>
                                    setPosts((prev) => [newPost, ...prev])
                                }
                            />

                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}

                        </div>

                        <RightSidebar />

                    </div>
                </div>
            </main>
        </>
    );
}