/**
 * ========================================
 * Day 05: Performance Hooks
 * useCallback, useMemo, useRef
 * ========================================
 */

import { useState, useCallback, useMemo, useRef, memo, useEffect } from "react";

// ========================================
// CodeDemo 컴포넌트 (데모 + 코드 병기)
// ========================================

interface CodeDemoProps {
  title: string;
  code: string;
  children: React.ReactNode;
}

function CodeDemo({ title, code, children }: CodeDemoProps) {
  const [showCode, setShowCode] = useState(true);

  return (
    <div style={{
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      marginBottom: "20px",
      overflow: "hidden"
    }}>
      <div style={{
        backgroundColor: "#f5f5f5",
        padding: "10px 15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <strong>{title}</strong>
        <button
          onClick={() => setShowCode(!showCode)}
          style={{
            padding: "5px 10px",
            backgroundColor: showCode ? "#2196f3" : "#9e9e9e",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px"
          }}
        >
          {showCode ? "코드 숨기기" : "코드 보기"}
        </button>
      </div>
      <div style={{
        padding: "20px",
        backgroundColor: "#e8f5e9"
      }}>
        <div style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>실행 결과</div>
        {children}
      </div>
      {showCode && (
        <div style={{
          padding: "15px",
          backgroundColor: "#263238"
        }}>
          <div style={{ fontSize: "12px", color: "#78909c", marginBottom: "10px" }}>소스 코드</div>
          <pre style={{
            backgroundColor: "#1e1e1e",
            color: "#d4d4d4",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
            margin: 0,
            fontSize: "13px",
            lineHeight: "1.5"
          }}>
            {code}
          </pre>
        </div>
      )}
    </div>
  );
}

// ========================================
// 섹션 1: useCallback 정의 및 개념
// ========================================

function UseCallbackDefinition() {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>1. useCallback이란?</h2>

      {/* 정의 박스 */}
      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>정의</h3>
        <p style={{ margin: 0 }}>
          <strong>useCallback</strong>은 함수를 메모이제이션(memoization)하는 React Hook입니다.
          의존성 배열의 값이 변경되지 않는 한, 이전에 생성된 동일한 함수 참조를 반환합니다.
        </p>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          marginTop: "15px",
          overflow: "auto"
        }}>
{`const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]  // 의존성 배열
);`}
        </pre>
      </div>

      {/* 왜 필요한지 */}
      <div style={{
        backgroundColor: "#fff3e0",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>왜 필요한가?</h3>
        <p>React 컴포넌트가 리렌더링될 때마다 내부의 함수들은 새로 생성됩니다.</p>
        <ul>
          <li><strong>문제 1:</strong> 새 함수 참조가 생성되면 React.memo로 감싼 자식 컴포넌트도 리렌더링됨</li>
          <li><strong>문제 2:</strong> useEffect의 의존성 배열에 함수가 있으면 매번 effect가 실행됨</li>
          <li><strong>해결:</strong> useCallback으로 함수 참조를 유지하여 불필요한 리렌더링 방지</li>
        </ul>
      </div>
    </div>
  );
}

// ========================================
// 섹션 2: useCallback 동작 원리 및 예제
// ========================================

// memo로 감싼 자식 컴포넌트
const MemoizedButton = memo(function MemoizedButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  console.log(`[MemoizedButton] "${label}" 렌더링됨`);
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        marginRight: "10px",
        backgroundColor: "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      {label}
    </button>
  );
});

