"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { likePost, unlikePost, addComment, replyToComment, getComments } from "../../src/services/post.service";

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
    visibility: "public" | "private";
    createdAt: string;

    reactions: number;
    commentsCount: number;
    sharesCount: number;

    isLiked?: boolean;

    comments: Comment[];
}

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {

    const [isLiked, setIsLiked] = useState(!!post.isLiked);
    const [reactions, setReactions] = useState(post.reactions);
    const [comments, setComments] = useState<Comment[]>([]);
    const [showComments, setShowComments] = useState(false);
    const [commentsLoaded, setCommentsLoaded] = useState(false);
    const [loadingComments, setLoadingComments] = useState(false);
    const [commentsCount, setCommentsCount] = useState(post.commentsCount);

    const [comment, setComment] = useState("");
    const [submittingComment, setSubmittingComment] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);

    const [openReplyId, setOpenReplyId] = useState<number | null>(null);
    const [replyText, setReplyText] = useState("");
    const [submittingReply, setSubmittingReply] = useState(false);

    const handleLikeToggle = async () => {
        if (likeLoading) return;

        const wasLiked = isLiked;

        setIsLiked(!wasLiked);
        setReactions((prev) => (wasLiked ? prev - 1 : prev + 1));

        try {
            setLikeLoading(true);
            if (wasLiked) {
                await unlikePost(post.id);
            } else {
                await likePost(post.id);
            }
        } catch (err) {
            console.error(err);
            setIsLiked(wasLiked);
            setReactions((prev) => (wasLiked ? prev + 1 : prev - 1));
        } finally {
            setLikeLoading(false);
        }
    };

    const handleCommentsToggle = async () => {
        console.log("Comment button clicked", post.id);

        if (showComments) {
            setShowComments(false);
            return;
        }

        setShowComments(true);

        if (commentsLoaded) return;

        try {
            setLoadingComments(true);

            const data = await getComments(post.id);

            console.log(data);

            setComments(data);
            setCommentsLoaded(true);

        } catch (err) {
            console.error(err);
        } finally {
            setLoadingComments(false);
        }
    };
    const handleCommentSubmit = async (
        e: React.FormEvent | React.KeyboardEvent
    ) => {
        e.preventDefault();

        if (!comment.trim() || submittingComment) return;

        try {
            setSubmittingComment(true);
            const newComment = await addComment(post.id, comment);
            setComments((prev) => [...prev, newComment]);
            setCommentsCount((prev) => prev + 1);
            setComment("");
        } catch (err) {
            console.error(err);
        } finally {
            setSubmittingComment(false);
        }
    };

    const handleReplySubmit = async (
        e: React.FormEvent | React.KeyboardEvent,
        commentId: number
    ) => {
        e.preventDefault();

        if (!replyText.trim() || submittingReply) return;

        try {
            setSubmittingReply(true);
            const newReply = await replyToComment(commentId, replyText);
            setComments((prev) => [...prev, newReply]);
            setCommentsCount((prev) => prev + 1);
            setReplyText("");
            setOpenReplyId(null);
        } catch (err) {
            console.error(err);
        } finally {
            setSubmittingReply(false);
        }
    };

    return (
        <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 mt-3">

            <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">

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
                                    {post.visibility === "public"
                                        ? "Public"
                                        : "Private"}
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
                            unoptimized={process.env.NODE_ENV === "development"}
                        />

                    </div>

                )}
            </div>

            <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">

                <div className="_feed_inner_timeline_total_reacts_image">

                    <div className="_feed_inner_timeline_total_reacts">
                        <span className="_feed_inner_timeline_total_reacts_count">
                            {reactions}
                        </span>

                        <span className="_feed_inner_timeline_total_reacts_text">
                            reactions
                        </span>
                    </div>

                </div>

                <div className="_feed_inner_timeline_total_reacts_txt">

                    <p className="_feed_inner_timeline_total_reacts_para1">
                        <button
                            type="button"
                            onClick={handleCommentsToggle}
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                margin: 0,
                                cursor: "pointer",
                                color: "inherit",
                                font: "inherit",
                            }}
                        >
                            <span>{commentsCount}</span> Comment
                        </button>
                    </p>

                    <p className="_feed_inner_timeline_total_reacts_para2">
                        <span>{post.sharesCount}</span> Share
                    </p>

                </div>

            </div>

            <div className="_feed_inner_timeline_reaction">

                <button
                    type="button"
                    className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${isLiked ? "_feed_reaction_active" : ""
                        }`}
                    onClick={handleLikeToggle}
                    disabled={likeLoading}
                >
                    <span className="_feed_inner_timeline_reaction_link">
                        <span>😂 Haha</span>
                    </span>
                </button>

                <button
                    type="button"
                    className="_feed_inner_timeline_reaction_comment _feed_reaction"
                    onClick={handleCommentsToggle}
                >
                    <span className="_feed_inner_timeline_reaction_link">
                        <span>💬 Comment</span>
                    </span>
                </button>

                <button
                    type="button"
                    className="_feed_inner_timeline_reaction_share _feed_reaction"
                >
                    <span className="_feed_inner_timeline_reaction_link">
                        <span>📤 Share</span>
                    </span>
                </button>

            </div>

            <div className="_feed_inner_timeline_cooment_area">

                <div className="_feed_inner_comment_box">

                    <form
                        className="_feed_inner_comment_box_form"
                        onSubmit={handleCommentSubmit}
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
                                    disabled={submittingComment}
                                    onChange={(e) =>
                                        setComment(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            handleCommentSubmit(e);
                                        }
                                    }}
                                />

                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-sm"
                                disabled={submittingComment || !comment.trim()}
                                style={{ flexShrink: 0, alignSelf: "center" }}
                            >
                                {submittingComment ? "..." : "Send"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

            {showComments && (
                <div className="_timline_comment_main">

                    {loadingComments && (
                        <p className="text-center py-3">Loading comments...</p>
                    )}

                    {!loadingComments && comments.length === 0 && (
                        <p className="text-center py-3">No comments yet.</p>
                    )}

                    {!loadingComments && comments.length > 0 && (
                        <>


                            {comments.map((item) => (

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

                                            <div className="_comment_reply">

                                                <div className="_comment_reply_num">

                                                    <ul className="_comment_reply_list">

                                                        <li>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setOpenReplyId((prev) =>
                                                                        prev === item.id ? null : item.id
                                                                    )
                                                                }
                                                                style={{
                                                                    background: "none",
                                                                    border: "none",
                                                                    padding: 0,
                                                                    cursor: "pointer",
                                                                }}
                                                            >
                                                                <span>Reply.</span>
                                                            </button>
                                                        </li>

                                                        <li>
                                                            <span className="_time_link">
                                                                {item.createdAt}
                                                            </span>
                                                        </li>

                                                    </ul>

                                                </div>

                                            </div>

                                            {openReplyId === item.id && (

                                                <form
                                                    onSubmit={(e) => handleReplySubmit(e, item.id)}
                                                    className="mt-2 d-flex gap-2"
                                                >
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        placeholder="Write a reply..."
                                                        value={replyText}
                                                        disabled={submittingReply}
                                                        onChange={(e) => setReplyText(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter" && !e.shiftKey) {
                                                                handleReplySubmit(e, item.id);
                                                            }
                                                        }}
                                                        autoFocus
                                                    />

                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-sm"
                                                        disabled={submittingReply || !replyText.trim()}
                                                    >
                                                        {submittingReply ? "..." : "Send"}
                                                    </button>
                                                </form>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            ))}
                        </>
                    )}

                </div>
            )}

        </div>
    );
}

export type {
    User,
    Comment,
    Post,
    PostCardProps,
};