/**
 * ========================================
 * Day 09: useCallback & useMemo
 * ========================================
 *
 * 📚 학습 목표:
 * 1. 메모이제이션의 개념을 이해한다
 * 2. useCallback으로 함수를 메모이제이션할 수 있다
 * 3. useMemo로 계산 결과를 메모이제이션할 수 있다
 * 4. 언제 사용해야 하는지 판단할 수 있다
 */

import { useState, useCallback, useMemo, memo } from "react";

// ----------------------------------------
// 1. 왜 메모이제이션이 필요한가?
// ----------------------------------------
/**
 * React 컴포넌트가 리렌더링되면:
 * - 함수 내부의 모든 코드가 다시 실행됨
 * - 모든 변수, 함수가 새로 생성됨
 *
 * 문제:
 * - 비용이 큰 계산이 매번 실행됨
 * - 자식 컴포넌트에 전달되는 함수가 매번 새로 생성됨
 *   → 불필요한 리렌더링 발생
 *
 * 해결:
 * - useMemo: 계산 결과를 기억
 * - useCallback: 함수를 기억
 */

// ----------------------------------------
// 2. useMemo - 계산 결과 메모이제이션
// ----------------------------------------
/**
 * const memoizedValue = useMemo(() => {
 *   return 비용이 큰 계산;
 * }, [의존성]);
 *
 * 의존성이 변경되지 않으면 이전 계산 결과를 재사용
 */

function ExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [numbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  // ❌ 매 렌더링마다 계산됨
  // const sum = numbers.reduce((a, b) => a + b, 0);

  // ✅ numbers가 변경될 때만 계산됨
  const sum = useMemo(() => {
    console.log("합계 계산 중...");
    return numbers.reduce((a, b) => a + b, 0);
  }, [numbers]);

  // 비용이 큰 계산 시뮬레이션
  const expensiveValue = useMemo(() => {
    console.log("비용이 큰 계산 실행!");
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result;
  }, []); // 빈 배열 = 마운트 시 한 번만

  return (
    <div>
      <h3>useMemo - 계산 결과 메모이제이션</h3>
      <p>배열 합계: {sum}</p>
      <p>비용이 큰 계산: {expensiveValue.toLocaleString()}</p>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        카운트 증가 (콘솔 확인)
      </button>
      <p style={{ fontSize: "12px", color: "gray" }}>
        카운트를 증가시켜도 계산이 다시 실행되지 않음
      </p>
    </div>
  );
}

// ----------------------------------------
// 3. useMemo로 필터링/정렬
// ----------------------------------------

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

function FilteredList() {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const [otherState, setOtherState] = useState(0);

  const products: Product[] = [
    { id: 1, name: "노트북", price: 1500000, category: "전자기기" },
    { id: 2, name: "마우스", price: 35000, category: "전자기기" },
    { id: 3, name: "키보드", price: 89000, category: "전자기기" },
    { id: 4, name: "의자", price: 250000, category: "가구" },
    { id: 5, name: "책상", price: 180000, category: "가구" },
  ];

  // filter나 sortBy가 변경될 때만 재계산
  const filteredAndSorted = useMemo(() => {
    console.log("필터링 및 정렬 실행!");

    let result = products;

    // 필터링
    if (filter) {
      result = result.filter(
        (p) =>
          p.name.includes(filter) || p.category.includes(filter)
      );
    }

    // 정렬
    result = [...result].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.price - b.price;
    });

    return result;
  }, [filter, sortBy]); // products는 고정값이므로 제외 가능

  return (
    <div>
      <h3>useMemo - 필터링/정렬</h3>
      <div style={{ marginBottom: "10px" }}>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="검색..."
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "name" | "price")}
          style={{ marginLeft: "10px" }}
        >
          <option value="name">이름순</option>
          <option value="price">가격순</option>
        </select>
        <button
          onClick={() => setOtherState(otherState + 1)}
          style={{ marginLeft: "10px" }}
        >
          다른 상태 변경 ({otherState})
        </button>
      </div>
      <ul>
        {filteredAndSorted.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price.toLocaleString()}원
          </li>
        ))}
      </ul>
      <p style={{ fontSize: "12px", color: "gray" }}>
        "다른 상태 변경" 버튼은 필터링을 다시 실행하지 않음
      </p>
    </div>
  );
}

