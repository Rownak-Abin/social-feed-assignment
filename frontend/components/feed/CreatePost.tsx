"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { createPost } from "../../src/services/post.service";
import type { Post } from "./PostCard";

interface CreatePostProps {
    onPostCreated?: (post: Post) => void;
}

export default function CreatePost({
    onPostCreated,
}: CreatePostProps) {

    const imageInputRef = useRef<HTMLInputElement>(null);

    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [isPublic, setIsPublic] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setImage(e.target.files[0]);
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!content.trim() && !image) return;

        const formData = new FormData();

        formData.append("content", content);
        formData.append("visibility", isPublic ? "public" : "private");

        if (image) {
            formData.append("image", image);
        }

        try {
            setLoading(true);
            setError(null);

            const newPost = await createPost(formData);
            onPostCreated?.(newPost);

            setContent("");
            setImage(null);
            setIsPublic(true);

            if (imageInputRef.current) {
                imageInputRef.current.value = "";
            }

        } catch (err) {
            console.error(err);
            setError("পোস্ট করা যায়নি, আবার চেষ্টা করো।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 mt-3"
        >

            <div className="_feed_inner_text_area_box">

                <div className="_feed_inner_text_area_box_image">
                    <Image
                        src="/assets/images/txt_img.png"
                        alt="Profile"
                        width={48}
                        height={48}
                        className="_txt_img"
                    />
                </div>

                <div className="form-floating _feed_inner_text_area_box_form">

                    <textarea
                        id="create-post"
                        className="form-control _textarea"
                        placeholder="Write something..."
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                    />

                    <label
                        htmlFor="create-post"
                        className="_feed_textarea_label"
                    >
                        Write something ...

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="23"
                            height="24"
                            fill="none"
                            viewBox="0 0 23 24"
                        >
                            <path
                                fill="#666"
                                d="M19.504 19.209c.332 0 .601.289.601.646 0 .326-.226.596-.52.64l-.081.005h-6.276c-.332 0-.602-.289-.602-.645 0-.327.227-.597.52-.64l.082-.006h6.276z"
                            />
                        </svg>

                    </label>

                </div>

                {/* Public/Private toggle */}
                <div
                    className="d-flex align-items-center gap-2"
                    style={{ flexShrink: 0 }}
                >
                    <span
                        style={{
                            fontSize: "13px",
                            color: "#666",
                            minWidth: "40px",
                        }}
                    >
                        {isPublic ? "Public" : "Private"}
                    </span>

                    <div className="form-check form-switch m-0">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="visibility-toggle"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                            style={{ cursor: "pointer", width: "40px", height: "20px" }}
                        />
                    </div>
                </div>

            </div>

            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
            />

            {image && (

                <div className="mt-3">

                    <div className="d-flex flex-wrap gap-2 mt-2">

                        <div className="border rounded px-2 py-1 d-flex align-items-center gap-2">
                            {image.name}
                            <button
                                type="button"
                                onClick={() => {
                                    setImage(null);
                                    if (imageInputRef.current) {
                                        imageInputRef.current.value = "";
                                    }
                                }}
                            >
                                ✕
                            </button>
                        </div>

                    </div>

                </div>

            )}

            {error && (
                <p className="text-danger mt-2 mb-0">
                    {error}
                </p>
            )}

            {/* Desktop Toolbar */}
            <div className="_feed_inner_text_area_bottom">

                <div className="_feed_inner_text_area_item">

                    {/* Photo */}
                    <div className="_feed_inner_text_area_bottom_photo _feed_common">
                        <button
                            type="button"
                            className="_feed_inner_text_area_bottom_photo_link"
                            onClick={() => imageInputRef.current?.click()}
                        >
                            <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                                📷
                            </span>

                            Photo
                        </button>
                    </div>

                    {/* Video */}
                    <div className="_feed_inner_text_area_bottom_video _feed_common">
                        <button
                            type="button"
                            className="_feed_inner_text_area_bottom_photo_link"
                        >
                            <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                                🎥
                            </span>

                            Video
                        </button>
                    </div>

                    {/* Event */}
                    <div className="_feed_inner_text_area_bottom_event _feed_common">
                        <button
                            type="button"
                            className="_feed_inner_text_area_bottom_photo_link"
                        >
                            <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                                📅
                            </span>

                            Event
                        </button>
                    </div>

                    {/* Article */}
                    <div className="_feed_inner_text_area_bottom_article _feed_common">
                        <button
                            type="button"
                            className="_feed_inner_text_area_bottom_photo_link"
                        >
                            <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                                📄
                            </span>

                            Article
                        </button>
                    </div>

                </div>

                <div className="_feed_inner_text_area_btn">

                    <button
                        type="submit"
                        className="_feed_inner_text_area_btn_link"
                        disabled={loading}
                    >
                        {loading ? (
                            <>Posting...</>
                        ) : (
                            <>
                                <span>Post</span>
                            </>
                        )}
                    </button>

                </div>

            </div>

            {/* Mobile Toolbar */}
            <div className="_feed_inner_text_area_bottom_mobile">

                <div className="_feed_inner_text_mobile">

                    <div className="_feed_inner_text_area_item">

                        <div className="_feed_inner_text_area_bottom_photo _feed_common">
                            <button
                                type="button"
                                className="_feed_inner_text_area_bottom_photo_link"
                                onClick={() => imageInputRef.current?.click()}
                            >
                                📷
                            </button>
                        </div>

                        <div className="_feed_inner_text_area_bottom_video _feed_common">
                            <button
                                type="button"
                                className="_feed_inner_text_area_bottom_photo_link"
                            >
                                🎥
                            </button>
                        </div>

                        <div className="_feed_inner_text_area_bottom_event _feed_common">
                            <button
                                type="button"
                                className="_feed_inner_text_area_bottom_photo_link"
                            >
                                📅
                            </button>
                        </div>

                        <div className="_feed_inner_text_area_bottom_article _feed_common">
                            <button
                                type="button"
                                className="_feed_inner_text_area_bottom_photo_link"
                            >
                                📄
                            </button>
                        </div>

                    </div>

                    <div className="_feed_inner_text_area_btn">

                        <button
                            type="submit"
                            className="_feed_inner_text_area_btn_link"
                            disabled={loading}
                        >
                            {loading ? "Posting..." : "Post"}
                        </button>

                    </div>

                </div>

            </div>

        </form>
    );
}