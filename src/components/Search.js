import React, { useState } from "react";
import { withApollo } from "@apollo/react-hoc";

import Link from "./Link";

import { FEED_SEARCH_QUERY } from "../apollo/query";

const Search = ({ client }) => {
  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState("");

  const _executeSearch = async () => {
    const result = await client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter },
    });
    setLinks(result.data.feed.links);
  };

  return (
    <div>
      <div>
        Search
        <input
          className="ml2"
          type="text"
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={_executeSearch}>OK</button>
      </div>
      {links.map((link, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  );
};

export default withApollo(Search);
