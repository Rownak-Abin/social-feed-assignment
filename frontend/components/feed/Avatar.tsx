"use client";

import Image from "next/image";

interface AvatarProps {
    name: string;
    avatarUrl?: string;
    size?: number;
    className?: string;
}

const COLORS = [
    "#F87171", "#FB923C", "#FBBF24", "#A3E635",
    "#34D399", "#22D3EE", "#60A5FA", "#A78BFA",
    "#F472B6", "#FB7185",
];

// Static placeholder images that should NOT be treated as a "real" avatar
const PLACEHOLDER_IMAGES = [
    "/assets/images/comment_img.png",
    "/assets/images/txt_img.png",
];

function getColorForName(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return COLORS[Math.abs(hash) % COLORS.length];
}

export default function Avatar({
    name,
    avatarUrl,
    size = 42,
    className,
}: AvatarProps) {
    const hasRealAvatar =
        !!avatarUrl && !PLACEHOLDER_IMAGES.some((p) => avatarUrl.endsWith(p));

    if (hasRealAvatar) {
        return (
            <Image
                src={avatarUrl as string}
                alt={name}
                width={size}
                height={size}
                className={className}
                style={{ borderRadius: "50%", objectFit: "cover" }}
            />
        );
    }

    const initial = name?.trim()?.charAt(0)?.toUpperCase() || "?";

    return (
        <div
            className={className}
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: getColorForName(name || "?"),
                color: "#fff",
                fontWeight: 600,
                fontSize: size * 0.45,
                flexShrink: 0,
                lineHeight: 1,
            }}
        >
            {initial}
        </div>
    );
}
