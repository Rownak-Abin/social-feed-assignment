import Navbar from "@/components/feed/Navbar";
import Sidebar from "@/components/feed/Sidebar";
import StorySection from "@/components/feed/Story";
import CreatePost from "@/components/feed/CreatePost";
import PostCard from "@/components/feed/PostCard";
import RightSidebar from "@/components/feed/Friends";

const dummyPost = {
    id: 1,
    user: {
        id: 1,
        name: "Karim Saif",
        avatar: "/assets/images/post_img.png",
    },
    content: "-Healthy Tracking App",
    image: "/assets/images/timeline_img.png",
    privacy: "public" as const,
    createdAt: "5 minute ago",

    reactions: 9,
    commentsCount: 12,
    sharesCount: 122,

    currentReaction: "haha" as const,

    comments: [
        {
            id: 1,
            user: {
                id: 2,
                name: "Radovan SkillArena",
                avatar: "/assets/images/txt_img.png",
            },
            comment:
                "It is a long established fact that a reader will be distracted by the readable content of a page.",
            createdAt: "21m",
            likes: 198,
        },
    ],
};

export default function FeedPage() {
    return (
        <>
            <Navbar />

            <main className="_layout_main_wrapper _padd_t20 _padd_b20">
                <div className="container _custom_container">
                    <div className="row align-items-start">

                        {/* Left Sidebar */}
                        <Sidebar />

                        {/* Feed Content */}
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">

                            <StorySection />

                            <CreatePost />

                            {/* Posts */}
                            <PostCard post={dummyPost} />
                            <PostCard post={dummyPost} />
                            <PostCard post={dummyPost} />

                        </div>

                        {/* Right Sidebar */}
                        <RightSidebar />

                    </div>
                </div>
            </main>
        </>
    );
}