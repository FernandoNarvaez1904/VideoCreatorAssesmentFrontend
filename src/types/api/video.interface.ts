import User from "./user.interface";

interface Video {
  id: number;
  url: string;
  title: string;
  likesCount: string;
  creationDate: string;
  lastUpdateDate: string;
  description: string;
  thumbnailUrl: string;
  isPublished: boolean;

  user: User;
  likedBy?: User[];
}

export default Video;
