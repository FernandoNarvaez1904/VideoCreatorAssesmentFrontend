import { ScrollArea, SimpleGrid } from "@mantine/core";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import Video from "../../../../types/api/video.interface";
import axiosInstance from "../../../../axiosInstance";
import VideoCard from "../VideoCard";

function VideosGrid() {
  const info = useQuery<Video[]>("publishedVideos", async () => {
    const res: AxiosResponse<Video[]> = await axiosInstance(
      "/videos/published"
    );

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
          {info.data?.map((el) => (
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
