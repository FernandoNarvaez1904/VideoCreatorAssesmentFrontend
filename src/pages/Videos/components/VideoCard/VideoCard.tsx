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

interface VideoCardProps {
  title: string;
  creationDate: string;
  thumbnailUrl?: string;
  profilePictureUrl?: string;
}

function VideoCard(el: VideoCardProps) {
  const { classes } = useVideoCardStyles();

  return (
    <Card radius="md" component="a" href="#" px={0}>
      <Card.Section>
        <AspectRatio ratio={1920 / 1080}>
          <Image src={el.thumbnailUrl} withPlaceholder radius={"md"} />
        </AspectRatio>
      </Card.Section>

      <Group my={"xs"}>
        <Avatar
          radius={"xl"}
          color={"blue"}
          src={el.profilePictureUrl}
          size={"md"}
        />
        <Box>
          <Text className={classes.title}>
            {el.title}
            <br />
          </Text>
          <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
            {el.creationDate}
          </Text>
        </Box>
      </Group>
    </Card>
  );
}

export default VideoCard;
