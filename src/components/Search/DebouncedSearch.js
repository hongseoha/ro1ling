import { useEffect, useState } from 'react';
import { fetchSearchInput } from './countries';
import { useDebouncedState } from './useDebouncedState';
import React from 'react';
import { SearchBox } from './SearchBox';
import { SearchResults } from './SearchResults';
import { getList } from 'apis/recipients';

export function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedState(query, 1_000);
  const [search, setSearch] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setSearching(true);
    fetchSearchInput(debouncedQuery).then((search) => {
      setSearch(search);
      setSearching(false);
    });
  }, [debouncedQuery]);

  return (
    <>
      <SearchBox value={query} onChange={(e) => setQuery(e.target.value)} />
      <SearchResults Search={search} searching={searching} />
    </>
  );
} 