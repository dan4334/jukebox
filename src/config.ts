export const name: string = process.env.CONFIG_NAME! || "Jukebox";
export const prefix = process.env.CONFIG_PREFIX!.replace(/"/g, "") || "jukebox "; // Temporary workaround for https://github.com/docker/compose/issues/6951
export const owners: string[] = process.env.CONFIG_OWNERS!.replace(/  +/g, " ").split(/,[ ]?/);
export const totalShards: string | number = process.env.CONFIG_TOTALSHARDS! || "auto";
export const defaultVolume = Number(process.env.CONFIG_DEFAULT_VOLUME) || 50;
export const maxVolume = Number(process.env.CONFIG_MAX_VOLUME) || 50;
export const allowDuplicate: boolean = process.env.CONFIG_ALLOW_DUPLICATE === "yes";
export const cacheYoutubeDownloads: boolean = process.env.CONFIG_CACHE_YOUTUBE_DOWNLOADS === "yes";

export default { name, prefix, owners, totalShards, defaultVolume, maxVolume, allowDuplicate, cacheYoutubeDownloads };