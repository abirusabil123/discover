/* ---- Wallpaper rotation (every 60 s) ---- */
const WALLPAPERS = [
    'wallpapers/09nyunrest-trumptower1-videoSixteenByNine3000-2076294980.jpg',
    'wallpapers/12447168_hypatia-h_42ec70aed75941750b48811281a07991-h_a2c04a748248448a3f6dec1e6cc6fb151-2251980933.jpg',
    'wallpapers/1bf359c624b8a9b1d812ac5ac5bdba75-1775231752.jpg',
    'wallpapers/2017-10-11-09-17-00-3289528227.jpg',
    'wallpapers/21e1be5a399842a1e0e8f51dcebda295-4248864490.jpg',
    'wallpapers/3604688960_f095ff82b5_k-1568x1109-4264654766.jpg',
    'wallpapers/38107473822_50e5b87bba_k-1200x900.jpg',
    'wallpapers/3e0c556295ad6c54c7592ff69ff2c438-934664156.jpg',
    'wallpapers/50004783073_39b7c54012_k-1200x800.jpg',
    'wallpapers/5227454.jpg',
    'wallpapers/5fbeb360b0ab18f5adf1720980e97b81f454cff3-1170x1149.jpg',
    'wallpapers/813e2093a97717363e53d15efbc5ff7f-2298077177.jpg',
    'wallpapers/84fddcac56d4b7896c69e1005dc1f0bd-247120064.webp',
    'wallpapers/8fbcdb9680a8efd90b64183b42799ddc-1312865612.jpg',
    'wallpapers/Banksy-Extinction-Rebellion-Marble-Arch-London-Street-Art-04-3504841204.jpg',
    'wallpapers/GettyImages-2156300861-scaled-1145030810.jpg',
    'wallpapers/ICE-PROTEST-0111-04-600000601.jpg',
    'wallpapers/India%20from%20space.jpg',
    'wallpapers/LB-Bu-Rassismus-Graffiti-1036936527.gif',
    'wallpapers/LDN-L-PROTEST-0203-12-2679822921.jpg',
    'wallpapers/Mahatma%20Gandhi%20statue%20at%20Malpe%20Beach%2C%20Udupi%2C%20Karnataka.jpg',
    'wallpapers/Pr9hNhy.jpg',
    'wallpapers/abdullah-faraz-fj-p_oVIhYE-unsplash.jpg',
    'wallpapers/black-dirty-graffiti-pavement-thumbnail-2395267632.jpg',
    'wallpapers/black-lives-matter-876092675.jpg',
    'wallpapers/f441c184-4be6-4afe-aced-623d5b918eb9-2929500689.jpg',
    'wallpapers/father-son-silhouette-both-happy.jpeg',
    'wallpapers/free-photo-of-large-political-protest-with-diverse-slogans-789882553.jpg',
    'wallpapers/image_3214d4c81eeb9e6de64ee09422c1c1e5-2147699634.jpg',
    'wallpapers/protest_art_2_dc-430296604.jpg',
    'wallpapers/ut7loem37k861-4276150870.jpg'
];

const minuteBucket = Math.floor(Date.now() / 60000);
const chosen = WALLPAPERS[minuteBucket % WALLPAPERS.length];
document.body.style.backgroundImage =
    `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${chosen}")`;