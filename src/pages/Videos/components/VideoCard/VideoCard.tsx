import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { useVideoCardStyles } from "./VideoCard.styles";
import { Link } from "react-router-dom";

interface VideoCardProps {
  title: string;
  creationDate: string;
  thumbnailUrl?: string;
  profilePictureUrl?: string;
  videoId: number;
}

function VideoCard({
  videoId,
  profilePictureUrl,
  thumbnailUrl,
  title,
  creationDate,
}: VideoCardProps) {
  const { classes } = useVideoCardStyles();

  return (
    <Card radius="md" component={Link} to={`/videoDetail/${videoId}`} px={0}>
      <Card.Section>
        <AspectRatio ratio={1920 / 1080}>
          <Image src={thumbnailUrl} withPlaceholder radius={"md"} />
        </AspectRatio>
      </Card.Section>

      <Group my={"xs"}>
        <Avatar
          radius={"xl"}
          color={"blue"}
          src={profilePictureUrl}
          size={"md"}
        />
        <Box>
          <Text className={classes.title}>
            {title}
            <br />
          </Text>
          <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
            {creationDate}
          </Text>
        </Box>
      </Group>
    </Card>
  );
}

export default VideoCard;
