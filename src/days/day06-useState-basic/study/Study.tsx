/**
 * ========================================
 * Day 06: useState 기초
 * ========================================
 *
 * 📚 학습 목표:
 * 1. 상태(State)가 무엇인지 이해한다
 * 2. useState Hook을 사용할 수 있다
 * 3. 상태 변경으로 UI를 업데이트할 수 있다
 */

import { useState } from "react";

// ----------------------------------------
// 1. 상태(State)란?
// ----------------------------------------
/**
 * 상태 = 컴포넌트가 기억하는 데이터
 *
 * 일반 변수 vs 상태:
 * - 일반 변수: 값이 바뀌어도 화면이 업데이트되지 않음
 * - 상태: 값이 바뀌면 화면이 자동으로 다시 렌더링됨
 *
 * 상태가 필요한 경우:
 * - 사용자 입력값
 * - 카운터, 토글
 * - 데이터 목록
 * - 로딩/에러 상태
 */

// ----------------------------------------
// 2. useState 기본 사용법
// ----------------------------------------
/**
 * const [상태값, 상태변경함수] = useState(초기값);
 *
 * 예:
 * const [count, setCount] = useState(0);
 * - count: 현재 상태값 (0으로 시작)
 * - setCount: 상태를 변경하는 함수
 */

function Counter() {
  // useState로 상태 선언
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>카운터: {count}</h3>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>초기화</button>
    </div>
  );
}

// ----------------------------------------
// 3. 문자열 상태
// ----------------------------------------

function NameInput() {
  const [name, setName] = useState("");

  // input의 onChange에서 값 가져오기
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h3>이름 입력</h3>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="이름을 입력하세요"
      />
      <p>입력된 이름: {name}</p>
      <p>글자 수: {name.length}</p>
    </div>
  );
}

// ----------------------------------------
// 4. 불리언 상태 (토글)
// ----------------------------------------

function Toggle() {
  const [isOn, setIsOn] = useState(false);

  // 토글: true ↔ false 전환
  const handleToggle = () => {
    setIsOn(!isOn); // 현재 값의 반대로 변경
  };

  return (
    <div>
      <h3>토글 스위치</h3>
      <button
        onClick={handleToggle}
        style={{
          padding: "10px 20px",
          backgroundColor: isOn ? "#4CAF50" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
        }}
      >
        {isOn ? "ON" : "OFF"}
      </button>
    </div>
  );
}

// ----------------------------------------
// 5. 여러 개의 상태
// ----------------------------------------

function LoginForm() {
  // 각각 별도의 상태로 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`이메일: ${email}\n비밀번호: ${password}\n기억하기: ${rememberMe}`);
  };

  return (
    <div>
      <h3>로그인 폼</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            style={{ padding: "8px", width: "200px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            style={{ padding: "8px", width: "200px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            로그인 상태 유지
          </label>
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

// ----------------------------------------
// 6. 상태 업데이트 함수형 업데이트
// ----------------------------------------
/**
 * 이전 상태값을 기반으로 업데이트할 때는 함수형 업데이트 사용
 *
 * setCount(count + 1)        // 직접 계산
 * setCount(prev => prev + 1) // 함수형 업데이트 (권장)
 *
 * 함수형 업데이트가 더 안전한 이유:
 * - 여러 번 연속 호출해도 정확하게 동작
 * - 클로저 문제 방지
 */

function FunctionalUpdate() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // 직접 계산: 세 번 호출해도 1만 증가
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);

    // 함수형 업데이트: 세 번 호출하면 3 증가
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <h3>함수형 업데이트</h3>
      <p>카운트: {count}</p>
      <button onClick={handleClick}>+3 (한 번에)</button>
      <button onClick={() => setCount(0)}>초기화</button>
    </div>
  );
}

// ----------------------------------------
// 7. TypeScript에서 타입 지정
// ----------------------------------------

// 타입이 복잡할 때는 명시적으로 지정
function TypedState() {
  // 타입 추론됨: number
  const [count, setCount] = useState(0);

  // 타입 추론됨: string
  const [name, setName] = useState("");

  // 유니온 타입: 명시적 지정 필요
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  return (
    <div>
      <h3>TypeScript 타입</h3>
      <p>상태: {status}</p>
      <button onClick={() => setStatus("loading")}>로딩</button>
      <button onClick={() => setStatus("success")}>성공</button>
      <button onClick={() => setStatus("error")}>에러</button>
      <button onClick={() => setStatus("idle")}>초기화</button>
    </div>
  );
}

// ----------------------------------------
// 메인 컴포넌트
// ----------------------------------------

function Study() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 06: useState 기초</h1>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <Counter />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <NameInput />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <Toggle />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <LoginForm />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <FunctionalUpdate />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <TypedState />
      </section>
    </div>
  );
}

export default Study;
