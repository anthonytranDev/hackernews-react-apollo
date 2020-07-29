import React, { Component, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import { LINKS_PER_PAGE } from "../constants";

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLink = (props) => {
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [createPost] = useMutation(POST_MUTATION);

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <button
        onClick={() => {
          return createPost({
            variables: { description, url },
            onCompleted: () => props.history.push("/new/1"),
            onError: (error) => console.error(error),
            optimisticResponse: {
              __typename: "Mutation",
              post: {
                __typename: "Link",
                description,
                url,
              },
            },
          });
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default CreateLink;
