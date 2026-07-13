import axiosInstance from "../lib/axios";
import type { Post, Comment } from "../../components/feed/PostCard";

interface RawUser {
    id?: number;
    user_id?: number;
    name?: string;
    avatar?: string;
}

interface RawComment {
    id: number;
    user?: RawUser;
    user_id?: number;
    comment?: string;
    content?: string;
    created_at?: string;
    createdAt?: string;
    likes_count?: number;
    likes?: number;
}

interface RawImage {
    url?: string;
    path?: string;
}

interface RawPost {
    id: number;
    user?: RawUser;
    user_id?: number;
    content?: string;
    image?: string;
    images?: RawImage[];
    privacy?: "public" | "friends";
    created_at?: string;
    createdAt?: string;
    likes_count?: number;
    reactions?: number;
    comments_count?: number;
    shares_count?: number;
    is_liked?: boolean;
    liked?: boolean;
    comments?: RawComment[];
}

interface PaginatedResponse<T> {
    data?: T[];
    meta?: {
        last_page?: number;
        current_page?: number;
        [key: string]: unknown;
    };
}

function normalizeComment(raw: RawComment): Comment {
    return {
        id: raw.id,
        user: {
            id: raw.user?.id ?? raw.user_id ?? 0,
            name: raw.user?.name ?? "Unknown",
            avatar: raw.user?.avatar ?? "/assets/images/comment_img.png",
        },
        comment: raw.comment ?? raw.content ?? "",
        createdAt: raw.created_at ?? raw.createdAt ?? "",
        likes: raw.likes_count ?? raw.likes ?? 0,
    };
}

export function normalizePost(raw: RawPost): Post {
    return {
        id: raw.id,
        user: {
            id: raw.user?.id ?? raw.user_id ?? 0,
            name: raw.user?.name ?? "Unknown",
            avatar: raw.user?.avatar ?? "/assets/images/txt_img.png",
        },
        content: raw.content ?? "",
        image: raw.image ?? raw.images?.[0]?.url ?? raw.images?.[0]?.path ?? undefined,
        privacy: raw.privacy ?? "public",
        createdAt: raw.created_at ?? raw.createdAt ?? "",
        reactions: raw.likes_count ?? raw.reactions ?? 0,
        commentsCount: raw.comments_count ?? raw.comments?.length ?? 0,
        sharesCount: raw.shares_count ?? 0,
        isLiked: raw.is_liked ?? raw.liked ?? false,
        comments: (raw.comments ?? []).map(normalizeComment),
    };
}

// ---- Posts ----

export async function getPosts(page = 1) {
    const res = await axiosInstance.get<PaginatedResponse<RawPost> | RawPost[]>(
        "/post",
        { params: { page } }
    );

    const rawPosts = Array.isArray(res.data)
        ? res.data
        : res.data?.data ?? [];

    const meta = Array.isArray(res.data) ? undefined : res.data?.meta;

    return {
        posts: rawPosts.map(normalizePost),
        meta,
    };
}

export async function createPost(formData: FormData) {
    const res = await axiosInstance.post<{ data?: RawPost } | RawPost>(
        "/post",
        formData
    );
    const raw = "data" in res.data && res.data.data ? res.data.data : (res.data as RawPost);
    return normalizePost(raw);
}

export async function getPost(postId: number) {
    const res = await axiosInstance.get<{ data?: RawPost } | RawPost>(
        `/post/${postId}`
    );
    const raw = "data" in res.data && res.data.data ? res.data.data : (res.data as RawPost);
    return normalizePost(raw);
}

// ---- Comments ----

export async function addComment(postId: number, content: string) {
    const res = await axiosInstance.post<{ data?: RawComment } | RawComment>(
        `/post/${postId}/comments`,
        { content }
    );
    const raw = "data" in res.data && res.data.data ? res.data.data : (res.data as RawComment);
    return normalizeComment(raw);
}

export async function replyToComment(commentId: number, content: string) {
    const res = await axiosInstance.post<{ data?: RawComment } | RawComment>(
        `/comments/${commentId}/reply`,
        { content }
    );
    const raw = "data" in res.data && res.data.data ? res.data.data : (res.data as RawComment);
    return normalizeComment(raw);
}

// ---- Likes ----

export async function likePost(postId: number) {
    await axiosInstance.post(`/post/${postId}/like`);
}

export async function unlikePost(postId: number) {
    await axiosInstance.delete(`/post/${postId}/like`);
}

export async function likeComment(commentId: number) {
    await axiosInstance.post(`/comments/${commentId}/like`);
}

export async function unlikeComment(commentId: number) {
    await axiosInstance.delete(`/comments/${commentId}/like`);
}

export async function getPostLikes(postId: number) {
    const res = await axiosInstance.get(`/post/${postId}/likes`);
    return res.data;
}

export async function getCommentLikes(commentId: number) {
    const res = await axiosInstance.get(`/comments/${commentId}/likes`);
    return res.data;
}