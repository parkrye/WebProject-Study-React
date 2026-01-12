/**
 * ========================================
 * Day 09: 실습 - useCallback & useMemo
 * ========================================
 *
 * 🎯 실습 목표:
 * useCallback과 useMemo를 적절히 사용하여 성능을 최적화합니다.
 */

import { useState, useCallback, useMemo, memo } from "react";

// ----------------------------------------
// 실습용 자식 컴포넌트들
// ----------------------------------------

// memo로 감싼 버튼 컴포넌트
const MemoButton = memo(function MemoButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  console.log(`MemoButton "${children}" 렌더링`);
  return (
    <button onClick={onClick} style={{ marginRight: "10px" }}>
      {children}
    </button>
  );
});

// memo로 감싼 리스트 아이템
const MemoListItem = memo(function MemoListItem({
  item,
  onDelete,
}: {
  item: { id: number; text: string };
  onDelete: (id: number) => void;
}) {
  console.log(`MemoListItem "${item.text}" 렌더링`);
  return (
    <li>
      {item.text}
      <button onClick={() => onDelete(item.id)} style={{ marginLeft: "10px" }}>
        삭제
      </button>
    </li>
  );
});

function Practice() {
  // TODO 1: 검색 필터링 최적화
  // - items 배열에서 searchTerm으로 필터링
  // - useMemo를 사용하여 검색어가 변경될 때만 필터링 실행
  const [searchTerm, setSearchTerm] = useState("");
  const [otherCount, setOtherCount] = useState(0);

  const items = [
    "React 배우기",
    "TypeScript 공부",
    "JavaScript 복습",
    "CSS 스타일링",
    "Node.js 서버",
    "데이터베이스 설계",
  ];

  // TODO: useMemo로 필터링 최적화
  // const filteredItems = ...

  // TODO 2: 정렬 + 필터링 조합
  // - users 배열을 이름으로 필터링하고 나이순 정렬
  // - useMemo 사용
  const [nameFilter, setNameFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const users = [
    { id: 1, name: "김철수", age: 25 },
    { id: 2, name: "이영희", age: 30 },
    { id: 3, name: "박민수", age: 22 },
    { id: 4, name: "정수진", age: 28 },
    { id: 5, name: "김영수", age: 35 },
  ];

  // TODO: useMemo로 필터링+정렬 최적화
  // const sortedAndFiltered = ...

  // TODO 3: useCallback으로 함수 메모이제이션
  // - MemoButton에 전달되는 함수들을 useCallback으로 최적화
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // TODO: useCallback 적용
  // const increment = ...
  // const decrement = ...
  // const reset = ...

  // TODO 4: 리스트 아이템 삭제 함수 최적화
  // - MemoListItem에 전달되는 onDelete를 useCallback으로 최적화
  const [todoList, setTodoList] = useState([
    { id: 1, text: "할 일 1" },
    { id: 2, text: "할 일 2" },
    { id: 3, text: "할 일 3" },
  ]);

  // TODO: useCallback 적용
  // const handleDelete = ...

  // TODO 5: 통계 계산 최적화
  // - numbers 배열의 합계, 평균, 최대값, 최소값 계산
  // - useMemo로 최적화
  const [numbers] = useState([10, 25, 30, 45, 50, 15, 20, 35]);
  const [dummy, setDummy] = useState(0);

  // TODO: useMemo로 통계 계산 최적화
  // const stats = useMemo(() => ({
  //   sum: ...,
  //   average: ...,
  //   max: ...,
  //   min: ...,
  // }), [numbers]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 09: 실습</h1>

      {/* TODO 1 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>1. 검색 필터링</h2>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색..."
        />
        <button
          onClick={() => setOtherCount(otherCount + 1)}
          style={{ marginLeft: "10px" }}
        >
          다른 상태 변경 ({otherCount})
        </button>
        <ul>
          {/* filteredItems.map(...) */}
        </ul>
      </section>

      {/* TODO 2 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>2. 정렬 + 필터링</h2>
        <input
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          placeholder="이름 검색..."
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          style={{ marginLeft: "10px" }}
        >
          <option value="asc">나이 오름차순</option>
          <option value="desc">나이 내림차순</option>
        </select>
        <ul>
          {/* sortedAndFiltered.map(...) */}
        </ul>
      </section>

      {/* TODO 3 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>3. 버튼 최적화</h2>
        <p>카운트: {count}</p>
        {/* <MemoButton onClick={increment}>+1</MemoButton> */}
        {/* <MemoButton onClick={decrement}>-1</MemoButton> */}
        {/* <MemoButton onClick={reset}>초기화</MemoButton> */}
        <br />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="입력해도 버튼은 리렌더링 안 됨"
          style={{ marginTop: "10px", width: "250px" }}
        />
      </section>

      {/* TODO 4 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>4. 리스트 삭제</h2>
        <ul>
          {/* todoList.map(item => (
            <MemoListItem key={item.id} item={item} onDelete={handleDelete} />
          )) */}
        </ul>
      </section>

      {/* TODO 5 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>5. 통계 계산</h2>
        <p>배열: [{numbers.join(", ")}]</p>
        {/* <p>합계: {stats.sum}</p> */}
        {/* <p>평균: {stats.average.toFixed(2)}</p> */}
        {/* <p>최대: {stats.max}</p> */}
        {/* <p>최소: {stats.min}</p> */}
        <button onClick={() => setDummy(dummy + 1)}>
          다른 상태 변경 ({dummy}) - 계산 다시 안 됨
        </button>
      </section>
    </div>
  );
}

export default Practice;
