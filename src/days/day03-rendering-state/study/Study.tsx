/**
 * ========================================
 * Day 03: 렌더링 & useState 기초
 * ========================================
 */

import { useState } from "react";

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
  // useState 예제들
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [items, setItems] = useState(["사과", "바나나", "오렌지"]);
  const [newItem, setNewItem] = useState("");

  // 아이템 추가
  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  // 아이템 삭제
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Day 03: 렌더링 & useState 기초</h1>

      {/* ==================== 조건부 렌더링 ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>1. 조건부 렌더링</h2>

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
            <strong>조건부 렌더링</strong>이란 특정 조건에 따라 다른 UI를
            보여주는 것입니다. JavaScript의 조건문과 같은 방식으로 동작하며,
            React에서는 여러 방법으로 구현할 수 있습니다.
          </p>
        </div>

        <h3>방법 1: if문 사용 (컴포넌트 분리)</h3>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
            marginBottom: "15px",
          }}
        >
          {`function Greeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  // if문으로 먼저 조건 체크
  if (isLoggedIn) {
    return <h1>환영합니다!</h1>;
  }
  return <h1>로그인해주세요.</h1>;
}

// 또는 early return 패턴
function Dashboard({ user }: { user: User | null }) {
  // 데이터가 없으면 로딩 표시
  if (!user) {
    return <p>로딩 중...</p>;
  }

  // 데이터가 있으면 정상 렌더링
  return <div>안녕하세요, {user.name}님!</div>;
}`}
        </pre>

        <h3>방법 2: 삼항 연산자 (? :)</h3>
        <div
          style={{
            backgroundColor: "#e8f5e9",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <p>
            <strong>언제 사용?</strong> 조건에 따라 두 가지 UI 중 하나를 보여줄
            때
          </p>
          <pre
            style={{
              backgroundColor: "#fff",
              padding: "15px",
              borderRadius: "4px",
              margin: "10px 0",
            }}
          >
            {`// 문법: 조건 ? 참일 때 : 거짓일 때

function UserStatus({ isOnline }: { isOnline: boolean }) {
  return (
    <span>
      {isOnline ? '온라인' : '오프라인'}
    </span>
  );
}

// JSX 안에서 바로 사용
<div>
  {isLoggedIn ? <LogoutButton /> : <LoginButton />}
</div>`}
          </pre>
        </div>

        <h3>방법 3: 논리 AND 연산자 (&&)</h3>
        <div
          style={{
            backgroundColor: "#fff3e0",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <p>
            <strong>언제 사용?</strong> 조건이 참일 때만 무언가를 보여줄 때
            (거짓일 때는 아무것도 안 보여줌)
          </p>
          <pre
            style={{
              backgroundColor: "#fff",
              padding: "15px",
              borderRadius: "4px",
              margin: "10px 0",
            }}
          >
            {`// 문법: 조건 && 보여줄 것

function Notifications({ count }: { count: number }) {
  return (
    <div>
      {/* count가 0보다 크면 배지 표시, 아니면 아무것도 안 보임 */}
      {count > 0 && <span className="badge">{count}</span>}
    </div>
  );
}

// 여러 조건 조합
<div>
  {isAdmin && <AdminPanel />}
  {hasNotifications && <NotificationBell />}
</div>`}
          </pre>
          <div
            style={{
              backgroundColor: "#ffebee",
              padding: "10px",
              borderRadius: "4px",
              marginTop: "10px",
            }}
          >
            <strong>주의!</strong> count가 0일 때 <code>0 && ...</code>는 0을
            렌더링합니다.
            <br />
            → 해결: <code>{`{count > 0 && ...}`}</code> 또는{" "}
            <code>{`{!!count && ...}`}</code>
          </div>
        </div>

        {/* 조건부 렌더링 데모 */}
        <CodeDemo
          title="조건부 렌더링 데모"
          code={`function ConditionalDemo() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "숨기기" : "보이기"}
      </button>

      {/* 삼항 연산자 사용 */}
      <p>삼항 연산자: {isVisible ? "보입니다!" : "숨겨졌습니다"}</p>

      {/* && 연산자 사용 */}
      {isVisible && (
        <div style={{ padding: "15px", backgroundColor: "#c8e6c9" }}>
          && 연산자: 이 박스는 조건이 참일 때만 보입니다.
        </div>
      )}
    </div>
  );
}`}
        >
          <button
            onClick={() => setIsVisible(!isVisible)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "15px",
            }}
          >
            {isVisible ? "숨기기" : "보이기"}
          </button>

          {/* 삼항 연산자 */}
          <p>삼항 연산자: {isVisible ? "보입니다!" : "숨겨졌습니다"}</p>

          {/* && 연산자 */}
          {isVisible && (
            <div
              style={{
                padding: "15px",
                backgroundColor: "#c8e6c9",
                borderRadius: "4px",
              }}
            >
              && 연산자: 이 박스는 조건이 참일 때만 보입니다.
            </div>
          )}
        </CodeDemo>
      </section>

      {/* ==================== 리스트 렌더링 ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>2. 리스트 렌더링</h2>

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
            <strong>리스트 렌더링</strong>은 배열 데이터를 기반으로 여러 개의
            컴포넌트나 요소를 반복해서 렌더링하는 것입니다. JavaScript의{" "}
            <code>map()</code> 메서드를 사용합니다.
          </p>
        </div>

        <h3>map() 메서드란?</h3>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
            marginBottom: "15px",
          }}
        >
          {`// map()은 배열의 각 요소를 변환하여 새 배열을 반환합니다

