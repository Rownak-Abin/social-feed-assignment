"use client";

import Image from "next/image";
import Link from "next/link";

interface SuggestedUser {
    id: number;
    name: string;
    designation: string;
    avatar: string;
}

interface Friend {
    id: number;
    name: string;
    designation: string;
    avatar: string;
    online: boolean;
    lastSeen?: string;
}

const suggestedUsers: SuggestedUser[] = [
    {
        id: 1,
        name: "Radovan SkillArena",
        designation: "Founder & CEO at Trophy",
        avatar: "/assets/images/Avatar.png",
    },
    {
        id: 2,
        name: "Steve Jobs",
        designation: "CEO of Apple",
        avatar: "/assets/images/people1.png",
    },
    {
        id: 3,
        name: "Ryan Roslansky",
        designation: "CEO of Linkedin",
        avatar: "/assets/images/people2.png",
    },
];

const friends: Friend[] = [
    {
        id: 1,
        name: "Steve Jobs",
        designation: "CEO of Apple",
        avatar: "/assets/images/people1.png",
        online: false,
        lastSeen: "5 minute ago",
    },
    {
        id: 2,
        name: "Ryan Roslansky",
        designation: "CEO of Linkedin",
        avatar: "/assets/images/people2.png",
        online: true,
    },
    {
        id: 3,
        name: "Dylan Field",
        designation: "CEO of Figma",
        avatar: "/assets/images/people3.png",
        online: true,
    },
    {
        id: 4,
        name: "Steve Jobs",
        designation: "CEO of Apple",
        avatar: "/assets/images/people1.png",
        online: false,
        lastSeen: "5 minute ago",
    },
    {
        id: 5,
        name: "Ryan Roslansky",
        designation: "CEO of Linkedin",
        avatar: "/assets/images/people2.png",
        online: true,
    },
    {
        id: 6,
        name: "Dylan Field",
        designation: "CEO of Figma",
        avatar: "/assets/images/people3.png",
        online: true,
    },
];

export default function RightSidebar() {
    return (
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">

            <div className="_layout_right_sidebar_wrap">

                {/* Friends */}
                <div className="_layout_right_sidebar_inner mt-5">

                    <div className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">

                        <div className="_feed_top_fixed">

                            <div className="_feed_right_inner_area_card_content _mar_b24">

                                <h4 className="_feed_right_inner_area_card_content_title _title5">
                                    Your Friends
                                </h4>

                                <span className="_feed_right_inner_area_card_content_txt">
                                    <Link
                                        href="/find-friends"
                                        className="_feed_right_inner_area_card_content_txt_link"
                                    >
                                        See All
                                    </Link>
                                </span>

                            </div>

                            <form className="_feed_right_inner_area_card_form">

                                <svg
                                    className="_feed_right_inner_area_card_form_svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="17"
                                    height="17"
                                    fill="none"
                                    viewBox="0 0 17 17"
                                >
                                    <circle
                                        cx="7"
                                        cy="7"
                                        r="6"
                                        stroke="#666"
                                    />

                                    <path
                                        stroke="#666"
                                        strokeLinecap="round"
                                        d="M16 16l-3-3"
                                    />
                                </svg>

                                <input
                                    className="form-control me-2 _feed_right_inner_area_card_form_inpt"
                                    type="search"
                                    placeholder="input search text"
                                />

                            </form>

                        </div>

                        <div className="_feed_bottom_fixed">

                            {friends.map((friend) => (
                                <div
                                    key={friend.id}
                                    className={`_feed_right_inner_area_card_ppl ${!friend.online
                                        ? "_feed_right_inner_area_card_ppl_inactive"
                                        : ""
                                        }`}
                                >
                                    <div className="_feed_right_inner_area_card_ppl_box">

                                        <div className="_feed_right_inner_area_card_ppl_image">
                                            <Link href="/profile">
                                                <Image
                                                    src={friend.avatar}
                                                    alt={friend.name}
                                                    width={48}
                                                    height={48}
                                                    className="_box_ppl_img"
                                                />
                                            </Link>
                                        </div>

                                        <div className="_feed_right_inner_area_card_ppl_txt">
                                            <Link href="/profile">
                                                <h4 className="_feed_right_inner_area_card_ppl_title">
                                                    {friend.name}
                                                </h4>
                                            </Link>

                                            <p className="_feed_right_inner_area_card_ppl_para">
                                                {friend.designation}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="_feed_right_inner_area_card_ppl_side">

                                        {friend.online ? (

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
                                                fill="none"
                                                viewBox="0 0 14 14"
                                            >
                                                <rect
                                                    width="12"
                                                    height="12"
                                                    x="1"
                                                    y="1"
                                                    fill="#0ACF83"
                                                    stroke="#fff"
                                                    strokeWidth="2"
                                                    rx="6"
                                                />
                                            </svg>

                                        ) : (

                                            <span>
                                                {friend.lastSeen}
                                            </span>

                                        )}

                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}