import { Button, Divider, Group, Stack, Title } from "@mantine/core";

function VideosHeader() {
  return (
    <Stack>
      <Group sx={{ justifyContent: "space-between" }}>
        <Title order={3}>All Published Videos</Title>
        <Button color={"teal"}>Add Video</Button>
      </Group>
      <Divider />
    </Stack>
  );
}

export default VideosHeader;
