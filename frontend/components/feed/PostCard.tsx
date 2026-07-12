"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface User {
    id: number;
    name: string;
    avatar: string;
}

interface Comment {
    id: number;
    user: User;
    comment: string;
    createdAt: string;
    likes: number;
}

interface Post {
    id: number;
    user: User;
    content: string;
    image?: string;
    privacy: "public" | "friends";
    createdAt: string;

    reactions: number;
    commentsCount: number;
    sharesCount: number;

    currentReaction?: "haha" | "like" | null;

    comments: Comment[];
}

interface PostCardProps {
    post: Post;

    onReaction?: (
        postId: number,
        reaction: string
    ) => void;

    onComment?: (
        postId: number,
        comment: string
    ) => void;

    onShare?: (
        postId: number
    ) => void;
}

export default function PostCard({
    post,
    onReaction,
    onComment,
    onShare,
}: PostCardProps) {

    const [comment, setComment] = useState("");

    return (
        <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 mt-3">

            <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">

                {/* Header */}

                <div className="_feed_inner_timeline_post_top">

                    <div className="_feed_inner_timeline_post_box">

                        <div className="_feed_inner_timeline_post_box_image">

                            <Link href={`/profile/${post.user.id}`}>

                                <Image
                                    src={post.user.avatar}
                                    alt={post.user.name}
                                    width={48}
                                    height={48}
                                    className="_post_img"
                                />

                            </Link>

                        </div>

                        <div className="_feed_inner_timeline_post_box_txt">

                            <h4 className="_feed_inner_timeline_post_box_title">
                                {post.user.name}
                            </h4>

                            <p className="_feed_inner_timeline_post_box_para">
                                {post.createdAt} ·{" "}

                                <Link href="#">
                                    {post.privacy === "public"
                                        ? "Public"
                                        : "Friends"}
                                </Link>

                            </p>

                        </div>

                    </div>

                    <div className="_feed_inner_timeline_post_box_dropdown">

                        <button
                            type="button"
                            className="_feed_timeline_post_dropdown_link"
                        >
                            ⋮
                        </button>

                    </div>

                </div>

                {/* Content */}

                <h4 className="_feed_inner_timeline_post_title">
                    {post.content}
                </h4>

                {post.image && (

                    <div className="_feed_inner_timeline_image">

                        <Image
                            src={post.image}
                            alt="Post"
                            width={700}
                            height={450}
                            className="_time_img"
                        />

                    </div>

                )}
            </div>

            {/* Reactions Summary */}
            <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">

                <div className="_feed_inner_timeline_total_reacts_image">

                    <Image
                        src="/assets/images/react_img1.png"
                        alt=""
                        width={24}
                        height={24}
                        className="_react_img1"
                    />

                    <Image
                        src="/assets/images/react_img2.png"
                        alt=""
                        width={24}
                        height={24}
                        className="_react_img"
                    />

                    <Image
                        src="/assets/images/react_img3.png"
                        alt=""
                        width={24}
                        height={24}
                        className="_react_img _rect_img_mbl_none"
                    />

                    <Image
                        src="/assets/images/react_img4.png"
                        alt=""
                        width={24}
                        height={24}
                        className="_react_img _rect_img_mbl_none"
                    />

                    <Image
                        src="/assets/images/react_img5.png"
                        alt=""
                        width={24}
                        height={24}
                        className="_react_img _rect_img_mbl_none"
                    />

                    <p className="_feed_inner_timeline_total_reacts_para">
                        {post.reactions}+
                    </p>

                </div>

                <div className="_feed_inner_timeline_total_reacts_txt">

                    <p className="_feed_inner_timeline_total_reacts_para1">
                        <Link href="#">
                            <span>{post.commentsCount}</span> Comment
                        </Link>
                    </p>

                    <p className="_feed_inner_timeline_total_reacts_para2">
                        <span>{post.sharesCount}</span> Share
                    </p>

                </div>

            </div>

            {/* Action Buttons */}
            <div className="_feed_inner_timeline_reaction">

                <button
                    type="button"
                    className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${post.currentReaction ? "_feed_reaction_active" : ""
                        }`}
                    onClick={() =>
                        onReaction?.(post.id, "haha")
                    }
                >
                    <span className="_feed_inner_timeline_reaction_link">
                        <span>😂 Haha</span>
                    </span>
                </button>

                <button
                    type="button"
                    className="_feed_inner_timeline_reaction_comment _feed_reaction"
                >
                    <span className="_feed_inner_timeline_reaction_link">
                        <span>💬 Comment</span>
                    </span>
                </button>

                <button
                    type="button"
                    className="_feed_inner_timeline_reaction_share _feed_reaction"
                    onClick={() => onShare?.(post.id)}
                >
                    <span className="_feed_inner_timeline_reaction_link">
                        <span>📤 Share</span>
                    </span>
                </button>

            </div>

            {/* Write Comment */}
            <div className="_feed_inner_timeline_cooment_area">

                <div className="_feed_inner_comment_box">

                    <form
                        className="_feed_inner_comment_box_form"
                        onSubmit={(e) => {
                            e.preventDefault();

                            if (!comment.trim()) return;

                            onComment?.(post.id, comment);

                            setComment("");
                        }}
                    >

                        <div className="_feed_inner_comment_box_content">

                            <div className="_feed_inner_comment_box_content_image">

                                <Image
                                    src="/assets/images/comment_img.png"
                                    alt=""
                                    width={42}
                                    height={42}
                                    className="_comment_img"
                                />

                            </div>

                            <div className="_feed_inner_comment_box_content_txt">

                                <textarea
                                    className="form-control _comment_textarea"
                                    placeholder="Write a comment..."
                                    value={comment}
                                    onChange={(e) =>
                                        setComment(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                    </form>

                </div>

            </div>

            {/* Comments */}
            <div className="_timline_comment_main">

                {post.comments.length > 0 && (
                    <div className="_previous_comment">
                        <button
                            type="button"
                            className="_previous_comment_txt"
                        >
                            View {post.comments.length} previous comments
                        </button>
                    </div>
                )}

                {post.comments.map((item) => (

                    <div
                        key={item.id}
                        className="_comment_main"
                    >

                        <div className="_comment_image">

                            <Link href={`/profile/${item.user.id}`}>

                                <Image
                                    src={item.user.avatar}
                                    alt={item.user.name}
                                    width={42}
                                    height={42}
                                    className="_comment_img1"
                                />

                            </Link>

                        </div>

                        <div className="_comment_area">

                            <div className="_comment_details">

                                <div className="_comment_details_top">

                                    <div className="_comment_name">

                                        <Link
                                            href={`/profile/${item.user.id}`}
                                        >
                                            <h4 className="_comment_name_title">
                                                {item.user.name}
                                            </h4>
                                        </Link>

                                    </div>

                                </div>

                                <div className="_comment_status">

                                    <p className="_comment_status_text">
                                        <span>{item.comment}</span>
                                    </p>

                                </div>

                                <div className="_total_reactions">

                                    <div className="_total_react">
                                        👍 ❤️
                                    </div>

                                    <span className="_total">
                                        {item.likes}
                                    </span>

                                </div>

                                <div className="_comment_reply">

                                    <div className="_comment_reply_num">

                                        <ul className="_comment_reply_list">

                                            <li>
                                                <span>Like.</span>
                                            </li>

                                            <li>
                                                <span>Reply.</span>
                                            </li>

                                            <li>
                                                <span>Share.</span>
                                            </li>

                                            <li>
                                                <span className="_time_link">
                                                    {item.createdAt}
                                                </span>
                                            </li>

                                        </ul>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export type {
    User,
    Comment,
    Post,
    PostCardProps,
};