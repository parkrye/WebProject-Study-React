/**
 * ========================================
 * Day 02: Props & 이벤트 핸들링
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
// 예제 컴포넌트들
// ============================================

// Props 기본 예제
interface UserCardProps {
  name: string;
  age: number;
  email: string;
  isOnline?: boolean;
}

function UserCard({ name, age, email, isOnline = false }: UserCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        margin: "10px 0",
        backgroundColor: isOnline ? "#e8f5e9" : "#fff",
      }}
    >
      <h4 style={{ margin: "0 0 10px 0" }}>
        {name} {isOnline && <span style={{ color: "green" }}>● 온라인</span>}
      </h4>
      <p style={{ margin: "5px 0", color: "#666" }}>나이: {age}세</p>
      <p style={{ margin: "5px 0", color: "#666" }}>이메일: {email}</p>
    </div>
  );
}

// children 예제
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        margin: "10px 0",
      }}
    >
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "12px 15px",
          fontWeight: "bold",
          borderBottom: "1px solid #ddd",
        }}
      >
        {title}
      </div>
      <div style={{ padding: "15px" }}>{children}</div>
    </div>
  );
}

// ============================================
// 메인 Study 컴포넌트
// ============================================

function Study() {
  // 이벤트 핸들링 데모용 상태
  const [clickCount, setClickCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  // 이벤트 핸들러 함수들
  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`입력값: ${inputValue}`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Day 02: Props & 이벤트 핸들링</h1>

      {/* ==================== Props란? ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>1. Props란?</h2>

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
            <strong>Props (Properties)</strong>는 부모 컴포넌트에서 자식
            컴포넌트로 데이터를 전달하는 방법입니다. HTML 속성(attribute)과
            유사하지만, 모든 JavaScript 값을 전달할 수 있습니다.
          </p>
        </div>

        <h3>Props의 핵심 특징</h3>
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            <li style={{ marginBottom: "10px" }}>
              <strong>단방향 데이터 흐름:</strong> 부모 → 자식 방향으로만
              전달됩니다. 자식이 부모의 props를 직접 수정할 수 없습니다.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>읽기 전용 (Immutable):</strong> props는 받은 컴포넌트에서
              수정할 수 없습니다. 수정이 필요하면 부모에게 요청해야 합니다.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>모든 타입 전달 가능:</strong> 문자열, 숫자, 배열, 객체,
              함수, 심지어 다른 컴포넌트까지 전달할 수 있습니다.
            </li>
          </ul>
        </div>

        <h3>Props 전달 및 받기</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <p>
              <strong>부모 컴포넌트 (Props 전달):</strong>
            </p>
            <pre
              style={{
                backgroundColor: "#e8f5e9",
                padding: "15px",
                borderRadius: "4px",
                overflow: "auto",
              }}
            >
              {`function App() {
  return (
    <UserCard
      name="김철수"      {/* 문자열 */}
      age={25}           {/* 숫자 */}
      email="kim@example.com"
      isOnline={true}    {/* 불리언 */}
    />
  );
}`}
            </pre>
          </div>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <p>
              <strong>자식 컴포넌트 (Props 받기):</strong>
            </p>
            <pre
              style={{
                backgroundColor: "#fff3e0",
                padding: "15px",
                borderRadius: "4px",
                overflow: "auto",
              }}
            >
              {`// 방법 1: props 객체로 받기
function UserCard(props) {
  return <p>{props.name}</p>;
}

// 방법 2: 구조 분해 할당 (권장)
function UserCard({ name, age, email }) {
  return (
    <div>
      <p>이름: {name}</p>
      <p>나이: {age}</p>
    </div>
  );
}`}
            </pre>
          </div>
        </div>

        {/* UserCard 데모 */}
        <CodeDemo
          title="UserCard 컴포넌트 데모"
          code={`// Props 타입 정의
interface UserCardProps {
  name: string;
  age: number;
  email: string;
  isOnline?: boolean;  // 선택적 prop
}

// 컴포넌트 정의
function UserCard({ name, age, email, isOnline = false }: UserCardProps) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      backgroundColor: isOnline ? "#e8f5e9" : "#fff",
    }}>
      <h4>
        {name} {isOnline && <span style={{ color: "green" }}>● 온라인</span>}
      </h4>
      <p>나이: {age}세</p>
      <p>이메일: {email}</p>
    </div>
  );
}

