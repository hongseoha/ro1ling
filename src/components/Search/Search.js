import { useEffect, useState } from 'react';
import React from 'react';
import { SearchBox } from './SearchBox';
import { SearchResults } from './SearchResults';
import { getList } from 'apis/recipients';
import { useDebouncedState } from './useDebouncedState';

function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedState(query, 1_000);
  const [results, setResults] = useState([]);
  const [input, setInput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let responseRecent;
      let responseAll;
      try {
        setIsLoading(true);
        responseRecent = await getList();
        const count = responseRecent?.count;
        responseAll =
          count <= 12
            ? responseRecent
            : await getList(0, responseRecent?.count);
      } catch (error) {
        console.error("Error fetching slide items:", error);
        setIsLoading(false); // 에러 발생 시 로딩 상태 해제
        return;
      }

      const resultItem = responseAll?.results || [];
      setResults(resultItem);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (debouncedQuery === '') {
      setInput([]);
    } else {
      const filteredResults = results.filter(item =>
        item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setInput(filteredResults);
    }
  }, [debouncedQuery, results]);

  return (
    <>
      <SearchBox value={query} onChange={(e) => setQuery(e.target.value)} />
      {debouncedQuery && <SearchResults searchInput={input} searching={isLoading} isLoading={isLoading} />}
    </>
  );
}

export default Search;