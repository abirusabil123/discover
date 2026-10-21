/* Copyright (c) 2025 Mohammad Sheraj */
/* Discover is licensed under India PSL v1. You can use this software according to the terms and conditions of the India PSL v1. You may obtain a copy of India PSL v1 at: https://github.com/abirusabil123/discover/blob/main/IndiaPSL1 THIS SOFTWARE IS PROVIDED ON AN “AS IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the India PSL v1 for more details. */

const WALLPAPERS = [
    'wallpapers/1.jpg',
    'wallpapers/2.jpg',
    'wallpapers/3.jpg',
    'wallpapers/4.jpg',
    'wallpapers/5.jpg',
    'wallpapers/6.jpg',
    'wallpapers/7.gif',
    'wallpapers/8.jpg',
    'wallpapers/9.webp',
    'wallpapers/10.jpg',
    'wallpapers/11.jpg',
    'wallpapers/12.jpg',
    'wallpapers/13.jpg',
    'wallpapers/14.jpg',
    'wallpapers/15.jpg',
    'wallpapers/16.jpg',
    'wallpapers/17.jpg',
    'wallpapers/18.jpg',
    'wallpapers/19.jpg',
    'wallpapers/20.jpg',
    'wallpapers/21.jpg',
    'wallpapers/22.jpg',
    'wallpapers/23.jpg',
    'wallpapers/24.jpg',
    'wallpapers/25.jpg',
    'wallpapers/26.jpg',
    'wallpapers/27.jpg',
    'wallpapers/28.jpg',
    'wallpapers/29.jpg',
    'wallpapers/30.jpeg',
    'wallpapers/31.jpg'
];

const chosen = WALLPAPERS[Math.floor(Math.random() * WALLPAPERS.length)];
document.body.style.backgroundImage =
    `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${chosen}")`;