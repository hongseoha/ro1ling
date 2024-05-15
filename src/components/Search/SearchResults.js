import React from 'react';
import Loading from "components/common/Loading";
import CardList from "components/ListPage/CardList"; // CardList 컴포넌트를 import합니다.
// import styles from './SearchResults.module.css'; // 스타일 모듈을 import합니다.

export function SearchResults({ searchInput, searching, isLoading }) {
  if (!Array.isArray(searchInput)) {
    console.error('searchInput is not an array:', searchInput);
    return <p>No results found</p>;
  }

  return (
    <article aria-busy={searching}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ol>
            {searchInput.length > 0 ? (
              searchInput.map((item) => {
                if (item && item.id) {
                  return <CardList key={item.id} slideItems={item} />;
                }
                console.error('Item is missing id:', item);
                return null;
              })
            ) : (
              <p>No results found</p> // 검색 결과가 없을 때 보여줄 메시지
            )}
          </ol>
          <div id="observer" />
        </>
      )}
    </article>
  );
}
