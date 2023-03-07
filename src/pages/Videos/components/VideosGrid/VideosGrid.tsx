import { ScrollArea, SimpleGrid } from "@mantine/core";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import Video from "../../../../types/api/video.interface";
import axiosInstance from "../../../../axiosInstance";
import VideoCard from "../VideoCard";
import { useRecoilState } from "recoil";
import { videosAtom } from "../../recoil/atoms";

function VideosGrid() {
  const [videos, setVideos] = useRecoilState(videosAtom);

  useQuery<Video[]>("publishedVideos", async () => {
    const res: AxiosResponse<Video[]> = await axiosInstance(
      "/videos/published"
    );
    setVideos(res.data);
    return res.data;
  });

  return (
    <>
      <ScrollArea h={"100%"} offsetScrollbars>
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: "md", cols: 3, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
        >
          {videos.map((el) => (
            <VideoCard
              key={el.id}
              title={el.title}
              creationDate={el.creationDate}
              profilePictureUrl={el.user.profilePictureUrl}
              thumbnailUrl={el.thumbnailUrl}
            />
          ))}
        </SimpleGrid>
      </ScrollArea>
    </>
  );
}

export default VideosGrid;
