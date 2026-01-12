/**
 * ========================================
 * Day 04: useState 심화 & useEffect
 * ========================================
 */

import { useState, useEffect } from "react";

// ============================================
// 코드+데모 표시용 헬퍼 컴포넌트
// ============================================
interface CodeDemoProps {
  title: string;
  code: string;
  children: React.ReactNode;
}

function CodeDemo({ title, code, children }: CodeDemoProps) {
  const [showCode, setShowCode] = useState(true);

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        marginBottom: "20px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px 15px",
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>{title}</strong>
        <button
          onClick={() => setShowCode(!showCode)}
          style={{
            padding: "4px 12px",
            fontSize: "12px",
            backgroundColor: showCode ? "#2196f3" : "#9e9e9e",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {showCode ? "코드 숨기기" : "코드 보기"}
        </button>
      </div>

      {/* 실행 결과 (데모) */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#e8f5e9",
          borderBottom: showCode ? "1px solid #e0e0e0" : "none",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            color: "#666",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          실행 결과
        </div>
        {children}
      </div>

      {/* 소스 코드 */}
      {showCode && (
        <div style={{ padding: "15px", backgroundColor: "#263238" }}>
          <div
            style={{
              fontSize: "12px",
              color: "#78909c",
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            소스 코드
          </div>
          <pre
            style={{
              margin: 0,
              padding: "15px",
              backgroundColor: "#1e1e1e",
              borderRadius: "4px",
              overflow: "auto",
              fontSize: "13px",
              color: "#d4d4d4",
              lineHeight: "1.5",
            }}
          >
            {code}
          </pre>
        </div>
      )}
    </div>
  );
}

// ============================================
// 메인 Study 컴포넌트
// ============================================

function Study() {
  // 데모용 상태들
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 타이머 useEffect
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // 클린업 함수
    return () => clearInterval(intervalId);
  }, [isRunning]);

  // 윈도우 리사이즈 useEffect
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Day 04: useState 심화 & useEffect</h1>

      {/* ==================== useState 심화 ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>1. useState 심화 - 객체 상태 업데이트</h2>

        <div
          style={{
            backgroundColor: "#e3f2fd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3>불변성(Immutability)이란?</h3>
          <p>
            React에서 상태를 업데이트할 때는 기존 값을 직접 수정하지 않고,
            <strong> 항상 새로운 값</strong>을 만들어야 합니다.
          </p>
          <p style={{ marginTop: "10px" }}>
            <strong>왜?</strong> React는 이전 상태와 새 상태의{" "}
            <strong>참조(reference)</strong>를 비교해서 변경을 감지합니다. 직접
            수정하면 같은 참조이므로 변경을 감지하지 못합니다.
          </p>
        </div>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <p style={{ color: "red" }}>
              <strong>❌ 잘못된 방법 (직접 수정):</strong>
            </p>
            <pre
              style={{
                backgroundColor: "#ffebee",
                padding: "15px",
                borderRadius: "4px",
              }}
            >
              {`const [user, setUser] = useState({ name: '철수' });

// 직접 수정 - 리렌더링 안 됨!
user.name = '영희';
setUser(user);  // 같은 참조 → 변경 감지 못함

// 왜 안 될까?
// Object.is(이전user, 새user) === true
// React: "변한 게 없네? 리렌더링 안 해도 되겠다"`}
            </pre>
          </div>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <p style={{ color: "green" }}>
              <strong>✅ 올바른 방법 (새 객체 생성):</strong>
            </p>
            <pre
              style={{
                backgroundColor: "#e8f5e9",
                padding: "15px",
                borderRadius: "4px",
              }}
            >
              {`const [user, setUser] = useState({ name: '철수' });

// 스프레드로 새 객체 생성 - 리렌더링 됨!
setUser({ ...user, name: '영희' });

// 왜 될까?
// { ...user }는 새로운 객체를 생성
// Object.is(이전user, 새user) === false
// React: "변경됐네! 리렌더링 해야지"`}
            </pre>
          </div>
        </div>

        <h3 style={{ marginTop: "20px" }}>중첩 객체 업데이트</h3>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`const [user, setUser] = useState({
  name: '철수',
  address: {
    city: '서울',
    zipCode: '12345'
  }
});

// 중첩된 객체를 업데이트할 때는 모든 레벨에서 스프레드 필요
const updateCity = (newCity: string) => {
  setUser({
    ...user,           // 최상위 객체 복사
    address: {
      ...user.address, // 중첩 객체 복사
      city: newCity    // 변경할 값만 덮어쓰기
    }
  });
};`}
        </pre>
      </section>

      {/* ==================== 배열 상태 업데이트 ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>2. useState 심화 - 배열 상태 업데이트</h2>

        <div
          style={{
            backgroundColor: "#fff3e0",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3>배열 불변성 유지하기</h3>
          <p>배열도 객체이므로 직접 수정하면 안 됩니다. 항상 새 배열을 만드세요.</p>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>작업</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                ❌ 직접 수정
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                ✅ 불변성 유지
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                추가
              </td>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  backgroundColor: "#ffebee",
                }}
              >
                <code>arr.push(item)</code>
              </td>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  backgroundColor: "#e8f5e9",
                }}
              >
                <code>[...arr, item]</code>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                삭제
              </td>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  backgroundColor: "#ffebee",
                }}
              >
                <code>arr.splice(i, 1)</code>
              </td>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  backgroundColor: "#e8f5e9",
                }}
              >
                <code>arr.filter(x =&gt; x.id !== id)</code>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                수정
              </td>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  backgroundColor: "#ffebee",
                }}
              >
                <code>arr[i].done = true</code>
              </td>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  backgroundColor: "#e8f5e9",
                }}
              >
                <code>
                  arr.map(x =&gt; x.id === id ? {`{...x, done: true}`} : x)
                </code>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                정렬
              </td>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  backgroundColor: "#ffebee",
                }}
              >
                <code>arr.sort()</code>
              </td>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  backgroundColor: "#e8f5e9",
                }}
              >
                <code>[...arr].sort()</code>
              </td>
            </tr>
          </tbody>
        </table>

        <h3>배열 CRUD 패턴</h3>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`const [todos, setTodos] = useState<Todo[]>([]);

// Create (추가)
const addTodo = (text: string) => {
  const newTodo = { id: Date.now(), text, completed: false };
  setTodos([...todos, newTodo]);
  // 또는 setTodos(prev => [...prev, newTodo]);
};

// Delete (삭제)
const deleteTodo = (id: number) => {
  setTodos(todos.filter(todo => todo.id !== id));
};

// Update (수정)
const toggleTodo = (id: number) => {
  setTodos(todos.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  ));
};`}
        </pre>
      </section>

      {/* ==================== useEffect란? ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>3. useEffect란?</h2>

        <div
          style={{
            backgroundColor: "#e3f2fd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3>정의</h3>
          <p>
            <strong>useEffect</strong>는 컴포넌트에서{" "}
            <strong>부수 효과(Side Effect)</strong>를 수행하기 위한 Hook입니다.
          </p>
          <h4 style={{ marginTop: "15px" }}>부수 효과(Side Effect)란?</h4>
          <ul style={{ marginTop: "10px" }}>
            <li>데이터 가져오기 (API 호출)</li>
            <li>구독 설정 (WebSocket, 이벤트 리스너)</li>
            <li>DOM 직접 조작</li>
            <li>타이머 설정 (setTimeout, setInterval)</li>
            <li>로깅</li>
          </ul>
        </div>

        <h3>useEffect 문법</h3>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`useEffect(() => {
  // 1. 이펙트 코드 (컴포넌트 렌더링 후 실행)
  console.log('Effect 실행!');

  // 2. 클린업 함수 (옵션) - 다음 이펙트 전 또는 언마운트 시 실행
  return () => {
    console.log('클린업 실행!');
  };
}, [의존성배열]); // 3. 의존성 배열 - 언제 이펙트를 다시 실행할지`}
        </pre>
      </section>

      {/* ==================== 의존성 배열 ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>4. 의존성 배열 이해하기</h2>

        <div
          style={{
            backgroundColor: "#fff3e0",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <p>
            의존성 배열은 useEffect가 <strong>언제 다시 실행될지</strong>를
            결정합니다.
          </p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h4>케이스 1: 빈 배열 []</h4>
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            {`useEffect(() => {
  console.log('마운트 시 한 번만 실행');
  // 컴포넌트가 처음 화면에 나타날 때만 실행
  // 예: 초기 데이터 로드, 이벤트 리스너 등록

  return () => {
    console.log('언마운트 시 실행');
    // 컴포넌트가 화면에서 사라질 때만 실행
  };
}, []); // ← 빈 배열`}
          </pre>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h4>케이스 2: 의존성 있음 [dep1, dep2]</h4>
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            {`useEffect(() => {
  console.log('count 또는 name이 변경됨');
  // 마운트 시 + count나 name이 바뀔 때마다 실행

  return () => {
    console.log('이전 값으로 클린업');
    // 다음 이펙트 실행 전에 이전 값으로 클린업
  };
}, [count, name]); // ← count, name 의존`}
          </pre>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h4>케이스 3: 배열 생략 (권장하지 않음)</h4>
          <pre
            style={{
              backgroundColor: "#ffebee",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            {`useEffect(() => {
  console.log('매 렌더링마다 실행');
  // 모든 state, props 변경에 반응
  // 주의: 무한 루프 위험!
});  // ← 배열 없음

// 예: setCount 호출 → 리렌더링 → useEffect 실행
//     → setCount 호출 → 무한 반복!`}
          </pre>
        </div>

        <div
          style={{
            backgroundColor: "#e8f5e9",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h4>의존성 배열 규칙</h4>
          <ul>
            <li>
              이펙트 내에서 사용하는 모든 외부 값(state, props, 함수)을 넣어야 함
            </li>
            <li>ESLint의 exhaustive-deps 규칙을 따르세요</li>
            <li>의존성을 빼면 버그의 원인이 됩니다 (stale closure)</li>
          </ul>
        </div>
      </section>

      {/* ==================== 클린업 함수 ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>5. 클린업 함수</h2>

        <div
          style={{
            backgroundColor: "#e3f2fd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3>클린업이 필요한 경우</h3>
          <ul>
            <li>이벤트 리스너 등록 → 해제 필요</li>
            <li>타이머 설정 → 정리 필요</li>
            <li>구독 설정 → 구독 해제 필요</li>
            <li>WebSocket 연결 → 연결 해제 필요</li>
          </ul>
          <p style={{ marginTop: "10px" }}>
            클린업을 안 하면 <strong>메모리 누수</strong>가 발생합니다!
          </p>
        </div>

        {/* 타이머 데모 */}
        <CodeDemo
          title="타이머 클린업 데모"
          code={`function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // isRunning이 false면 아무것도 안 함
    if (!isRunning) return;

    // 1초마다 seconds 증가
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // 클린업: 타이머 정리
    return () => {
      clearInterval(intervalId);
      console.log('타이머 정리됨');
    };
  }, [isRunning]); // isRunning이 바뀔 때마다 실행

  return (
    <div>
      <p>시간: {seconds}초</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? '정지' : '시작'}
      </button>
      <button onClick={() => setSeconds(0)}>리셋</button>
    </div>
  );
}`}
        >
          <p style={{ fontSize: "36px", margin: "0 0 20px 0", textAlign: "center" }}>
            {seconds}초
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              onClick={() => setIsRunning(!isRunning)}
              style={{
                padding: "10px 20px",
                backgroundColor: isRunning ? "#f44336" : "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {isRunning ? "정지" : "시작"}
            </button>
            <button
              onClick={() => setSeconds(0)}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              리셋
            </button>
          </div>
        </CodeDemo>

        {/* 이벤트 리스너 데모 */}
        <CodeDemo
          title="이벤트 리스너 클린업 데모"
          code={`function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 클린업: 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 마운트/언마운트 시만

  return <p>창 너비: {width}px</p>;
}`}
        >
          <p>
            현재 창 너비: <strong>{windowWidth}px</strong>
          </p>
          <p style={{ color: "#666", fontSize: "14px" }}>
            (창 크기를 조절해보세요!)
          </p>
        </CodeDemo>
      </section>

      {/* ==================== useEffect 실행 순서 ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>6. useEffect 실행 순서</h2>

        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`function Example() {
  console.log('1. 렌더링');  // 먼저 실행

  useEffect(() => {
    console.log('3. useEffect 실행');  // 렌더링 후 실행

    return () => {
      console.log('2. 클린업 (리렌더링 전)');  // 다음 이펙트 전에 실행
    };
  });

  return <div>...</div>;
}

// 실행 순서:
// [마운트] 1. 렌더링 → 3. useEffect 실행
// [업데이트] 1. 렌더링 → 2. 클린업 → 3. useEffect 실행
// [언마운트] 2. 클린업`}
        </pre>

        <div
          style={{
            backgroundColor: "#fff3e0",
            padding: "15px",
            borderRadius: "8px",
            marginTop: "20px",
          }}
        >
          <h4>핵심 포인트</h4>
          <ul>
            <li>
              useEffect는 렌더링 <strong>후에</strong> 실행됩니다 (동기 X, 비동기
              O)
            </li>
            <li>
              클린업은 다음 이펙트 실행 <strong>전에</strong> 실행됩니다
            </li>
            <li>언마운트 시에도 클린업이 실행됩니다</li>
          </ul>
        </div>
      </section>

      {/* ==================== 자주 하는 실수 ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>7. 자주 하는 실수</h2>

        <div
          style={{
            border: "1px solid #f44336",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h4 style={{ color: "#f44336" }}>실수 1: 무한 루프</h4>
          <pre
            style={{
              backgroundColor: "#ffebee",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            {`// ❌ 무한 루프!
useEffect(() => {
  setCount(count + 1);  // state 변경 → 리렌더링 → useEffect → 반복
});

// ✅ 해결: 의존성 배열 추가
useEffect(() => {
  // 특정 조건에서만 실행
}, [특정조건]);`}
          </pre>
        </div>

        <div
          style={{
            border: "1px solid #f44336",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h4 style={{ color: "#f44336" }}>실수 2: 클린업 누락</h4>
          <pre
            style={{
              backgroundColor: "#ffebee",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            {`// ❌ 메모리 누수!
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  // 클린업 없음 → 컴포넌트 언마운트 후에도 리스너 남아있음
}, []);

// ✅ 해결: 클린업 추가
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);`}
          </pre>
        </div>

        <div
          style={{
            border: "1px solid #f44336",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h4 style={{ color: "#f44336" }}>실수 3: 의존성 누락 (Stale Closure)</h4>
          <pre
            style={{
              backgroundColor: "#ffebee",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            {`// ❌ 항상 초기 count 값만 사용됨
useEffect(() => {
  const id = setInterval(() => {
    console.log(count);  // 항상 0 (클로저가 초기값 캡처)
  }, 1000);
  return () => clearInterval(id);
}, []);  // count가 의존성에 없음

// ✅ 해결: 함수형 업데이트 또는 의존성 추가
useEffect(() => {
  const id = setInterval(() => {
    setCount(prev => prev + 1);  // prev는 항상 최신값
  }, 1000);
  return () => clearInterval(id);
}, []);`}
          </pre>
        </div>
      </section>

      {/* ==================== 핵심 정리 ==================== */}
      <section
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h2>핵심 정리</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                  width: "150px",
                }}
              >
                불변성
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                상태는 직접 수정 금지. 스프레드(...), map, filter로 새 값 생성
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                useEffect
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                부수 효과(API 호출, 이벤트 리스너, 타이머 등)를 처리하는 Hook
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                의존성 배열
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                []: 마운트 시 1회 / [deps]: deps 변경 시 / 생략: 매 렌더링
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                클린업 함수
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                return () =&gt; {}로 정리 작업 수행. 메모리 누수 방지에 필수
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                실행 순서
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                렌더링 → (클린업) → useEffect 실행
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Study;
