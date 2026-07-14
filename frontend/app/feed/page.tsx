"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/feed/Navbar";
import Sidebar from "../../components/feed/Sidebar";
import StorySection from "../../components/feed/Story";
import CreatePost from "../../components/feed/CreatePost";
import PostCard from "../../components/feed/PostCard";
import RightSidebar from "../../components/feed/Friends";
import type { Post } from "../../components/feed/PostCard";
import { getPosts } from "../../src/services/post.service";
import authService from "../../src/services/auth.service";

export default function FeedPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [userName, setUserName] = useState("");
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.replace("/login");
            return;
        }

        let isMounted = true;

        authService
            .me()
            .then((user) => {
                if (!isMounted) return;

                if (!user) {
                    router.replace("/login");
                    return;
                }

                const name =
                    user.full_name ??
                    (user.first_name && user.last_name
                        ? `${user.first_name} ${user.last_name}`
                        : user.name) ??
                    "User";

                setUserName(name);

                return getPosts(1).then(({ posts }) => {
                    if (isMounted) {
                        setPosts(posts);
                    }
                });
            })
            .catch(() => {
                if (isMounted) {
                    router.replace("/login");
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsCheckingAuth(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [router]);

    if (isCheckingAuth) {
        return null;
    }

    return (
        <>
            <Navbar userName={userName} />

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
