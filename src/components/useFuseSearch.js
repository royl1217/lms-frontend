import { useState, useMemo } from "react";
import Fuse from "fuse.js";

export const useFuseSearch = (data, keys, options = {}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const fuse = useMemo(() => {
    if (!data) return null;
    const fuseOptions = { keys, ...options };
    return new Fuse(data, fuseOptions);
  }, [data, keys, options]);

  // Directly compute and return the search results from the memoized value.
  const searchResults = useMemo(() => {
    if (!fuse || !searchTerm) {
      // return data || [];
      return [];
    }
    const results = fuse.search(searchTerm);
    return results.map((result) => result.item);
  }, [fuse, searchTerm, data]);

  return [searchResults, searchTerm, setSearchTerm];
};