// 사용 예시
<UserCard name="김철수" age={25} email="kim@example.com" isOnline />
<UserCard name="이영희" age={28} email="lee@example.com" />`}
        >
          <UserCard name="김철수" age={25} email="kim@example.com" isOnline />
          <UserCard name="이영희" age={28} email="lee@example.com" />
        </CodeDemo>
      </section>

      {/* ==================== TypeScript와 Props ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>2. TypeScript로 Props 타입 정의하기</h2>

        <div
          style={{
            backgroundColor: "#fff3e0",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3>왜 타입을 정의해야 하는가?</h3>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            <li>잘못된 props 전달 시 컴파일 단계에서 에러 감지</li>
            <li>자동완성 지원으로 개발 생산성 향상</li>
            <li>코드만 보고도 컴포넌트 사용법을 파악 가능</li>
          </ul>
        </div>

        <h3>interface로 Props 타입 정의</h3>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`// Props 타입 정의
interface UserCardProps {
  name: string;           // 필수 prop
  age: number;            // 필수 prop
  email: string;          // 필수 prop
  isOnline?: boolean;     // 선택적 prop (? 사용)
}

// 컴포넌트에서 타입 적용
function UserCard({
  name,
  age,
  email,
  isOnline = false  // 기본값 설정
}: UserCardProps) {
  return (
    <div>
      <h3>{name}</h3>
      <p>나이: {age}세</p>
      <p>이메일: {email}</p>
      <p>상태: {isOnline ? '온라인' : '오프라인'}</p>
    </div>
  );
}`}
        </pre>

        <h3 style={{ marginTop: "20px" }}>다양한 타입의 Props</h3>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`interface ProductProps {
  // 기본 타입
  name: string;
  price: number;
  inStock: boolean;

  // 배열 타입
  tags: string[];

  // 객체 타입
  details: {
    brand: string;
    category: string;
  };

  // 유니온 타입 (특정 값들 중 하나만 허용)
  size: 'small' | 'medium' | 'large';

  // 함수 타입 (콜백)
  onClick: () => void;
  onPriceChange: (newPrice: number) => void;
}`}
        </pre>
      </section>

      {/* ==================== children prop ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>3. children prop</h2>

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
            <strong>children</strong>은 React의 특별한 prop으로, 컴포넌트의 여는
            태그와 닫는 태그 사이에 있는 내용을 전달받습니다. 컴포넌트를
            래퍼(Wrapper)처럼 사용할 때 유용합니다.
          </p>
        </div>

        {/* children 데모 */}
        <CodeDemo
          title="children prop 데모"
          code={`// Card 컴포넌트 정의
interface CardProps {
  title: string;
  children: React.ReactNode;  // JSX를 받는 타입
}

function Card({ title, children }: CardProps) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      overflow: "hidden",
    }}>
      <div style={{
        backgroundColor: "#f5f5f5",
        padding: "12px 15px",
        fontWeight: "bold",
        borderBottom: "1px solid #ddd",
      }}>
        {title}
      </div>
      <div style={{ padding: "15px" }}>
        {children}  {/* 여기에 children이 렌더링됨 */}
      </div>
    </div>
  );
}

// 사용 예시
<Card title="공지사항">
  <p>이 부분이 children입니다!</p>
  <p style={{ color: "#666" }}>여러 요소를 넣을 수 있습니다.</p>
</Card>`}
        >
          <Card title="공지사항">
            <p>이 부분이 children입니다!</p>
            <p style={{ color: "#666" }}>여러 요소를 넣을 수 있습니다.</p>
          </Card>
        </CodeDemo>

        <div
          style={{
            backgroundColor: "#fff3e0",
            padding: "15px",
            borderRadius: "8px",
            marginTop: "20px",
          }}
        >
          <h4>React.ReactNode vs React.ReactElement</h4>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            <li>
              <strong>React.ReactNode:</strong> 모든 렌더링 가능한 것 (문자열,
              숫자, JSX, null, undefined, 배열 등)
            </li>
            <li>
              <strong>React.ReactElement:</strong> JSX 요소만 (더 제한적)
            </li>
          </ul>
          <p style={{ marginTop: "10px" }}>
            → 대부분의 경우 <code>React.ReactNode</code>를 사용하는 것이
            좋습니다.
          </p>
        </div>
      </section>

      {/* ==================== 이벤트 핸들링 ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>4. 이벤트 핸들링</h2>

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
            <strong>이벤트 핸들링</strong>은 사용자의 액션(클릭, 입력, 스크롤
            등)에 반응하여 특정 동작을 실행하는 것입니다. React에서는 JSX 속성으로
            이벤트 핸들러를 등록합니다.
          </p>
        </div>

        <h3>HTML vs React 이벤트 처리 비교</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "280px" }}>
            <p>
              <strong>HTML 방식:</strong>
            </p>
            <pre
              style={{
                backgroundColor: "#ffebee",
                padding: "15px",
                borderRadius: "4px",
              }}
            >
              {`<!-- 소문자, 문자열로 함수 호출 -->
