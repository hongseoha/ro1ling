export function SearchBox({ value, onChange }) {
  return (
    <input
      type="search"
      placeholder="검색어를 입력하세요"
      value={value}
      onChange={onChange}
    />
  );
}