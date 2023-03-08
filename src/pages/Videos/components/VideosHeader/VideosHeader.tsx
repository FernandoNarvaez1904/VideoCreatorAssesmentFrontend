import {
  Alert,
  Button,
  Checkbox,
  Divider,
  Group,
  Modal,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import axiosInstance from "../../../../axiosInstance";
import Video from "../../../../types/api/video.interface";
import { IconAlertCircle } from "@tabler/icons-react";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { videosAtom } from "../../recoil/atoms";

interface IVideoCreateForm {
  title: string;
  url: string;
  thumbnailUrl: string;
  description: string;
  isPublished: boolean;
}

function VideosHeader() {
  const [opened, { open, close }] = useDisclosure(false);
  const setVideos = useSetRecoilState(videosAtom);

  const createVideoMutation = useMutation<
    Video,
    AxiosError<{ message: string }>,
    IVideoCreateForm
  >(async (newVideo) => {
    const data = await axiosInstance.post<Video>("videos/create", newVideo);
    return data.data;
  }); // Use the useMutation hook to handle the login API call and manage the async data

  const videoForm = useForm<IVideoCreateForm>({
    initialValues: {
      title: "",
      url: "",
      thumbnailUrl: "",
      description: "",
      isPublished: true,
    },
    validate: {
      // only allow url of youtube embedded as it's needed in the video detail
      url: (value) =>
        /https:\/\/www.youtube.com\/embed\/[^/]+$/.test(value)
          ? null
          : "The url of the video should be of Youtube embeded",
    },
  });

  const onSubmitCreateVideoForm = videoForm.onSubmit(async (values) => {
    await createVideoMutation.mutateAsync(values); // Call the API with form data
  });

  useEffect(() => {
    if (createVideoMutation.data) {
      setVideos((prev) => [createVideoMutation.data, ...prev]);
    }
  }, [createVideoMutation.data, setVideos, close]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<Text weight={700}>Create Video</Text>}
      >
        {/* Show an error message if the API call fails */}
        {createVideoMutation.isError ? (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Bummer!"
            color="red"
            mb={"xs"}
          >
            <div>
              An error occurred:{" "}
              {createVideoMutation.error?.response?.data.message}
            </div>
          </Alert>
        ) : null}

        <form onSubmit={onSubmitCreateVideoForm}>
          <TextInput
            label="Title"
            placeholder="My Amazing Video"
            required
            {...videoForm.getInputProps("title")}
          />
          <TextInput
            label="Video URL"
            placeholder="Your video URL"
            required
            {...videoForm.getInputProps("url")}
            mt={"md"}
          />
          <TextInput
            label="Thumbnail URL"
            placeholder="What will your users see?"
            required
            {...videoForm.getInputProps("thumbnailUrl")}
            mt={"md"}
          />
          <Textarea
            label="Description"
            placeholder="Video Information"
            required
            {...videoForm.getInputProps("description")}
            mt={"md"}
          />
          <Checkbox
            {...videoForm.getInputProps("isPublished")}
            mt={"md"}
            label={"Is Published"}
          />

          <Button mt={"md"} fullWidth color={"teal"} type={"submit"}>
            Create Video
          </Button>
        </form>
      </Modal>

      <Stack>
        <Group sx={{ justifyContent: "space-between" }}>
          <Title order={3}>All Published Videos</Title>
          <Button color={"teal"} onClick={open}>
            Add Video
          </Button>
        </Group>
        <Divider />
      </Stack>
    </>
  );
}

export default VideosHeader;