function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const renderCount = useRef(0);
  renderCount.current++;

  // 올바른 예시: useCallback으로 함수 메모이제이션
  const handleClickGood = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  const useCallbackCode = `// memo로 감싼 자식 컴포넌트
const MemoizedButton = memo(function MemoizedButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  console.log(\`[MemoizedButton] "\${label}" 렌더링됨\`);
  return <button onClick={onClick}>{label}</button>;
});

function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const renderCount = useRef(0);
  renderCount.current++;

  // useCallback으로 함수 메모이제이션
  const handleClickGood = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // 의존성 없음 - 항상 동일한 함수 참조

  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div>
      <p>렌더링 횟수: {renderCount.current}</p>
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
}`;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>2. useCallback 동작 원리</h2>

      <CodeDemo title="useCallback + React.memo 데모" code={useCallbackCode}>
        <p>렌더링 횟수: <strong>{renderCount.current}</strong></p>
        <p>카운트: <strong>{count}</strong></p>

        <div style={{ marginBottom: "15px" }}>
          <MemoizedButton onClick={handleClickGood} label="증가 (최적화)" />
          <MemoizedButton onClick={handleReset} label="초기화" />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="입력해도 버튼은 리렌더링 안 됨"
            style={{ padding: "8px", width: "300px" }}
          />
        </div>

        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
          텍스트 입력 시 콘솔에서 버튼 렌더링 로그를 확인하세요.
          useCallback 덕분에 버튼은 리렌더링되지 않습니다.
        </p>
      </CodeDemo>

      {/* 잘못된 예시 vs 올바른 예시 비교 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{
          backgroundColor: "#ffebee",
          padding: "15px",
          borderRadius: "8px"
        }}>
          <h4 style={{ color: "#c62828" }}>잘못된 예시</h4>
          <pre style={{ fontSize: "13px", overflow: "auto" }}>
{`// 매 렌더링마다 새 함수 생성
const handleClick = () => {
  setCount(prev => prev + 1);
};

// memo로 감싸도 소용없음!
<MemoizedChild onClick={handleClick} />`}
          </pre>
        </div>
        <div style={{
          backgroundColor: "#e8f5e9",
          padding: "15px",
          borderRadius: "8px"
        }}>
          <h4 style={{ color: "#2e7d32" }}>올바른 예시</h4>
          <pre style={{ fontSize: "13px", overflow: "auto" }}>
{`// 의존성이 변경되지 않으면 동일 참조
const handleClick = useCallback(() => {
  setCount(prev => prev + 1);
}, []);

// memo가 제대로 동작!
<MemoizedChild onClick={handleClick} />`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 섹션 3: useMemo 정의 및 개념
// ========================================

function UseMemoDefinition() {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>3. useMemo란?</h2>

      {/* 정의 박스 */}
      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>정의</h3>
        <p style={{ margin: 0 }}>
          <strong>useMemo</strong>는 계산 결과값을 메모이제이션하는 React Hook입니다.
          의존성 배열의 값이 변경되지 않는 한, 이전에 계산된 값을 재사용합니다.
        </p>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          marginTop: "15px",
          overflow: "auto"
        }}>
{`const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]  // 의존성 배열
);`}
        </pre>
      </div>

      {/* 왜 필요한지 */}
      <div style={{
        backgroundColor: "#fff3e0",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>왜 필요한가?</h3>
        <ul>
          <li><strong>비용이 큰 계산 최적화:</strong> 복잡한 필터링, 정렬, 수학 연산 등</li>
          <li><strong>참조 동등성 유지:</strong> 객체/배열을 자식 컴포넌트에 전달할 때</li>
          <li><strong>불필요한 재계산 방지:</strong> 관련 없는 상태 변경 시 재계산 스킵</li>
        </ul>
      </div>

      {/* 주의 박스 */}
      <div style={{
        backgroundColor: "#ffebee",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#c62828" }}>주의사항</h3>
        <ul>
          <li>useMemo는 성능 최적화를 위한 것이며, 의미론적 보장이 아닙니다.</li>
          <li>React는 메모리 확보를 위해 메모이제이션된 값을 삭제할 수 있습니다.</li>
          <li>모든 계산에 useMemo를 사용하면 오히려 성능이 저하될 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
}

// ========================================
// 섹션 4: useMemo 동작 원리 및 예제
// ========================================

function UseMemoDemo() {
  const [count, setCount] = useState(0);
  const [numbers] = useState(() =>
    Array.from({ length: 10000 }, (_, i) => i + 1)
  );
  const [filterValue, setFilterValue] = useState(5000);

  // 비용이 큰 계산 (필터링)
  const filteredNumbers = useMemo(() => {
    console.log("[useMemo] 필터링 계산 실행!");
    const startTime = performance.now();

    const result = numbers.filter((n) => n <= filterValue);

    const endTime = performance.now();
    console.log(`계산 시간: ${(endTime - startTime).toFixed(2)}ms`);

    return result;
  }, [numbers, filterValue]);

  // 합계 계산
  const sum = useMemo(() => {
    console.log("[useMemo] 합계 계산 실행!");
    return filteredNumbers.reduce((acc, n) => acc + n, 0);
  }, [filteredNumbers]);

  const useMemoCode = `function UseMemoDemo() {
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
}`;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>4. useMemo 동작 원리</h2>

      <CodeDemo title="useMemo - 대용량 배열 필터링 데모" code={useMemoCode}>
        <div style={{ marginBottom: "15px" }}>
          <label>
            필터 값 (1 ~ 10000):
            <input
              type="range"
              min="1"
              max="10000"
              value={filterValue}
              onChange={(e) => setFilterValue(Number(e.target.value))}
              style={{ marginLeft: "10px", width: "200px" }}
            />
            <strong style={{ marginLeft: "10px" }}>{filterValue}</strong>
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <p style={{ margin: "5px 0" }}>필터링된 개수: <strong>{filteredNumbers.length.toLocaleString()}</strong>개</p>
          <p style={{ margin: "5px 0" }}>합계: <strong>{sum.toLocaleString()}</strong></p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <button
            onClick={() => setCount(count + 1)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#9c27b0",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            관계없는 상태 변경 (count: {count})
          </button>
        </div>

        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
          "관계없는 상태 변경" 버튼을 눌러도 콘솔에 계산 로그가 찍히지 않습니다.
          useMemo 덕분에 filterValue가 변경될 때만 재계산됩니다.
        </p>
      </CodeDemo>

      {/* 잘못된 예시 vs 올바른 예시 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{
          backgroundColor: "#ffebee",
          padding: "15px",
          borderRadius: "8px"
        }}>
          <h4 style={{ color: "#c62828" }}>잘못된 예시</h4>
          <pre style={{ fontSize: "13px", overflow: "auto" }}>
{`// 매 렌더링마다 필터링 실행
const filtered = numbers.filter(
  n => n <= filterValue
);

// 매 렌더링마다 합계 계산
const sum = filtered.reduce(
  (acc, n) => acc + n, 0
);`}
          </pre>
        </div>
        <div style={{
          backgroundColor: "#e8f5e9",
          padding: "15px",
          borderRadius: "8px"
        }}>
          <h4 style={{ color: "#2e7d32" }}>올바른 예시</h4>
          <pre style={{ fontSize: "13px", overflow: "auto" }}>
{`// filterValue 변경시에만 필터링
const filtered = useMemo(() =>
  numbers.filter(n => n <= filterValue),
  [numbers, filterValue]
);

// filtered 변경시에만 합계 계산
const sum = useMemo(() =>
  filtered.reduce((acc, n) => acc + n, 0),
  [filtered]
);`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 섹션 5: useRef 정의 및 개념
// ========================================

function UseRefDefinition() {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>5. useRef란?</h2>

      {/* 정의 박스 */}
      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>정의</h3>
        <p style={{ margin: 0 }}>
          <strong>useRef</strong>는 렌더링 간에 값을 유지하면서도 변경해도 리렌더링을
          트리거하지 않는 "변경 가능한 참조 객체"를 생성하는 React Hook입니다.
        </p>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          marginTop: "15px",
          overflow: "auto"
        }}>
{`// DOM 요소 참조
const inputRef = useRef<HTMLInputElement>(null);

// 변경 가능한 값 저장
const countRef = useRef<number>(0);

// 사용
inputRef.current?.focus();
countRef.current++;`}
        </pre>
      </div>

      {/* 왜 필요한지 */}
      <div style={{
        backgroundColor: "#fff3e0",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>왜 필요한가?</h3>
        <ul>
          <li><strong>DOM 접근:</strong> input focus, 스크롤, 캔버스 조작 등</li>
          <li><strong>이전 값 저장:</strong> 이전 상태값과 비교할 때</li>
          <li><strong>리렌더링 없는 값 저장:</strong> 렌더링과 무관한 값 (타이머 ID, 카운터 등)</li>
          <li><strong>컴포넌트 인스턴스 값:</strong> 클래스의 인스턴스 변수와 유사한 용도</li>
        </ul>
      </div>

      {/* useRef vs useState 비교 */}
      <div style={{
        backgroundColor: "#f3e5f5",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>useRef vs useState</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#ce93d8" }}>
              <th style={{ padding: "10px", border: "1px solid #ba68c8" }}>특성</th>
              <th style={{ padding: "10px", border: "1px solid #ba68c8" }}>useRef</th>
              <th style={{ padding: "10px", border: "1px solid #ba68c8" }}>useState</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #e1bee7" }}>값 변경 시 리렌더링</td>
              <td style={{ padding: "10px", border: "1px solid #e1bee7" }}>X (안 함)</td>
              <td style={{ padding: "10px", border: "1px solid #e1bee7" }}>O (함)</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #e1bee7" }}>값 접근 방식</td>
              <td style={{ padding: "10px", border: "1px solid #e1bee7" }}>.current</td>
              <td style={{ padding: "10px", border: "1px solid #e1bee7" }}>직접 접근</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #e1bee7" }}>주 용도</td>
              <td style={{ padding: "10px", border: "1px solid #e1bee7" }}>DOM, 타이머, 이전 값</td>
              <td style={{ padding: "10px", border: "1px solid #e1bee7" }}>UI 상태</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ========================================
// 섹션 6: useRef 동작 원리 및 예제
// ========================================

function UseRefDemo() {
  // DOM 참조용 ref
  const inputRef = useRef<HTMLInputElement>(null);

  // 렌더링 횟수 추적 (리렌더링 안 함)
  const renderCount = useRef(0);

  // 이전 값 저장
  const [value, setValue] = useState("");
  const previousValue = useRef("");

  // 타이머 ID 저장
  const timerIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // 렌더링 횟수 증가
  renderCount.current++;

  // 이전 값 업데이트
  useEffect(() => {
    previousValue.current = value;
  }, [value]);

  // 타이머 시작
  const startTimer = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      timerIdRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  }, [isRunning]);

  // 타이머 정지
  const stopTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
    setIsRunning(false);
  }, []);

  // 타이머 리셋
  const resetTimer = useCallback(() => {
    stopTimer();
    setSeconds(0);
  }, [stopTimer]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    };
  }, []);

  const domRefCode = `function DOMRefDemo() {
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
}`;

  const previousValueCode = `function PreviousValueDemo() {
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
}`;

  const timerCode = `function TimerDemo() {
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
}`;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>6. useRef 동작 원리</h2>

      {/* 데모 1: DOM 접근 */}
      <CodeDemo title="useRef - DOM 요소 접근" code={domRefCode}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="포커스 테스트"
            style={{ padding: "8px", fontSize: "14px" }}
          />
          <button
            onClick={() => inputRef.current?.focus()}
            style={{
              padding: "8px 16px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Input에 포커스
          </button>
          <button
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.value = "프로그래밍으로 입력!";
              }
            }}
            style={{
              padding: "8px 16px",
              backgroundColor: "#7b1fa2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            값 직접 변경
          </button>
        </div>
      </CodeDemo>

      {/* 데모 2: 렌더링 횟수 */}
      <div style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3>렌더링 횟수 추적 (리렌더링 없이)</h3>
        <p>이 컴포넌트의 렌더링 횟수: <strong>{renderCount.current}</strong></p>
        <p style={{ fontSize: "14px", color: "#666" }}>
          renderCount.current를 증가시켜도 리렌더링되지 않습니다.
        </p>
      </div>

      {/* 데모 3: 이전 값 저장 */}
      <CodeDemo title="useRef - 이전 값 저장" code={previousValueCode}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="값을 입력하세요"
          style={{ padding: "8px", fontSize: "14px", width: "200px", marginBottom: "10px" }}
        />
        <p style={{ margin: "5px 0" }}>현재 값: <strong>{value || "(비어있음)"}</strong></p>
        <p style={{ margin: "5px 0" }}>이전 값: <strong>{previousValue.current || "(비어있음)"}</strong></p>
      </CodeDemo>

      {/* 데모 4: 타이머 ID 저장 */}
      <CodeDemo title="useRef - 타이머 관리" code={timerCode}>
        <p style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 15px 0" }}>
          {String(Math.floor(seconds / 60)).padStart(2, "0")}:
          {String(seconds % 60).padStart(2, "0")}
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={startTimer}
            disabled={isRunning}
            style={{
              padding: "8px 16px",
              backgroundColor: isRunning ? "#ccc" : "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isRunning ? "not-allowed" : "pointer"
            }}
          >
            시작
          </button>
          <button
            onClick={stopTimer}
            disabled={!isRunning}
            style={{
              padding: "8px 16px",
              backgroundColor: !isRunning ? "#ccc" : "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: !isRunning ? "not-allowed" : "pointer"
            }}
          >
            정지
          </button>
          <button
            onClick={resetTimer}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            초기화
          </button>
        </div>
        <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
          timerIdRef에 setInterval ID를 저장하여 정지/초기화 시 clearInterval 호출
        </p>
      </CodeDemo>

      {/* 잘못된 예시 vs 올바른 예시 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{
          backgroundColor: "#ffebee",
          padding: "15px",
          borderRadius: "8px"
        }}>
          <h4 style={{ color: "#c62828" }}>잘못된 예시</h4>
          <pre style={{ fontSize: "13px", overflow: "auto" }}>
{`// 타이머 ID를 state로 저장
const [timerId, setTimerId] = useState(null);

// 문제: timerId 변경시 리렌더링 발생
// cleanup 로직이 복잡해짐

const stop = () => {
  clearInterval(timerId);
  setTimerId(null); // 불필요한 리렌더링!
};`}
          </pre>
        </div>
        <div style={{
          backgroundColor: "#e8f5e9",
          padding: "15px",
          borderRadius: "8px"
        }}>
          <h4 style={{ color: "#2e7d32" }}>올바른 예시</h4>
          <pre style={{ fontSize: "13px", overflow: "auto" }}>
{`// 타이머 ID를 ref로 저장
const timerIdRef = useRef(null);

// 리렌더링 없이 타이머 관리
const stop = () => {
  clearInterval(timerIdRef.current);
  timerIdRef.current = null;
  // 리렌더링 없음!
};`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 섹션 7: 핵심 정리 표
// ========================================

function SummaryTable() {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>7. 핵심 정리</h2>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#fff"
      }}>
        <thead>
          <tr style={{ backgroundColor: "#1976d2", color: "white" }}>
            <th style={{ padding: "12px", border: "1px solid #1565c0" }}>Hook</th>
            <th style={{ padding: "12px", border: "1px solid #1565c0" }}>목적</th>
            <th style={{ padding: "12px", border: "1px solid #1565c0" }}>반환값</th>
            <th style={{ padding: "12px", border: "1px solid #1565c0" }}>사용 시점</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "12px", border: "1px solid #ddd", fontWeight: "bold" }}>useCallback</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>함수 메모이제이션</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>메모이제이션된 함수</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                <li>memo 컴포넌트에 함수 전달</li>
                <li>useEffect 의존성에 함수 포함</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "12px", border: "1px solid #ddd", fontWeight: "bold" }}>useMemo</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>계산 결과 메모이제이션</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>메모이제이션된 값</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                <li>비용이 큰 계산</li>
                <li>객체/배열 참조 유지</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "12px", border: "1px solid #ddd", fontWeight: "bold" }}>useRef</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>변경 가능한 참조 저장</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>{`{ current: value }`}</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                <li>DOM 요소 접근</li>
                <li>이전 값 저장</li>
                <li>타이머 ID 저장</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 최적화 체크리스트 */}
      <div style={{
        backgroundColor: "#e8f5e9",
        padding: "20px",
        borderRadius: "8px",
        marginTop: "20px"
      }}>
        <h3>성능 최적화 체크리스트</h3>
        <ol>
          <li>먼저 <strong>측정</strong>하고 문제가 있을 때만 최적화하세요.</li>
          <li>자식 컴포넌트를 <strong>React.memo</strong>로 감싸고, 함수 props는 <strong>useCallback</strong>으로 감싸세요.</li>
          <li>비용이 큰 계산은 <strong>useMemo</strong>로 메모이제이션하세요.</li>
          <li>DOM 접근이나 리렌더링 없이 값을 저장할 때는 <strong>useRef</strong>를 사용하세요.</li>
          <li>과도한 최적화는 오히려 <strong>성능을 저하</strong>시킬 수 있습니다.</li>
        </ol>
      </div>
    </div>
  );
}

// ========================================
// 메인 컴포넌트
// ========================================

export default function Study() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h1>Day 05: Performance Hooks</h1>
      <p style={{ fontSize: "18px", color: "#666", marginBottom: "30px" }}>
        useCallback, useMemo, useRef를 활용한 React 성능 최적화
      </p>

      <UseCallbackDefinition />
      <UseCallbackDemo />
      <UseMemoDefinition />
      <UseMemoDemo />
      <UseRefDefinition />
      <UseRefDemo />
      <SummaryTable />
    </div>
  );
}
