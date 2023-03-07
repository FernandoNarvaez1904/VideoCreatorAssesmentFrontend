import { atom } from "recoil";
import Video from "../../../types/api/video.interface";

export const videosAtom = atom<Video[]>({
  key: "videos",
  default: [],
});