<button onclick="handleClick()">
  클릭
</button>

<form onsubmit="handleSubmit()">
  ...
</form>`}
            </pre>
          </div>
          <div style={{ flex: 1, minWidth: "280px" }}>
            <p>
              <strong>React 방식:</strong>
            </p>
            <pre
              style={{
                backgroundColor: "#e8f5e9",
                padding: "15px",
                borderRadius: "4px",
              }}
            >
              {`{/* camelCase, 함수 참조 전달 */}
<button onClick={handleClick}>
  클릭
</button>

<form onSubmit={handleSubmit}>
  ...
</form>`}
            </pre>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#fff3e0",
            padding: "15px",
            borderRadius: "8px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <h4>핵심 차이점</h4>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  항목
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  HTML
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  React
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  이벤트명
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  소문자 (onclick)
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  camelCase (onClick)
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  핸들러 전달
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  문자열 "fn()"
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  함수 참조 {"{fn}"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  기본 동작 방지
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  return false
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  e.preventDefault()
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>주요 이벤트 종류</h3>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`// 마우스 이벤트
onClick       // 클릭
onDoubleClick // 더블클릭
onMouseEnter  // 마우스 진입
onMouseLeave  // 마우스 이탈
onMouseMove   // 마우스 이동

// 키보드 이벤트
onKeyDown     // 키 누름
onKeyUp       // 키 뗌
onKeyPress    // 키 입력 (deprecated)

// 폼 이벤트
onChange      // 값 변경
onSubmit      // 폼 제출
onFocus       // 포커스 획득
onBlur        // 포커스 상실

