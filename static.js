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
            "name": "4chan",
            "url": "https://4chan.org/",
            "description": "Free speech social media platform.",
            "tags": [
                "positive",
                "daily",
                "optional",
                "user-submitted"
            ],
            "views": 139,
            "likesMobile": 1,
            "dislikesMobile": 0,
            "likesDesktop": 3,
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
            "views": 78,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 2,
            "dislikesDesktop": 0
        },
        {
            "name": "Software build systems",
            "url": "https://bazel.build/basics",
            "description": "The best guide on how software build systems work and their evolution. Bazel is the best build system by Google offering 0.5 second incremental build times using functional programming concepts.",
            "tags": [
                "curated",
                "sample",
                "positive"
            ],
            "views": 182,
            "likesMobile": 2,
            "dislikesMobile": 0,
            "likesDesktop": 5,
            "dislikesDesktop": 2
        },
        {
            "name": "Bluesky",
            "url": "https://bsky.app/",
            "description": "Social media",
            "tags": [
                "positive",
                "daily"
            ],
            "views": 60,
            "likesMobile": 1,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "DeepSeek",
            "url": "https://chat.deepseek.com/",
            "description": "Cutting edge open weight open research LLM.",
            "tags": [
                "positive",
                "curated",
                "sample"
            ],
            "views": 76,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 3,
            "dislikesDesktop": 0
        },
        {
            "name": "Codeforces",
            "url": "https://codeforces.com/problemset",
            "description": "The top competitive programming platform.",
            "tags": [
                "positive",
                "dailyplus",
                "code",
                "learning",
                "fun",
                "poetic"
            ],
            "views": 148,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 2,
            "dislikesDesktop": 0
        },
        {
            "name": "Group puzzle game",
            "url": "https://codenames.game/",
            "description": "Group online puzzle game.",
            "tags": [
                "user-submitted",
                "positive"
            ],
            "views": 6,
            "likesMobile": 0,
            "dislikesMobile": 1000,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "Group trivia game",
            "url": "https://crowdparty.app/",
            "description": "Group online trivia game.",
            "tags": [
                "user-submitted",
                "positive"
            ],
            "views": 11,
            "likesMobile": 0,
            "dislikesMobile": 1000,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "The Longest Blockchain",
            "url": "https://cryptoservices.github.io/blockchain/consensus/2019/05/21/bitcoin-length-weight-confusion.html",
            "description": "Interesting perspective on blockchain strength",
            "tags": [
                "curated",
                "sample",
                "positive"
            ],
            "views": 71,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 3,
            "dislikesDesktop": 0
        },
        {
            "name": "12 Rules for Life - Jordan Bernt Peterson",
            "url": "https://dn710101.ca.archive.org/0/items/DIOXIN-KILLS/12_rules_of_life_-_Jordan_Peterson.pdf",
            "description": "The bridge between European ideas and Islam. Beyond Order: 12 More Rules for Life is also a required read after this book. Jordan Bernt Peterson almost reached Islam with pure logic which is remarkable. The difference can be seen in his Rule 8 of \"tell the truth, or atleast don't lie\" and the holy Quran's 'do not mix truth with falsehood, nor knowingly conceal the truth' - Surah Al-Baqarah (2:42). The Quran is much more strict and rewarding.",
            "tags": [
                "book",
                "positive"
            ],
            "views": 15,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "Don't Even Reply",
            "url": "https://dontevenreply.com/",
            "description": "Hilarious fictional email exchanges",
            "tags": [
                "curated",
                "sample",
                "positive"
            ],
            "views": 94,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 9,
            "dislikesDesktop": 1
        },
        {
            "name": "4 Quls in Quran",
            "url": "https://easywaytoquran.com/4-qul-in-islam-2/",
            "description": "Prophet Muhammad (SAW) recommended these surahs for their spiritual benefits, including protection against black magic, the evil eye, whispers of Shaitaan (Satan), and shirk (associating partners with Allah). Muslims often recite them before sleeping and during daily prayers to seek blessings and divine protection.",
            "tags": [
                "positive",
                "daily",
                "quran",
                "islam",
                "learning"
            ],
            "views": 93,
            "likesMobile": 1,
            "dislikesMobile": 0,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "In depth flow of computers",
            "url": "https://github.com/alex/what-happens-when",
            "description": "An attempt to answer the age old interview question - What happens when you type google.com into your browser and press enter? This page explains how the computer systems work together.",
            "tags": [
                "curated",
                "sample",
                "positive"
            ],
            "views": 98,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 5,
            "dislikesDesktop": 0
        },
        {
            "name": "Competitive Programmer's Handbook",
            "url": "https://github.com/pllk/cphb/",
            "description": "Best competitive programming book.",
            "tags": [
                "user-submitted",
                "positive"
            ],
            "views": 19,
            "likesMobile": 0,
            "dislikesMobile": 1000,
            "likesDesktop": 3,
            "dislikesDesktop": 0
        },
        {
            "name": "Compiler Explorer",
            "url": "https://godbolt.org/",
            "description": "Test different computer programming language compilers.",
            "tags": [
                "user-submitted",
                "positive"
            ],
            "views": 19,
            "likesMobile": 0,
            "dislikesMobile": 1000,
            "likesDesktop": 4,
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
            "views": 8,
            "likesMobile": 0,
            "dislikesMobile": 2000,
            "likesDesktop": 2,
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
            "views": 72,
            "likesMobile": 4,
            "dislikesMobile": 1000,
            "likesDesktop": 2,
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
            "views": 62,
            "likesMobile": 0,
            "dislikesMobile": 3000,
            "likesDesktop": 0,
            "dislikesDesktop": 2
        },
        {
            "name": "High Scalability",
            "url": "https://highscalability.com/",
            "description": "System Design Blogs",
            "tags": [
                "positive",
                "user-submitted"
            ],
            "views": 135,
            "likesMobile": 1,
            "dislikesMobile": 0,
            "likesDesktop": 2,
            "dislikesDesktop": 0
        },
        {
            "name": "Andher Nagri Chaupat Raja : Bharatendu Harishchandra",
            "url": "https://hindi-kavita.com/HindiAndherNagriBharatenduHarishchandra.php",
            "description": "Short play on the British rule in India",
            "tags": [
                "user-submitted",
                "positive"
            ],
            "views": 119,
            "likesMobile": 2,
            "dislikesMobile": 0,
            "likesDesktop": 3,
            "dislikesDesktop": 1
        },
        {
            "name": "History can't hide",
            "url": "https://historycanthide.substack.com/",
            "description": "I'm Kahlil Greene, better known as the Gen Z Historian. My work uncovering hidden histories has earned me recognition as a Peabody Award winner, a TIME100 content creator, a two-time Emmy nominee, a Forbes 30 Under 30 honoree, and a member of Variety's Power of Young Hollywood list. Across TikTok, Instagram, and LinkedIn, I've built a platform of ~1 million followers and 50 million views, using digital media to make history engaging, accessible, and relevant.",
            "tags": [
                "history",
                "learning",
                "positive"
            ],
            "views": 0,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "LLM Embeddings Explained",
            "url": "https://huggingface.co/spaces/hesamation/primer-llm-embedding",
            "description": "LLM Embeddings Explained: A Visual and Intuitive Guide",
            "tags": [
                "llm",
                "ai",
                "explained",
                "positive"
            ],
            "views": 13,
            "likesMobile": 0,
            "dislikesMobile": 1001,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "learnislam4free",
            "url": "https://learnislam4free.org/",
            "description": "Free Islamic books and ebooks.",
            "tags": [
                "learning",
                "positive"
            ],
            "views": 0,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 0,
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
            "views": 157,
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
            "views": 9,
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
                "daily",
                "news"
            ],
            "views": 72,
            "likesMobile": 4,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "The DeepSeek Series: A Technical Overview",
            "url": "https://martinfowler.com/articles/deepseek-papers.html",
            "description": "This article provides an overview of the DeepSeek papers, highlighting three main arcs in this research: a focus on improving cost and memory efficiency, the use of HPC Co-Design to train large models on limited hardware, and the development of emergent reasoning from large-scale reinforcement learning.",
            "tags": [
                "user-submitted",
                "positive"
            ],
            "views": 35,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "Mastodon",
            "url": "https://mastodon.social/explore",
            "description": "Decentralized social media",
            "tags": [
                "positive",
                "daily",
                "twitteralternative",
                "socialmedia"
            ],
            "views": 76,
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
            "views": 200,
            "likesMobile": 3,
            "dislikesMobile": 1,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "The Deep Sea",
            "url": "https://neal.fun/deep-sea",
            "description": "Interactive dive into ocean depths with fascinating facts",
            "tags": [
                "curated",
                "sample",
                "positive"
            ],
            "views": 74,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 2,
            "dislikesDesktop": 0
        },
        {
            "name": "Hacker News",
            "url": "https://news.ycombinator.com/",
            "description": "Social news link focusing on computer science and entrepreneurship",
            "tags": [
                "positive",
                "daily",
                "curated",
                "sample"
            ],
            "views": 297,
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
            "views": 2,
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
                "daily",
                "palestine",
                "free"
            ],
            "views": 36,
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
                "daily",
                "curated",
                "sample"
            ],
            "views": 219,
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
                "daily",
                "curated",
                "sample"
            ],
            "views": 229,
            "likesMobile": 4,
            "dislikesMobile": 1,
            "likesDesktop": 3,
            "dislikesDesktop": 2
        },
        {
            "name": "Project Euler",
            "url": "https://projecteuler.net/",
            "description": "Project Euler is a series of challenging mathematical/computer programming problems that will require more than just mathematical insights to solve. The motivation for starting Project Euler, and its continuation, is to provide a platform for the inquiring mind to delve into unfamiliar areas and learn new concepts in a fun and recreational context.",
            "tags": [
                "math",
                "cs",
                "coding",
                "positive"
            ],
            "views": 120,
            "likesMobile": 5,
            "dislikesMobile": 0,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "Project Euler Archives",
            "url": "https://projecteuler.net/archives",
            "description": "Math and Computer Science puzzles.",
            "tags": [
                "positive",
                "dailyplus",
                "learning"
            ],
            "views": 31,
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
            "views": 207,
            "likesMobile": 2,
            "dislikesMobile": 0,
            "likesDesktop": 3,
            "dislikesDesktop": 1
        },
        {
            "name": "Quick, Draw!",
            "url": "https://quickdraw.withgoogle.com/",
            "description": "AI game that guesses your doodles",
            "tags": [
                "curated",
                "sample",
                "positive"
            ],
            "views": 66,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "Linux Kernel Explorer",
            "url": "https://reverser.dev/linux-kernel-explorer",
            "description": "A portal to study the Linux Kernel.",
            "tags": [
                "linux",
                "kernel",
                "positive"
            ],
            "views": 8,
            "likesMobile": 0,
            "dislikesMobile": 1001,
            "likesDesktop": 1,
            "dislikesDesktop": 0
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
            "views": 19,
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
            "views": 75,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 1,
            "dislikesDesktop": 1
        },
        {
            "name": "skribbl.io",
            "url": "https://skribbl.io/",
            "description": "Free multiplayer drawing and guessing game",
            "tags": [
                "curated",
                "sample",
                "positive"
            ],
            "views": 50,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "Stellarium Web",
            "url": "https://stellarium-web.org/",
            "description": "Real-time 3D simulation of space with planetarium view",
            "tags": [
                "curated",
                "sample",
                "positive"
            ],
            "views": 60,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 1,
            "dislikesDesktop": 1
        },
        {
            "name": "Tails",
            "url": "https://tails.net/",
            "description": "Secure OS.",
            "tags": [
                "secure",
                "os",
                "privacy",
                "positive"
            ],
            "views": 10,
            "likesMobile": 3,
            "dislikesMobile": 1002,
            "likesDesktop": 7,
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
            "views": 108,
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
                "daily",
                "curated",
                "sample"
            ],
            "views": 366,
            "likesMobile": 56,
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
                "daily",
                "curated",
                "sample"
            ],
            "views": 234,
            "likesMobile": 8,
            "dislikesMobile": 0,
            "likesDesktop": 4,
            "dislikesDesktop": 0
        },
        {
            "name": "Aljazeera flips",
            "url": "https://www.aljazeera.com/#flips-6386599316112",
            "description": "Short clips from Aljazeera.",
            "tags": [
                "aljazeera",
                "flips",
                "learning",
                "positive",
                "daily"
            ],
            "views": 109,
            "likesMobile": 2,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "Aljazeera flips",
            "url": "https://www.aljazeera.com/#flips-6386609485112",
            "description": "Short clips from Aljazeera.",
            "tags": [
                "aljazeera",
                "flips",
                "learning",
                "positive"
            ],
            "views": 81,
            "likesMobile": 1,
            "dislikesMobile": 1,
            "likesDesktop": 0,
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
            "views": 58,
            "likesMobile": 2,
            "dislikesMobile": 2000,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "Connected Papers",
            "url": "https://www.connectedpapers.com/",
            "description": "Visual tool to explore academic research connections",
            "tags": [
                "curated",
                "sample",
                "positive"
            ],
            "views": 82,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 10,
            "dislikesDesktop": 0
        },
        {
            "name": "Digit",
            "url": "https://www.digit.in/",
            "description": "Technology magazine.",
            "tags": [
                "positive",
                "daily",
                "new",
                "tech"
            ],
            "views": 43,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "ethicalconsumer",
            "url": "https://www.ethicalconsumer.org/",
            "description": "Learn more about the global brands.",
            "tags": [
                "buy",
                "brands",
                "ethics",
                "positive"
            ],
            "views": 1,
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
            "views": 19,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "FIFA world cup 2026 matches",
            "url": "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures",
            "description": "List of all FIFA world cup 2026 completed and ongoing matches.",
            "tags": [
                "positive",
                "fifa",
                "sports"
            ],
            "views": 18,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "FIFA World Cup 2026 standings",
            "url": "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/standings",
            "description": "The results from all FIFA World Cup 2026 matches.",
            "tags": [
                "fifa",
                "worldcup",
                "canadamexicousa2026",
                "positive"
            ],
            "views": 18,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "GeeksforGeeks",
            "url": "https://www.geeksforgeeks.org/",
            "description": "Computer Science learning platform.",
            "tags": [
                "user-submitted",
                "positive"
            ],
            "views": 96,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 1,
            "dislikesDesktop": 0
        },
        {
            "name": "Kaggle",
            "url": "https://www.kaggle.com/",
            "description": "Participate in AI competitions.",
            "tags": [
                "ai",
                "participate",
                "compete",
                "learning",
                "positive"
            ],
            "views": 16,
            "likesMobile": 0,
            "dislikesMobile": 2002,
            "likesDesktop": 1,
            "dislikesDesktop": 1
        },
        {
            "name": "Overleaf",
            "url": "https://www.overleaf.com/",
            "description": "Online LaTeX editor with real-time collaboration",
            "tags": [
                "curated",
                "sample",
                "positive"
            ],
            "views": 52,
            "likesMobile": 2,
            "dislikesMobile": 1000,
            "likesDesktop": 2,
            "dislikesDesktop": 0
        },
        {
            "name": "12 Rules for Life - Jordan Bernt Peterson",
            "url": "https://www.penguinrandomhouse.co.za/sites/penguinbooks.co.za/files/Extract_12%20Rules%20for%20Life.PDF",
            "description": "The bridge between European ideas and Islam. Beyond Order: 12 More Rules for Life is also a required read after this book. Jordan Bernt Peterson almost reached Islam with pure logic which is remarkable. The difference can be seen in his Rule 8 of \"tell the truth, or atleast don't lie\" and the holy Quran's 'do not mix truth with falsehood, nor knowingly conceal the truth' - Surah Al-Baqarah (2:42). The Quran is much more strict and rewarding.",
            "tags": [
                "book",
                "learning",
                "12rulesforlife",
                "positive"
            ],
            "views": 83,
            "likesMobile": 3,
            "dislikesMobile": 1000,
            "likesDesktop": 2,
            "dislikesDesktop": 1
        },
        {
            "name": "Product Hunt",
            "url": "https://www.producthunt.com/",
            "description": "Platform for sharing and discovering new products",
            "tags": [
                "positive",
                "dailyplus",
                "curated",
                "sample"
            ],
            "views": 249,
            "likesMobile": 31,
            "dislikesMobile": 3,
            "likesDesktop": 16,
            "dislikesDesktop": 0
        },
        {
            "name": "The Scandal That Never HappenedNever Happened ",
            "url": "https://www.propublica.org/article/louisiana-judges-ignored-prisoners-petitions-without-review-fifth-circuit?utm_campaign=propublica-sprout&utm_content=1783206006",
            "description": "Years ago, the all-white judges of a Louisiana appellate court decided, in secret, to systematically ignore petitions filed by prisoners, most of them Black, who claimed they had been unjustly convicted.This is the story of a horrendous injustice and the three people who tried to expose it. It begins with a suicide note.",
            "tags": [
                "positive",
                "law",
                "usa",
                "injustice",
                "incompetence",
                "evil"
            ],
            "views": 0,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "Rekhta famous shayaris",
            "url": "https://www.rekhta.org/tags/famous-shayari/couplets",
            "description": "Ponder and it might help clear blockers in the mind.",
            "tags": [
                "positive",
                "daily",
                "shayaris",
                "cool",
                "poetic",
                "beautiful",
                "optional"
            ],
            "views": 160,
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
                "daily",
                "social",
                "media"
            ],
            "views": 172,
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
                "daily",
                "social",
                "media"
            ],
            "views": 172,
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
                "daily",
                "learning",
                "news"
            ],
            "views": 64,
            "likesMobile": 4,
            "dislikesMobile": 0,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "YouTube",
            "url": "https://www.youtube.com/",
            "description": "Video sharing social media platform.",
            "tags": [
                "video",
                "positive"
            ],
            "views": 28,
            "likesMobile": 0,
            "dislikesMobile": 1000,
            "likesDesktop": 0,
            "dislikesDesktop": 0
        },
        {
            "name": "YouTube shorts",
            "url": "https://www.youtube.com/shorts/",
            "description": "Short form YouTube videos in TikTok style.",
            "tags": [
                "positive",
                "daily",
                "tiktok",
                "videos"
            ],
            "views": 85,
            "likesMobile": 0,
            "dislikesMobile": 0,
            "likesDesktop": 1,
            "dislikesDesktop": 1
        },
        {
            "name": "Pal Pal",
            "url": "https://www.youtube.com/watch?v=8of5w7RgcTc",
            "description": "Contemplative popular music in Urdu.",
            "tags": [
                "urdu",
                "music",
                "positive",
                "daily",
                "optional"
            ],
            "views": 88,
            "likesMobile": 1,
            "dislikesMobile": 2,
            "likesDesktop": 0,
            "dislikesDesktop": 1
        },
        {
            "name": "Muslim Prayer - How to perform 2 Raka'at (2 Units) of prayer",
            "url": "https://www.youtube.com/watch?v=jxLsiOflofk",
            "description": "Muslim Prayer - How to perform 2 Raka'at (2 Units) of prayer to help in praying Jumma farz namaz.",
            "tags": [
                "user-submitted",
                "positive",
                "daily",
                "optional"
            ],
            "views": 121,
            "likesMobile": 7,
            "dislikesMobile": 0,
            "likesDesktop": 3,
            "dislikesDesktop": 1
        }
    ]
};

if (typeof module !== 'undefined') {
    module.exports = { STATIC };
}
