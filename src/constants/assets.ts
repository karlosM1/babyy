/**
 * Paths under `public/`. Add or remove entries when you change files in
 * `public/images/` or `public/videos/` (keep leading slash, match filename case).
 */
export const WAVING_BOY_GIF = "/gifs/waving-boy.gif";

/**
 * Michal Leah — "The Way I Love You" (background loop).
 * Add your legally purchased / licensed MP3 as this filename under `public/audio/`,
 * or change this path to match your file name.
 */
export const BACKGROUND_MUSIC_SRC = "/audio/the-way-i-love-you.mp3";

export const PHOTOS = [
  "/images/IMG_0055.JPG",
  "/images/IMG_0074.JPG",
  "/images/IMG_0090.JPG",
  "/images/IMG_0100.JPG",
  "/images/IMG_0117.JPG",
  "/images/IMG_0355.JPG",
  "/images/IMG_1822.JPG",
  "/images/IMG_1929.JPG",
  "/images/IMG_8387.JPG",
  "/images/IMG_8484.JPG",
  "/images/IMG_8521.JPG",
  "/images/IMG_8526.JPG",
  "/images/IMG_8587.JPG",
  "/images/IMG_9357.JPG",
  "/images/IMG_9386.PNG",
] as const;

export const VIDEOS = [
  "/videos/IMG_1309.mp4",
  "/videos/IMG_1478.mp4",
  "/videos/IMG_9361.mp4",
  "/videos/IMG_9367.mp4",
] as const;

/** Union of all photobooth image URLs in `PHOTOS` */
export type PhotoPath = (typeof PHOTOS)[number];

/** Union of all clip URLs in `VIDEOS` */
export type VideoPath = (typeof VIDEOS)[number];
