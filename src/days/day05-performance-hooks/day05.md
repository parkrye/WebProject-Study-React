# Day 05: Performance Hooks

## 학습 목표
- useCallback으로 함수 메모이제이션하기
- useMemo로 계산 결과 메모이제이션하기
- useRef로 DOM 접근 및 값 저장하기
- React.memo와 함께 성능 최적화하기

---

## 1. useCallback이란?

### 정의

**useCallback**은 함수를 메모이제이션(memoization)하는 React Hook입니다. 의존성 배열의 값이 변경되지 않는 한, 이전에 생성된 동일한 함수 참조를 반환합니다.

```tsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]  // 의존성 배열
);
```

### 왜 필요한가?

React 컴포넌트가 리렌더링될 때마다 내부의 함수들은 새로 생성됩니다.

- **문제 1:** 새 함수 참조가 생성되면 React.memo로 감싼 자식 컴포넌트도 리렌더링됨
- **문제 2:** useEffect의 의존성 배열에 함수가 있으면 매번 effect가 실행됨
- **해결:** useCallback으로 함수 참조를 유지하여 불필요한 리렌더링 방지

### 잘못된 예시 vs 올바른 예시

**잘못된 예시:**
```tsx
// 매 렌더링마다 새 함수 생성
const handleClick = () => {
  setCount(prev => prev + 1);
};

// memo로 감싸도 소용없음!
<MemoizedChild onClick={handleClick} />
```

**올바른 예시:**
```tsx
// 의존성이 변경되지 않으면 동일 참조
const handleClick = useCallback(() => {
  setCount(prev => prev + 1);
}, []);

// memo가 제대로 동작!
<MemoizedChild onClick={handleClick} />
```

### useCallback + React.memo 예시

```tsx
// memo로 감싼 자식 컴포넌트
const MemoizedButton = memo(function MemoizedButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  console.log(`[MemoizedButton] "${label}" 렌더링됨`);
  return <button onClick={onClick}>{label}</button>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // useCallback으로 함수 메모이제이션
  const handleClickGood = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // 의존성 없음 - 항상 동일한 함수 참조

  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div>
      <p>카운트: {count}</p>
      <MemoizedButton onClick={handleClickGood} label="증가" />
      <MemoizedButton onClick={handleReset} label="초기화" />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="입력해도 버튼은 리렌더링 안 됨"
      />
    </div>
  );
}
```

---

## 2. useMemo란?

### 정의

**useMemo**는 계산 결과값을 메모이제이션하는 React Hook입니다. 의존성 배열의 값이 변경되지 않는 한, 이전에 계산된 값을 재사용합니다.

```tsx
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]  // 의존성 배열
);
```

### 왜 필요한가?

- **비용이 큰 계산 최적화:** 복잡한 필터링, 정렬, 수학 연산 등
- **참조 동등성 유지:** 객체/배열을 자식 컴포넌트에 전달할 때
- **불필요한 재계산 방지:** 관련 없는 상태 변경 시 재계산 스킵

### 주의사항

- useMemo는 성능 최적화를 위한 것이며, 의미론적 보장이 아닙니다.
- React는 메모리 확보를 위해 메모이제이션된 값을 삭제할 수 있습니다.
- 모든 계산에 useMemo를 사용하면 오히려 성능이 저하될 수 있습니다.

### useMemo 예시 - 대용량 배열 필터링

```tsx
function UseMemoDemo() {
  const [count, setCount] = useState(0);
  const [numbers] = useState(() =>
    Array.from({ length: 10000 }, (_, i) => i + 1)
  );
  const [filterValue, setFilterValue] = useState(5000);

  // 비용이 큰 계산 (필터링) - filterValue 변경시에만 실행
  const filteredNumbers = useMemo(() => {
    console.log("[useMemo] 필터링 계산 실행!");
    return numbers.filter((n) => n <= filterValue);
  }, [numbers, filterValue]);

  // 합계 계산 - filteredNumbers 변경시에만 실행
  const sum = useMemo(() => {
    console.log("[useMemo] 합계 계산 실행!");
    return filteredNumbers.reduce((acc, n) => acc + n, 0);
  }, [filteredNumbers]);

  return (
    <div>
      <input
        type="range"
        min="1"
        max="10000"
        value={filterValue}
        onChange={(e) => setFilterValue(Number(e.target.value))}
      />
      <p>필터링된 개수: {filteredNumbers.length}</p>
      <p>합계: {sum}</p>
      <button onClick={() => setCount(count + 1)}>
        관계없는 상태 변경 (count: {count})
      </button>
    </div>
  );
}
```

---

## 3. useRef란?

### 정의

**useRef**는 렌더링 간에 값을 유지하면서도 변경해도 리렌더링을 트리거하지 않는 "변경 가능한 참조 객체"를 생성하는 React Hook입니다.

```tsx
// DOM 요소 참조
const inputRef = useRef<HTMLInputElement>(null);

// 변경 가능한 값 저장
const countRef = useRef<number>(0);

// 사용
inputRef.current?.focus();
countRef.current++;
```

### 왜 필요한가?

- **DOM 접근:** input focus, 스크롤, 캔버스 조작 등
- **이전 값 저장:** 이전 상태값과 비교할 때
- **리렌더링 없는 값 저장:** 렌더링과 무관한 값 (타이머 ID, 카운터 등)
- **컴포넌트 인스턴스 값:** 클래스의 인스턴스 변수와 유사한 용도

