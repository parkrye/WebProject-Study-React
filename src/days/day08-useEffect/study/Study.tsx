/**
 * ========================================
 * Day 08: useEffect
 * ========================================
 *
 * 📚 학습 목표:
 * 1. Side Effect가 무엇인지 이해한다
 * 2. useEffect의 기본 사용법을 익힌다
 * 3. 의존성 배열을 올바르게 사용할 수 있다
 * 4. Cleanup 함수의 역할을 이해한다
 */

import { useState, useEffect } from "react";

// ----------------------------------------
// 1. Side Effect란?
// ----------------------------------------
/**
 * Side Effect(부수 효과) = 컴포넌트 렌더링 외의 작업
 *
 * 예:
 * - 데이터 가져오기 (API 호출)
 * - DOM 직접 조작
 * - 타이머 설정 (setTimeout, setInterval)
 * - 이벤트 리스너 등록
 * - localStorage 접근
 * - 문서 제목 변경
 *
 * useEffect는 이런 작업들을 안전하게 수행하기 위한 Hook입니다.
 */

// ----------------------------------------
// 2. useEffect 기본 사용법
// ----------------------------------------
/**
 * useEffect(() => {
 *   // 실행할 코드
 * }, [의존성 배열]);
 *
 * 의존성 배열에 따른 동작:
 * - 없음: 매 렌더링마다 실행
 * - []: 마운트 시 한 번만 실행
 * - [a, b]: a 또는 b가 변경될 때 실행
 */

function BasicEffect() {
  const [count, setCount] = useState(0);

  // 매 렌더링마다 실행
  useEffect(() => {
    console.log("렌더링됨!");
  });

  return (
    <div>
      <h3>기본 useEffect</h3>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <p style={{ fontSize: "12px", color: "gray" }}>
        콘솔을 확인하세요
      </p>
    </div>
  );
}

// ----------------------------------------
// 3. 마운트 시 한 번만 실행 (빈 배열)
// ----------------------------------------

function MountEffect() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("컴포넌트가 마운트되었습니다!");

    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      setData("서버에서 가져온 데이터입니다!");
      setLoading(false);
    }, 1500);
  }, []); // 빈 배열 = 마운트 시 한 번만

  return (
    <div>
      <h3>마운트 시 실행 (빈 배열)</h3>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <p>{data}</p>
      )}
    </div>
  );
}

// ----------------------------------------
// 4. 특정 값이 변경될 때 실행
// ----------------------------------------

function DependencyEffect() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  // name이 변경될 때만 실행
  useEffect(() => {
    console.log(`이름이 변경됨: ${name}`);
    document.title = name ? `${name}의 페이지` : "React App";
  }, [name]);

  // age가 변경될 때만 실행
  useEffect(() => {
    console.log(`나이가 변경됨: ${age}`);
  }, [age]);

  return (
    <div>
      <h3>의존성 배열</h3>
      <div style={{ marginBottom: "10px" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름 (브라우저 탭 제목 변경)"
        />
      </div>
      <div>
        <button onClick={() => setAge(age + 1)}>나이: {age}</button>
      </div>
      <p style={{ fontSize: "12px", color: "gray" }}>
        각 값이 변경될 때 콘솔 확인
      </p>
    </div>
  );
}

// ----------------------------------------
// 5. Cleanup 함수 (정리)
// ----------------------------------------
/**
 * useEffect에서 return하는 함수는 cleanup 함수
 *
 * 실행 시점:
 * - 컴포넌트가 언마운트될 때
 * - 다음 effect가 실행되기 전
 *
 * 사용 사례:
 * - 이벤트 리스너 제거
 * - 타이머 정리
 * - 구독 취소
 */

function CleanupEffect() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    console.log("타이머 시작");
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup: 컴포넌트 언마운트 또는 isRunning 변경 시
    return () => {
      console.log("타이머 정리");
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div>
      <h3>Cleanup 함수 (타이머)</h3>
      <p>경과 시간: {seconds}초</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "정지" : "시작"}
      </button>
      <button onClick={() => setSeconds(0)} style={{ marginLeft: "10px" }}>
        초기화
      </button>
    </div>
  );
}

// ----------------------------------------
// 6. 이벤트 리스너 예제
// ----------------------------------------

function WindowSizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // Cleanup: 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <h3>윈도우 크기 추적</h3>
      <p>
        너비: {windowSize.width}px / 높이: {windowSize.height}px
      </p>
      <p style={{ fontSize: "12px", color: "gray" }}>
        브라우저 창 크기를 변경해보세요
      </p>
    </div>
  );
}

// ----------------------------------------
// 7. 데이터 Fetching 패턴
// ----------------------------------------

interface User {
  id: number;
  name: string;
  email: string;
}

function DataFetching() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 가상의 데이터 fetching
    setLoading(true);
    setError(null);

    // 실제로는 fetch나 axios 사용
    const fetchUser = setTimeout(() => {
      // 시뮬레이션: userId에 따른 다른 데이터
      const mockUsers: User[] = [
        { id: 1, name: "김철수", email: "kim@example.com" },
        { id: 2, name: "이영희", email: "lee@example.com" },
        { id: 3, name: "박민수", email: "park@example.com" },
      ];

      const foundUser = mockUsers.find((u) => u.id === userId);
      if (foundUser) {
        setUser(foundUser);
      } else {
        setError("사용자를 찾을 수 없습니다");
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(fetchUser);
  }, [userId]);

  return (
    <div>
      <h3>데이터 Fetching</h3>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setUserId(1)}>사용자 1</button>
        <button onClick={() => setUserId(2)}>사용자 2</button>
        <button onClick={() => setUserId(3)}>사용자 3</button>
        <button onClick={() => setUserId(99)}>없는 사용자</button>
      </div>
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && !loading && (
        <div>
          <p>이름: {user.name}</p>
          <p>이메일: {user.email}</p>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------
// 메인 컴포넌트
// ----------------------------------------

function Study() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 08: useEffect</h1>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <BasicEffect />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <MountEffect />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <DependencyEffect />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <CleanupEffect />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <WindowSizeTracker />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <DataFetching />
      </section>
    </div>
  );
}

export default Study;
