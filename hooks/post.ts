import { graphqlClient } from "@/clients/api";
import { CreatePostData } from "@/gql/graphql";
import { createPostMutation } from "@/graphql/mutations/post";
import { getAllPostQuery } from "@/graphql/query/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreatePostData) =>
      graphqlClient.request(createPostMutation, { payload }),
      onMutate: (payload) => toast.loading('Creating Post' , {id: '1'}),
      onSuccess: async(payload) =>{
       await queryClient.invalidateQueries({ queryKey: ["all-posts"] }),
       toast.success('Your post was sent', {id: '1'})
      },  
  });

  return mutation;
};

export const useGetAllPosts = () => {
  const query = useQuery({
    queryKey: ["all-posts"],
    queryFn: () => graphqlClient.request(getAllPostQuery),
  });
  return { ...query, posts: query.data?.getAllPosts };
};