### useRef vs useState

| 특성 | useRef | useState |
|------|--------|----------|
| 값 변경 시 리렌더링 | X (안 함) | O (함) |
| 값 접근 방식 | .current | 직접 접근 |
| 주 용도 | DOM, 타이머, 이전 값 | UI 상태 |

### useRef 예시 1 - DOM 요소 접근

```tsx
function DOMRefDemo() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="포커스 테스트" />
      <button onClick={() => inputRef.current?.focus()}>
        Input에 포커스
      </button>
      <button onClick={() => {
        if (inputRef.current) {
          inputRef.current.value = "프로그래밍으로 입력!";
        }
      }}>
        값 직접 변경
      </button>
    </div>
  );
}
```

### useRef 예시 2 - 이전 값 저장

```tsx
function PreviousValueDemo() {
  const [value, setValue] = useState("");
  const previousValue = useRef("");

  // 값이 변경된 후에 이전 값 업데이트
  useEffect(() => {
    previousValue.current = value;
  }, [value]);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>현재 값: {value}</p>
      <p>이전 값: {previousValue.current}</p>
    </div>
  );
}
```

### useRef 예시 3 - 타이머 관리

```tsx
function TimerDemo() {
  const timerIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      timerIdRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  }, [isRunning]);

  const stopTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
    setIsRunning(false);
  }, []);

  // cleanup
  useEffect(() => {
    return () => {
      if (timerIdRef.current) clearInterval(timerIdRef.current);
    };
  }, []);

  return (
    <div>
      <p>{seconds}초</p>
      <button onClick={startTimer} disabled={isRunning}>시작</button>
      <button onClick={stopTimer} disabled={!isRunning}>정지</button>
    </div>
  );
}
```

---

## 핵심 정리

| Hook | 목적 | 반환값 | 사용 시점 |
|------|------|--------|----------|
| **useCallback** | 함수 메모이제이션 | 메모이제이션된 함수 | memo 컴포넌트에 함수 전달, useEffect 의존성에 함수 포함 |
| **useMemo** | 계산 결과 메모이제이션 | 메모이제이션된 값 | 비용이 큰 계산, 객체/배열 참조 유지 |
| **useRef** | 변경 가능한 참조 저장 | `{ current: value }` | DOM 요소 접근, 이전 값 저장, 타이머 ID 저장 |

### 성능 최적화 체크리스트

1. 먼저 **측정**하고 문제가 있을 때만 최적화하세요.
2. 자식 컴포넌트를 **React.memo**로 감싸고, 함수 props는 **useCallback**으로 감싸세요.
3. 비용이 큰 계산은 **useMemo**로 메모이제이션하세요.
4. DOM 접근이나 리렌더링 없이 값을 저장할 때는 **useRef**를 사용하세요.
5. 과도한 최적화는 오히려 **성능을 저하**시킬 수 있습니다.

---

## 실습 (Practice)

### 실습 목표
useCallback과 useMemo를 적절히 사용하여 성능을 최적화합니다.

### TODO 리스트

#### 1. 검색 필터링 최적화
- items 배열에서 searchTerm으로 필터링
- useMemo를 사용하여 검색어가 변경될 때만 필터링 실행

#### 2. 정렬 + 필터링 조합
- users 배열을 이름으로 필터링하고 나이순 정렬
- useMemo 사용

#### 3. useCallback으로 함수 메모이제이션
- MemoButton에 전달되는 함수들을 useCallback으로 최적화
- increment, decrement, reset 함수

#### 4. 리스트 아이템 삭제 함수 최적화
- MemoListItem에 전달되는 onDelete를 useCallback으로 최적화

#### 5. 통계 계산 최적화
- numbers 배열의 합계, 평균, 최대값, 최소값 계산
- useMemo로 최적화

---

## 숙제 (Homework)

### 과제: 최적화된 데이터 테이블

#### 데이터 구조
```tsx
interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  joinDate: string;
  isActive: boolean;
}
```

#### 요구사항

**1. 테이블 기능**
- 열 클릭으로 정렬 (오름차순/내림차순 토글)
- 검색 기능 (이름, 부서로 필터링)
- 부서별 필터 (드롭다운)
- 활성/비활성 사원 필터

**2. 통계 패널 (useMemo로 최적화)**
- 총 직원 수
- 평균 급여
- 부서별 인원 수
- 최고/최저 급여

**3. 행 컴포넌트 최적화**
- 각 행을 별도 컴포넌트로 분리
- memo로 감싸기
- 삭제, 편집 버튼의 핸들러를 useCallback으로 최적화

**4. 페이지네이션**
- 페이지당 5개 항목
- 현재 페이지에 해당하는 항목만 표시
- useMemo로 현재 페이지 데이터 계산

#### 힌트
- 정렬, 필터링, 페이지네이션을 순서대로 적용
- 각 연산을 useMemo로 캐싱
- 자식 컴포넌트에 전달하는 함수는 useCallback으로 감싸기

#### 예시 데이터
```tsx
const initialEmployees = [
  { id: 1, name: "김철수", department: "개발", salary: 5000000, joinDate: "2020-01-15", isActive: true },
  { id: 2, name: "이영희", department: "디자인", salary: 4500000, joinDate: "2021-03-20", isActive: true },
  { id: 3, name: "박민수", department: "개발", salary: 5500000, joinDate: "2019-07-01", isActive: false },
  // ...
];
```