// ----------------------------------------
// 4. useCallback - 함수 메모이제이션
// ----------------------------------------
/**
 * const memoizedFn = useCallback(() => {
 *   // 함수 로직
 * }, [의존성]);
 *
 * 의존성이 변경되지 않으면 같은 함수 참조를 유지
 *
 * 주로 사용하는 경우:
 * - 자식 컴포넌트에 함수를 props로 전달할 때
 * - useEffect의 의존성에 함수가 포함될 때
 */

// memo로 감싼 자식 컴포넌트 (props가 같으면 리렌더링 안 함)
const ChildButton = memo(function ChildButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  console.log(`ChildButton "${label}" 렌더링`);
  return <button onClick={onClick}>{label}</button>;
});

function CallbackExample() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // ❌ 매 렌더링마다 새 함수 생성 → ChildButton 리렌더링
  // const handleClick = () => {
  //   setCount(count + 1);
  // };

  // ✅ count가 변경될 때만 새 함수 생성
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // 함수형 업데이트 사용으로 의존성 제거 가능

  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div>
      <h3>useCallback - 함수 메모이제이션</h3>
      <p>카운트: {count}</p>
      <div style={{ marginBottom: "10px" }}>
        <ChildButton onClick={handleClick} label="증가" />
        <ChildButton onClick={handleReset} label="초기화" />
      </div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="입력해도 버튼은 리렌더링 안 됨"
        style={{ width: "250px" }}
      />
      <p style={{ fontSize: "12px", color: "gray" }}>
        콘솔에서 ChildButton 렌더링 로그 확인
      </p>
    </div>
  );
}

// ----------------------------------------
// 5. 언제 사용해야 하는가?
// ----------------------------------------
/**
 * 🚫 모든 곳에 사용하지 마세요!
 *
 * useMemo 사용:
 * ✅ 계산 비용이 큰 경우
 * ✅ 참조 동등성이 중요한 경우 (객체/배열을 props로 전달)
 * ❌ 간단한 계산
 *
 * useCallback 사용:
 * ✅ memo로 감싼 자식에게 함수 전달
 * ✅ useEffect 의존성에 함수 포함
 * ❌ 최적화가 필요 없는 일반적인 경우
 *
 * 과도한 메모이제이션은 오히려 성능을 저하시킬 수 있음!
 */

function WhenToUse() {
  return (
    <div>
      <h3>언제 사용해야 하는가?</h3>
      <div style={{ backgroundColor: "#f5f5f5", padding: "15px", borderRadius: "8px" }}>
        <h4>useMemo</h4>
        <ul>
          <li>✅ 비용이 큰 계산 (정렬, 필터링, 복잡한 연산)</li>
          <li>✅ 객체/배열을 자식 컴포넌트에 전달할 때</li>
          <li>❌ 간단한 계산은 그냥 실행이 더 효율적</li>
        </ul>
        <h4>useCallback</h4>
        <ul>
          <li>✅ React.memo로 최적화된 자식에게 함수 전달</li>
          <li>✅ useEffect 의존성 배열에 함수 포함 시</li>
          <li>❌ 최적화가 필요 없는 일반 함수</li>
        </ul>
        <p style={{ marginTop: "10px", fontStyle: "italic" }}>
          "먼저 측정하고, 필요할 때만 최적화하세요"
        </p>
      </div>
    </div>
  );
}

// ----------------------------------------
// 메인 컴포넌트
// ----------------------------------------

function Study() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 09: useCallback & useMemo</h1>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <ExpensiveCalculation />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <FilteredList />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <CallbackExample />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <WhenToUse />
      </section>
    </div>
  );
}

export default Study;