const numbers = [1, 2, 3, 4, 5];

// 각 숫자를 2배로
const doubled = numbers.map(num => num * 2);
// 결과: [2, 4, 6, 8, 10]

// React에서 JSX로 변환
const listItems = numbers.map(num => <li>{num}</li>);
// 결과: [<li>1</li>, <li>2</li>, ...]`}
        </pre>

        <h3>key prop의 중요성</h3>
        <div
          style={{
            backgroundColor: "#ffebee",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h4>key란?</h4>
          <p>
            <strong>key</strong>는 React가 리스트의 각 항목을 고유하게 식별하는 데
            사용하는 특별한 속성입니다.
          </p>

          <h4>왜 필요한가?</h4>
          <ul>
            <li>React가 어떤 항목이 변경, 추가, 삭제되었는지 효율적으로 파악</li>
            <li>Virtual DOM 비교(Diffing) 과정에서 성능 최적화에 필수</li>
            <li>없으면 React가 경고를 표시하고 비효율적으로 동작</li>
          </ul>

          <h4>key 선택 가이드</h4>
          <pre
            style={{
              backgroundColor: "#fff",
              padding: "15px",
              borderRadius: "4px",
              marginTop: "10px",
            }}
          >
            {`// 좋음: 고유한 ID 사용
users.map(user => <UserCard key={user.id} user={user} />)

// 주의: index는 최후의 수단
// - 리스트가 정적이고 변하지 않을 때만 사용
items.map((item, index) => <Item key={index} item={item} />)

// 잘못됨: 랜덤 값
items.map(item => <Item key={Math.random()} item={item} />)`}
          </pre>
        </div>

        {/* 리스트 렌더링 데모 */}
        <CodeDemo
          title="리스트 렌더링 + CRUD 데모"
          code={`function ListDemo() {
  const [items, setItems] = useState(["사과", "바나나", "오렌지"]);
  const [newItem, setNewItem] = useState("");

  // 아이템 추가
  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  // 아이템 삭제
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* 입력 필드 + 추가 버튼 */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="새 아이템 입력"
          onKeyPress={(e) => e.key === "Enter" && addItem()}
        />
        <button onClick={addItem}>추가</button>
      </div>

      {/* 리스트 렌더링 */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeItem(index)}>삭제</button>
          </li>
        ))}
      </ul>

      {/* 빈 리스트 처리 */}
      {items.length === 0 && <p>아이템이 없습니다.</p>}
    </div>
  );
}`}
        >
          {/* 입력 필드 + 추가 버튼 */}
          <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="새 아이템 입력"
              onKeyPress={(e) => e.key === "Enter" && addItem()}
              style={{
                padding: "8px 12px",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                flex: 1,
              }}
            />
            <button
              onClick={addItem}
              style={{
                padding: "8px 16px",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              추가
            </button>
          </div>

          {/* 리스트 렌더링 */}
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items.map((item, index) => (
              <li
                key={index}
                style={{
                  padding: "10px",
                  backgroundColor: "#fff",
                  marginBottom: "5px",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{item}</span>
                <button
                  onClick={() => removeItem(index)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>

          {/* 빈 리스트 처리 */}
          {items.length === 0 && (
            <p style={{ color: "#666", textAlign: "center" }}>
              아이템이 없습니다. 위에서 추가해보세요!
            </p>
          )}
        </CodeDemo>
      </section>

      {/* ==================== useState란? ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>3. useState란?</h2>

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
            <strong>useState</strong>는 React의 Hook으로, 함수 컴포넌트에서
            상태(state)를 관리할 수 있게 해줍니다.
          </p>
          <p style={{ marginTop: "10px" }}>
            <strong>상태(State)란?</strong> 컴포넌트가 기억해야 하는 데이터로,
            시간에 따라 변할 수 있으며, 변경되면 화면이 다시 렌더링됩니다.
          </p>
        </div>

        <h3>일반 변수 vs useState</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <p style={{ color: "red" }}>
              <strong>❌ 일반 변수 (동작 안 함):</strong>
            </p>
            <pre
              style={{
                backgroundColor: "#ffebee",
                padding: "15px",
                borderRadius: "4px",
              }}
            >
              {`function Counter() {
  let count = 0;  // 일반 변수

  const increment = () => {
    count = count + 1;  // 값은 바뀌지만...
    // 화면은 업데이트 안 됨!
  };

  return (
    <button onClick={increment}>
      클릭: {count}  {/* 항상 0 */}
    </button>
  );
}`}
            </pre>
          </div>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <p style={{ color: "green" }}>
              <strong>✅ useState (정상 동작):</strong>
            </p>
            <pre
              style={{
                backgroundColor: "#e8f5e9",
                padding: "15px",
                borderRadius: "4px",
              }}
            >
              {`function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);  // 상태 업데이트
    // React가 리렌더링!
  };

  return (
    <button onClick={increment}>
      클릭: {count}  {/* 업데이트됨 */}
    </button>
  );
}`}
            </pre>
          </div>
        </div>

        <h3 style={{ marginTop: "20px" }}>useState 문법 분석</h3>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`import { useState } from 'react';

// 기본 문법
const [상태값, 상태변경함수] = useState(초기값);

// 실제 예시
const [count, setCount] = useState(0);
//     ↑        ↑               ↑
//  현재 값  값을 바꾸는 함수  초기값`}
        </pre>

        {/* 카운터 데모 */}
        <CodeDemo
          title="카운터 데모"
          code={`function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: "48px" }}>{count}</p>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>리셋</button>
        <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
    </div>
  );
}`}
        >
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "48px", margin: "0 0 20px 0" }}>{count}</p>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                onClick={() => setCount(count - 1)}
                style={{
                  padding: "10px 20px",
                  fontSize: "18px",
                  cursor: "pointer",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                -1
              </button>
              <button
                onClick={() => setCount(0)}
                style={{
                  padding: "10px 20px",
                  fontSize: "18px",
                  cursor: "pointer",
                  backgroundColor: "#9e9e9e",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                리셋
              </button>
              <button
                onClick={() => setCount(count + 1)}
                style={{
                  padding: "10px 20px",
                  fontSize: "18px",
                  cursor: "pointer",
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                +1
              </button>
            </div>
          </div>
        </CodeDemo>
      </section>

      {/* ==================== 다양한 타입의 상태 ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>4. 다양한 타입의 상태 관리</h2>

        {/* 문자열 상태 데모 */}
        <CodeDemo
          title="문자열 상태 관리"
          code={`function TextInput() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
      />
      <p>입력된 이름: {name || "(비어있음)"}</p>
    </div>
  );
}

// value와 onChange를 함께 사용하는 것을
// "Controlled Component" 패턴이라고 합니다.`}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "100%",
              boxSizing: "border-box",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
          <p style={{ marginTop: "10px" }}>
            입력된 이름: {name || "(비어있음)"}
          </p>
        </CodeDemo>

        <h3>배열/객체 상태의 불변성</h3>
        <div
          style={{
            backgroundColor: "#ffebee",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h4>핵심 원칙: 불변성(Immutability)</h4>
          <p>
            React에서 상태를 업데이트할 때는 <strong>항상 새로운 값</strong>을
            만들어야 합니다.
          </p>
          <pre
            style={{
              backgroundColor: "#fff",
              padding: "15px",
              borderRadius: "4px",
              marginTop: "10px",
            }}
          >
            {`// 배열: 새 배열 생성
setItems([...items, newItem]);        // 추가
setItems(items.filter(x => x !== id)); // 삭제

// 객체: 새 객체 생성
setUser({ ...user, name: newName });

// 직접 수정 (작동 안 함!)
items.push(newItem);  // 리렌더링 안 됨
user.name = newName;  // 리렌더링 안 됨`}
          </pre>
        </div>
      </section>

      {/* ==================== 함수형 업데이트 ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>5. 함수형 업데이트</h2>

        <div
          style={{
            backgroundColor: "#e3f2fd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3>언제 사용하는가?</h3>
          <p>이전 상태값을 기반으로 새 상태를 계산할 때 안전하게 사용합니다.</p>
        </div>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <p style={{ color: "red" }}>
              <strong>⚠️ 문제 가능성:</strong>
            </p>
            <pre
              style={{
                backgroundColor: "#ffebee",
                padding: "15px",
                borderRadius: "4px",
              }}
            >
              {`const handleClick = () => {
  setCount(count + 1);  // 0 + 1 = 1
  setCount(count + 1);  // 0 + 1 = 1
  setCount(count + 1);  // 0 + 1 = 1
  // 결과: 1 (3이 아님!)
};`}
            </pre>
          </div>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <p style={{ color: "green" }}>
              <strong>✅ 함수형 업데이트:</strong>
            </p>
            <pre
              style={{
                backgroundColor: "#e8f5e9",
                padding: "15px",
                borderRadius: "4px",
              }}
            >
              {`const handleClick = () => {
  setCount(prev => prev + 1);  // 0→1
  setCount(prev => prev + 1);  // 1→2
  setCount(prev => prev + 1);  // 2→3
  // 결과: 3 (정확!)
};`}
            </pre>
          </div>
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
                조건부 렌더링
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                삼항 연산자(? :), && 연산자, if문으로 조건에 따라 다른 UI 표시
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
                리스트 렌더링
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                map()으로 배열을 JSX로 변환. 반드시 고유한 key prop 필요
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
                useState
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                [값, 변경함수] = useState(초기값). 상태가 바뀌면 리렌더링
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
                함수형 업데이트
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                setState(prev =&gt; newValue). 이전 상태 기반 업데이트에 안전
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Study;