// 기타
onScroll      // 스크롤
onLoad        // 로드 완료
onError       // 에러 발생`}
        </pre>

        <h3 style={{ marginTop: "20px" }}>이벤트 핸들러 작성 패턴</h3>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`function MyComponent() {
  const [count, setCount] = useState(0);

  // 패턴 1: 별도 함수로 정의 (권장)
  const handleClick = () => {
    setCount(count + 1);
  };

  // 패턴 2: 이벤트 객체 사용
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);  // 입력값
    console.log(e.target.name);   // input의 name 속성
  };

  // 패턴 3: 매개변수 전달이 필요한 경우
  const handleItemClick = (id: number) => {
    console.log('클릭된 아이템:', id);
  };

  return (
    <div>
      {/* 패턴 1 */}
      <button onClick={handleClick}>클릭</button>

      {/* 패턴 2 */}
      <input onChange={handleChange} />

      {/* 패턴 3: 화살표 함수로 감싸서 전달 */}
      <button onClick={() => handleItemClick(123)}>
        아이템 123
      </button>

      {/* 주의: 잘못된 예 */}
      {/* handleItemClick(123)이 즉시 실행됨! */}
      {/* <button onClick={handleItemClick(123)}>잘못됨</button> */}
    </div>
  );
}`}
        </pre>

        {/* 이벤트 핸들링 데모 */}
        <CodeDemo
          title="이벤트 핸들링 종합 데모"
          code={`function EventExamples() {
  const [clickCount, setClickCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  // 클릭 이벤트 핸들러
  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  // 입력 이벤트 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // 기본 동작(페이지 새로고침) 방지
    alert(\`입력값: \${inputValue}\`);
  };

  return (
    <div>
      {/* 클릭 이벤트 */}
      <button onClick={handleClick}>
        클릭: {clickCount}회
      </button>

      {/* 입력 이벤트 + 폼 제출 */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="텍스트를 입력하세요"
        />
        <button type="submit">제출</button>
      </form>
      <p>입력값: {inputValue || "(비어있음)"}</p>

      {/* 마우스 이벤트 */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          padding: "20px",
          backgroundColor: isHovered ? "#bbdefb" : "#e3f2fd",
        }}
      >
        {isHovered ? "마우스가 올라왔어요!" : "여기에 마우스를 올려보세요"}
      </div>
    </div>
  );
}`}
        >
          {/* 클릭 이벤트 */}
          <div style={{ marginBottom: "15px" }}>
            <button
              onClick={handleClick}
              style={{
                padding: "10px 20px",
                fontSize: "14px",
                cursor: "pointer",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              클릭: {clickCount}회
            </button>
          </div>

          {/* 입력 이벤트 */}
          <div style={{ marginBottom: "15px" }}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="텍스트를 입력하세요"
                style={{
                  padding: "8px 12px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                제출
              </button>
            </form>
            <p style={{ margin: "10px 0 0 0", color: "#666" }}>
              입력값: {inputValue || "(비어있음)"}
            </p>
          </div>

          {/* 마우스 이벤트 */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              padding: "20px",
              backgroundColor: isHovered ? "#bbdefb" : "#e3f2fd",
              borderRadius: "4px",
              textAlign: "center",
              transition: "background-color 0.3s",
              cursor: "pointer",
            }}
          >
            {isHovered ? "마우스가 올라왔어요!" : "여기에 마우스를 올려보세요"}
          </div>
        </CodeDemo>
      </section>

      {/* ==================== e.preventDefault() ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>5. e.preventDefault()와 e.stopPropagation()</h2>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h4>e.preventDefault()</h4>
          <p>
            <strong>정의:</strong> 브라우저의 기본 동작을 막습니다.
          </p>
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            {`// 폼 제출 시 페이지 새로고침 방지
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();  // 기본 동작(새로고침) 방지
  // 비동기로 폼 데이터 처리
};

// 링크 클릭 시 페이지 이동 방지
const handleLinkClick = (e: React.MouseEvent) => {
  e.preventDefault();  // 기본 동작(페이지 이동) 방지
  // SPA에서 직접 라우팅 처리
};`}
          </pre>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h4>e.stopPropagation()</h4>
          <p>
            <strong>정의:</strong> 이벤트가 부모 요소로 전파(버블링)되는 것을
            막습니다.
          </p>
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            {`// 이벤트 버블링이란?
// 자식 요소에서 발생한 이벤트가 부모로 전파되는 현상

<div onClick={() => console.log('부모 클릭!')}>
  <button onClick={(e) => {
    e.stopPropagation();  // 부모로 전파 중지
    console.log('버튼 클릭!');
  }}>
    클릭
  </button>
</div>

// stopPropagation() 없이 버튼 클릭 시:
// "버튼 클릭!" 출력 후 "부모 클릭!"도 출력

// stopPropagation() 있으면:
// "버튼 클릭!"만 출력`}
          </pre>
        </div>
      </section>

      {/* ==================== TypeScript 이벤트 타입 ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>6. TypeScript 이벤트 타입</h2>

        <div
          style={{
            backgroundColor: "#e3f2fd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <p>
            TypeScript에서 이벤트 핸들러를 작성할 때는 적절한 이벤트 타입을
            사용해야 합니다. React는 자체 이벤트 시스템(SyntheticEvent)을
            사용합니다.
          </p>
        </div>

        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`// 자주 사용하는 이벤트 타입

// 마우스 이벤트
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};
const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {};

// 키보드 이벤트
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    // Enter 키 처리
  }
};

// 폼/입력 이벤트
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  const name = e.target.name;
};

const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {};
const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {};

// 폼 제출 이벤트
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

// 포커스 이벤트
const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {};
const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {};`}
        </pre>

        <div
          style={{
            backgroundColor: "#fff3e0",
            padding: "15px",
            borderRadius: "8px",
            marginTop: "20px",
          }}
        >
          <h4>팁: 타입을 모를 때</h4>
          <p>
            이벤트 타입을 모르겠다면, 먼저 <code>(e) =&gt; {}</code>로 작성하고
            에디터의 자동완성을 활용하거나, 마우스를 올려 추론된 타입을
            확인하세요.
          </p>
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
                Props
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                부모→자식으로 데이터 전달. 읽기 전용. interface로 타입 정의
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
                children
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                태그 사이 내용을 받는 특별한 prop. 타입은 React.ReactNode
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
                이벤트 핸들링
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                camelCase로 이벤트명 작성 (onClick, onChange). 함수 참조 전달
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
                preventDefault()
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                브라우저 기본 동작 방지 (폼 제출 시 새로고침 등)
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
                stopPropagation()
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                이벤트 버블링(부모로 전파) 방지
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
                이벤트 타입
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                React.MouseEvent, React.ChangeEvent, React.FormEvent 등 사용
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Study;
