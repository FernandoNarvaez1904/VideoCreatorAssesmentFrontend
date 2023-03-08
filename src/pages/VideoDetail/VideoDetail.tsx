import { useParams } from "react-router-dom";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "react-query";
import axiosInstance from "../../axiosInstance";
import Video from "../../types/api/video.interface";
import VideosGrid from "../Videos/components/VideosGrid";

function VideoDetail() {
  const { videoId } = useParams();
  const info = useQuery<Video>(`videoDetail/${videoId}`, async () => {
    const response = await axiosInstance.get<Video>(
      `/videos/detail/${videoId}`
    );
    return response.data;
  });

  return (
    <>
      <Stack h={"100%"}>
        <Title order={2}>{info.data?.title}</Title>
        <Divider mt={2} mb={2} />

        <Group sx={{ flexGrow: 1 }} align={"start"}>
          <iframe
            height={"100%"}
            style={{ flexGrow: 1 }}
            src={info.data?.url}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />

          <Stack spacing={"xs"}>
            <Group>
              <Avatar
                radius={"xl"}
                color={"blue"}
                src={info.data?.user.profilePictureUrl}
                size={"md"}
              />
              <Text weight={700}>{info.data?.user.username}</Text>
            </Group>
            <Badge size={"lg"}>Likes: {info.data?.likesCount}</Badge>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              {info.data?.creationDate}
            </Text>
          </Stack>
        </Group>

        <Box h={"30%"}>
          <Title order={3}>Other Videos</Title>
          <Divider mt={5} mb={10} />
          <VideosGrid />
        </Box>
      </Stack>
    </>
  );
}

export default VideoDetail;
