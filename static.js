/* Copyright (c) 2025 Mohammad Sheraj */
/* Discover is licensed under India PSL v1. You can use this software according to the terms and conditions of the India PSL v1. You may obtain a copy of India PSL v1 at: https://github.com/abirusabil123/discover/blob/main/IndiaPSL1 THIS SOFTWARE IS PROVIDED ON AN “AS IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the India PSL v1 for more details. */

// static.js
const STATIC = {
    // Auto-generated sample links
    SAMPLE_LINKS: [
        {
            "name": "Radio Garden",
            "url": "http://radio.garden/",
            "description": "Listen to live radio stations across the globe",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 60,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 4,
            "dislikesDesktop": 0
        },
        {
            "name": "A Soft Murmur",
            "url": "https://asoftmurmur.com/",
            "description": "Mix ambient sounds (rain, waves) for focus",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 76,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 2,
            "dislikesDesktop": 0
        },
        {
            "name": "Bluesky",
            "url": "https://bsky.app/",
            "description": "Social media",
            "tags": [
                "positive"
            ],
            "views": 32,
            "likesMobile": 1,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "Codeforces",
            "url": "https://codeforces.com/problemset",
            "description": "The top competitive programming platform.",
            "tags": [
                "positive",
                "code",
                "learning",
                "fun",
                "poetic"
            ],
            "views": 146,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 2,
            "dislikesDesktop": 0
        },
        {
            "name": "4 Quls in Quran",
            "url": "https://easywaytoquran.com/4-qul-in-islam-2/",
            "description": "Prophet Muhammad (SAW) recommended these surahs for their spiritual benefits, including protection against black magic, the evil eye, whispers of Shaitaan (Satan), and shirk (associating partners with Allah). Muslims often recite them before sleeping and during daily prayers to seek blessings and divine protection.",
            "tags": [
                "positive",
                "quran",
                "islam",
                "learning"
            ],
            "views": 69,
            "likesMobile": 1,
            "dislikesMobile": 0,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "Hashnode",
            "url": "https://hashnode.com/",
            "description": "Developer blog platform.",
            "tags": [
                "positive",
                "learning",
                "blog",
                "platform"
            ],
            "views": 7,
            "likesMobile": 0,
            "dislikesMobile": 2000,
            "likesDesktop": 1,
            "dislikesDesktop": 1
        },
        {
            "name": "hashnode",
            "url": "https://hashnode.com/featured",
            "description": "Developer blog platform.",
            "tags": [
                "positive",
                "user-submitted"
            ],
            "views": 70,
            "likesMobile": 4,
            "dislikesMobile": 1000,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "Hashnode recent",
            "url": "https://hashnode.com/recent",
            "description": "Blogging platform.",
            "tags": [
                "positive",
                "tech",
                "blog",
                "learning"
            ],
            "views": 59,
            "likesMobile": 0,
            "dislikesMobile": 3000,
            "likesDesktop": 0,
            "dislikesDesktop": 1
        },
        {
            "name": "High Scalability",
            "url": "https://highscalability.com/",
            "description": "System Design Blogs",
            "tags": [
                "positive",
                "user-submitted"
            ],
            "views": 132,
            "likesMobile": 1,
            "dislikesMobile": 0,
            "likesDesktop": 2,
            "dislikesDesktop": 0
        },
        {
            "name": "Little Alchemy 2",
            "url": "https://littlealchemy2.com/",
            "description": "Combine elements to discover new objects (e.g., Earth + Fire = Lava)",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 156,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 1,
            "dislikesDesktop": 1
        },
        {
            "name": "Alternative tiktok",
            "url": "https://loops.video/",
            "description": "Short videos. Loops.video is the flagship instance of Loops - an open-source, federated alternative to commercial short-video platforms, created by the team behind Pixelfed.",
            "tags": [
                "positive",
                "videos",
                "socialmedia"
            ],
            "views": 8,
            "likesMobile": 0,
            "dislikesMobile": 1000,
            "likesDesktop": 3,
            "dislikesDesktop": 0
        },
        {
            "name": "YouTube",
            "url": "https://m.youtube.com/feed/subscriptions",
            "description": "The subscriptions feed does not have implicit personalized recommendations.",
            "tags": [
                "positive",
                "video",
                "social",
                "good",
                "dynamic",
                "regular",
                "repeat"
            ],
            "views": 85,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 4,
            "dislikesDesktop": 2
        },
        {
            "name": "maktoobmedia",
            "url": "https://maktoobmedia.com/",
            "description": "News website",
            "tags": [
                "positive",
                "news"
            ],
            "views": 46,
            "likesMobile": 4,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "Mastodon",
            "url": "https://mastodon.social/explore",
            "description": "Decentralized social media",
            "tags": [
                "positive",
                "twitteralternative",
                "socialmedia"
            ],
            "views": 54,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "Ncase.me",
            "url": "https://ncase.me/",
            "description": "Interactive simulations about trust and human behavior",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 198,
            "likesMobile": 3,
            "dislikesMobile": 1,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "Hacker News",
            "url": "https://news.ycombinator.com/",
            "description": "Social news link focusing on computer science and entrepreneurship",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 280,
            "likesMobile": 41,
            "dislikesMobile": 3,
            "likesDesktop": 18,
            "dislikesDesktop": 0
        },
        {
            "name": "Islamic lunar calendar 12 months",
            "url": "https://ocmic.org.uk/12-islamic-months/",
            "description": "The Islamic calendar is moon based compared to the sun based Gregorian calendar.The lunar year is approximately 354 days long which is shorter than the solar year of approximately 365 days.",
            "tags": [
                "positive",
                "good",
                "calendar",
                "lunar",
                "islam"
            ],
            "views": 0,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "palestine.com",
            "url": "https://palestine.com/",
            "description": "The website https://palestine.com/.",
            "tags": [
                "positive",
                "palestine",
                "free"
            ],
            "views": 12,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "Patatap",
            "url": "https://patatap.com/",
            "description": "Turn your keyboard into a sound machine with colorful animations",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 199,
            "likesMobile": 4,
            "dislikesMobile": 0,
            "likesDesktop": 4,
            "dislikesDesktop": 0
        },
        {
            "name": "Pointer Pointer",
            "url": "https://pointerpointer.com/",
            "description": "Photos of people pointing at your cursor wherever you move it",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 204,
            "likesMobile": 4,
            "dislikesMobile": 1,
            "likesDesktop": 3,
            "dislikesDesktop": 2
        },
        {
            "name": "Project Euler Archives",
            "url": "https://projecteuler.net/archives",
            "description": "Math and Computer Science puzzles.",
            "tags": [
                "positive",
                "learning"
            ],
            "views": 26,
            "likesMobile": 1,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "The Pudding",
            "url": "https://pudding.cool/",
            "description": "Visual essays that explain ideas with data and visuals",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 206,
            "likesMobile": 2,
            "dislikesMobile": 0,
            "likesDesktop": 3,
            "dislikesDesktop": 1
        },
        {
            "name": "safirnews",
            "url": "https://safirnews.in/",
            "description": "Indian news website.",
            "tags": [
                "news",
                "positive",
                "daily"
            ],
            "views": 0,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "Scream Into the Void",
            "url": "https://screamintothevoid.com/",
            "description": "Type your frustrations and hear a scream",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 74,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 1,
            "dislikesDesktop": 1
        },
        {
            "name": "The Useless Web",
            "url": "https://theuselessweb.com/",
            "description": "Random fun and bizarre links with one click",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 107,
            "likesMobile": 3,
            "dislikesMobile": 1000,
            "likesDesktop": 3,
            "dislikesDesktop": 1
        },
        {
            "name": "This Is Sand",
            "url": "https://thisissand.com/",
            "description": "Digital sand art creator",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 79,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 3,
            "dislikesDesktop": 0
        },
        {
            "name": "Unsplash",
            "url": "https://unsplash.com/",
            "description": "Beautiful, free images gifted by the world's most generous community of photographers",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 345,
            "likesMobile": 55,
            "dislikesMobile": 4,
            "likesDesktop": 27,
            "dislikesDesktop": 1
        },
        {
            "name": "Window Swap",
            "url": "https://window-swap.com/",
            "description": "See the view from someone else's window around the world",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 59,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 4,
            "dislikesDesktop": 0
        },
        {
            "name": "Al Jazeera",
            "url": "https://www.aljazeera.com/",
            "description": "International news and current affairs network",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 208,
            "likesMobile": 8,
            "dislikesMobile": 0,
            "likesDesktop": 4,
            "dislikesDesktop": 0
        },
        {
            "name": "Bored Button",
            "url": "https://www.boredbutton.com/",
            "description": "Collection of random fun links and games",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 57,
            "likesMobile": 2,
            "dislikesMobile": 2000,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "Digit",
            "url": "https://www.digit.in/",
            "description": "Technology magazine.",
            "tags": [
                "positive",
                "new",
                "tech"
            ],
            "views": 19,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "FIFA world cup 2026",
            "url": "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026",
            "description": "Live match updates and post match highlights for FIFA world cup 2026.",
            "tags": [
                "fifa",
                "worldcup",
                "sports",
                "positive"
            ],
            "views": 2,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "Product Hunt",
            "url": "https://www.producthunt.com/",
            "description": "Platform for sharing and discovering new products",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 247,
            "likesMobile": 31,
            "dislikesMobile": 3,
            "likesDesktop": 16,
            "dislikesDesktop": 0
        },
        {
            "name": "Rekhta famous shayaris",
            "url": "https://www.rekhta.org/tags/famous-shayari/couplets",
            "description": "Ponder and it might help clear blockers in the mind.",
            "tags": [
                "positive",
                "shayaris",
                "cool",
                "poetic",
                "beautiful"
            ],
            "views": 152,
            "likesMobile": 1,
            "dislikesMobile": 0,
            "likesDesktop": 3,
            "dislikesDesktop": 0
        },
        {
            "name": "Blind",
            "url": "https://www.teamblind.com/",
            "description": "Social media.",
            "tags": [
                "positive",
                "social",
                "media"
            ],
            "views": 150,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "Blind recent sort",
            "url": "https://www.teamblind.com/?sort=id",
            "description": "Social media.",
            "tags": [
                "positive",
                "social",
                "media"
            ],
            "views": 143,
            "likesMobile": 3,
            "dislikesMobile": 1,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "World Socialist Web Site",
            "url": "https://www.wsws.org/",
            "description": "News site",
            "tags": [
                "positive",
                "learning",
                "news"
            ],
            "views": 40,
            "likesMobile": 4,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "YouTube shorts",
            "url": "https://www.youtube.com/shorts/",
            "description": "Short form YouTube videos in TikTok style.",
            "tags": [
                "positive",
                "tiktok",
                "videos"
            ],
            "views": 60,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 1,
            "dislikesDesktop": 1
        }
    ]
};

if (typeof module !== 'undefined') {
    module.exports = { STATIC };
}
