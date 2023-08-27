import PostDetail from "@/components/post/PostDetail";
import { api_config } from "@/config/common/api-config";
import { HttpMethod } from "@/config/enums";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = `${process.env.BASE_URL}/api/post/get-post-by-slug?slug=${context.params?.slug}`;

  const response = await fetch(url, {
    ...api_config,
    method: HttpMethod.GET,
  });

  const post: IPost = await response.json();

  return { props: { post } };
};

export default function PostDetailPage({ post }: { post: IPost }) {
  return <PostDetail {...post} />;
}
