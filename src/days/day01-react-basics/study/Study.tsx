/**
 * ========================================
 * Day 01: React 기초 & JSX
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
  // 예제에서 사용할 변수들
  const name = "React";
  const version = 19;
  const isAwesome = true;
  const today = new Date().toLocaleDateString("ko-KR");

  // 스타일 변경 데모용 상태
  const [textColor, setTextColor] = useState("blue");
  const [bgColor, setBgColor] = useState("lightyellow");

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Day 01: React 기초 & JSX</h1>

      {/* ==================== React란? ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>1. React란?</h2>

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
            <strong>React</strong>는 Facebook(현 Meta)이 개발한{" "}
            <strong>사용자 인터페이스(UI)를 만들기 위한 JavaScript 라이브러리</strong>
            입니다. 2013년에 오픈소스로 공개되었으며, 현재 가장 인기 있는 프론트엔드
            기술 중 하나입니다.
          </p>
        </div>

        <h3>React의 3가지 핵심 특징</h3>

        {/* 특징 1: 컴포넌트 기반 */}
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h4>1) 컴포넌트 기반 (Component-Based)</h4>
          <p>
            <strong>컴포넌트란?</strong> UI를 구성하는 독립적이고 재사용 가능한
            코드 조각입니다. 레고 블록처럼 작은 컴포넌트들을 조합해서 복잡한 UI를
            만듭니다.
          </p>
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "15px",
              borderRadius: "4px",
              overflow: "auto",
            }}
          >
            {`// 예시: 버튼 컴포넌트
function Button() {
  return <button>클릭하세요</button>;
}

// 예시: 카드 컴포넌트 (버튼 컴포넌트를 포함)
function Card() {
  return (
    <div>
      <h3>제목</h3>
      <p>내용</p>
      <Button />  {/* 버튼 컴포넌트 재사용 */}
    </div>
  );
}`}
          </pre>
          <p>
            <strong>장점:</strong> 한 번 만든 컴포넌트를 여러 곳에서 재사용할 수
            있고, 각 컴포넌트를 독립적으로 개발/테스트할 수 있습니다.
          </p>
        </div>

        {/* 특징 2: 선언적 */}
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h4>2) 선언적 (Declarative)</h4>
          <p>
            <strong>선언적이란?</strong> "어떻게(How)" 보다 "무엇을(What)" 보여줄지
            작성하는 방식입니다.
          </p>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "250px" }}>
              <p>
                <strong>명령적 (Vanilla JS):</strong>
              </p>
              <pre
                style={{
                  backgroundColor: "#ffebee",
                  padding: "10px",
                  borderRadius: "4px",
                  fontSize: "13px",
                }}
              >
                {`// "어떻게" 업데이트할지 직접 명령
const div = document.createElement('div');
div.id = 'counter';
div.innerText = '0';
document.body.appendChild(div);

function increment() {
  const el = document.getElementById('counter');
  el.innerText = parseInt(el.innerText) + 1;
}`}
              </pre>
            </div>
            <div style={{ flex: 1, minWidth: "250px" }}>
              <p>
                <strong>선언적 (React):</strong>
              </p>
              <pre
                style={{
                  backgroundColor: "#e8f5e9",
                  padding: "10px",
                  borderRadius: "4px",
                  fontSize: "13px",
                }}
              >
                {`// "무엇을" 보여줄지만 선언
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>
        증가
      </button>
    </div>
  );
}`}
              </pre>
            </div>
          </div>
          <p>
            <strong>장점:</strong> 코드가 더 읽기 쉽고, 상태(count)가 바뀌면
            React가 알아서 화면을 업데이트합니다.
          </p>
        </div>

        {/* 특징 3: Virtual DOM */}
        <div
          style={{
            border: "2px solid #2196f3",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <h4>3) Virtual DOM (가상 DOM)</h4>

          <div
            style={{
              backgroundColor: "#fff3e0",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <h5>먼저, DOM이란?</h5>
            <p>
              <strong>DOM (Document Object Model)</strong>은 브라우저가 HTML을
              읽고 만드는 트리 구조의 객체입니다. JavaScript로 DOM을 조작하면
              화면이 바뀝니다.
            </p>
            <pre
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              {`<!-- HTML -->
<div id="app">
  <h1>제목</h1>
  <p>내용</p>
</div>

// 위 HTML은 아래와 같은 DOM 트리가 됩니다:
// document
//   └── html
//         └── body
//               └── div#app
//                     ├── h1 ("제목")
//                     └── p ("내용")`}
            </pre>
          </div>

          <div
            style={{
              backgroundColor: "#ffebee",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <h5>DOM 조작의 문제점</h5>
            <p>
              DOM을 직접 조작하는 것은 <strong>비용이 큰 작업</strong>입니다.
            </p>
            <ul>
              <li>DOM이 바뀔 때마다 브라우저는 레이아웃을 다시 계산 (Reflow)</li>
              <li>화면을 다시 그림 (Repaint)</li>
              <li>작은 변경이라도 전체 과정이 반복됨</li>
            </ul>
            <pre
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              {`// 비효율적인 예: 1000개 아이템을 하나씩 추가
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = 'Item ' + i;
  ul.appendChild(li);  // 매번 DOM 조작 → 1000번 리렌더링!
}`}
            </pre>
          </div>

          <div
            style={{
              backgroundColor: "#e8f5e9",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <h5>Virtual DOM의 해결책</h5>
            <p>
              <strong>Virtual DOM</strong>은 실제 DOM의 가벼운 복사본(JavaScript
              객체)입니다. React는 다음 과정을 거칩니다:
            </p>
            <ol>
              <li>
                <strong>상태 변경 감지:</strong> 데이터가 바뀌면 새로운 Virtual
                DOM을 생성
              </li>
              <li>
                <strong>비교 (Diffing):</strong> 이전 Virtual DOM과 새 Virtual
                DOM을 비교해서 변경된 부분만 찾음
              </li>
              <li>
                <strong>일괄 업데이트 (Batch Update):</strong> 변경된 부분만 실제
                DOM에 한 번에 적용
              </li>
            </ol>
            <pre
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              {`// Virtual DOM 동작 과정 (개념적 설명)

// 1. 현재 Virtual DOM
{
  type: 'div',
  children: [
    { type: 'h1', children: '제목' },
    { type: 'p', children: '내용' }  // ← 이 부분이 바뀜
  ]
}

// 2. 새로운 Virtual DOM (p 내용 변경)
{
  type: 'div',
  children: [
    { type: 'h1', children: '제목' },
    { type: 'p', children: '새로운 내용' }  // ← 변경됨
  ]
}

// 3. React가 두 Virtual DOM을 비교 (Diffing)
// → "p 태그의 텍스트만 바뀌었네!"

// 4. 실제 DOM에는 p 태그의 텍스트만 업데이트
// → div나 h1은 건드리지 않음 (최소한의 조작)`}
            </pre>
          </div>

          <div
            style={{
              backgroundColor: "#e3f2fd",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h5>Virtual DOM의 장점 요약</h5>
            <ul>
              <li>
                <strong>성능 최적화:</strong> 변경된 부분만 실제 DOM에 반영하여
                불필요한 리렌더링 방지
              </li>
              <li>
                <strong>배치 처리:</strong> 여러 변경사항을 모아서 한 번에 처리
              </li>
              <li>
                <strong>개발 편의성:</strong> 개발자는 DOM 조작을 신경 쓰지 않고
                상태 관리에만 집중
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ==================== JSX란? ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>2. JSX란?</h2>

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
            <strong>JSX (JavaScript XML)</strong>는 JavaScript 코드 안에서
            HTML과 유사한 마크업을 작성할 수 있게 해주는{" "}
            <strong>문법 확장(Syntax Extension)</strong>입니다.
          </p>
          <p>
            JSX는 브라우저가 직접 이해할 수 없으므로, Babel 같은 트랜스파일러가
            순수 JavaScript로 변환합니다.
          </p>
        </div>

        <h3>JSX가 JavaScript로 변환되는 과정</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <p>
              <strong>우리가 작성하는 JSX:</strong>
            </p>
            <pre
              style={{
                backgroundColor: "#e8f5e9",
                padding: "15px",
                borderRadius: "4px",
              }}
            >
              {`const element = (
  <div className="greeting">
    <h1>안녕하세요!</h1>
    <p>React를 배워봅시다.</p>
  </div>
);`}
            </pre>
          </div>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <p>
              <strong>Babel이 변환한 JavaScript:</strong>
            </p>
            <pre
              style={{
                backgroundColor: "#fff3e0",
                padding: "15px",
                borderRadius: "4px",
              }}
            >
              {`const element = React.createElement(
  'div',
  { className: 'greeting' },
  React.createElement('h1', null, '안녕하세요!'),
  React.createElement('p', null, 'React를 배워봅시다.')
);`}
            </pre>
          </div>
        </div>
        <p style={{ marginTop: "10px", color: "#666" }}>
          → JSX 덕분에 React.createElement를 직접 호출하지 않고도 직관적으로
          UI를 작성할 수 있습니다.
        </p>
      </section>

      {/* ==================== JSX 규칙 ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>3. JSX 필수 규칙</h2>

        {/* 규칙 1 */}
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h4>규칙 1: 반드시 하나의 루트 요소로 감싸야 한다</h4>
          <p>
            <strong>이유:</strong> JSX는 하나의 React.createElement() 호출로
            변환되므로, 하나의 부모 요소가 필요합니다.
          </p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <p style={{ color: "red" }}>❌ 잘못된 예:</p>
              <pre
                style={{
                  backgroundColor: "#ffebee",
                  padding: "10px",
                  borderRadius: "4px",
                }}
              >
                {`return (
  <h1>제목</h1>
  <p>내용</p>
);
// Error: JSX expressions must
// have one parent element`}
              </pre>
            </div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <p style={{ color: "green" }}>✅ 올바른 예:</p>
              <pre
                style={{
                  backgroundColor: "#e8f5e9",
                  padding: "10px",
                  borderRadius: "4px",
                }}
              >
                {`// div로 감싸기
return (
  <div>
    <h1>제목</h1>
    <p>내용</p>
  </div>
);

// 또는 Fragment (<></>) 사용
return (
  <>
    <h1>제목</h1>
    <p>내용</p>
  </>
);`}
              </pre>
            </div>
          </div>
          <p style={{ marginTop: "10px" }}>
            <strong>Fragment란?</strong> {"<></>"} 또는 {"<React.Fragment>"}는
            실제 DOM에 렌더링되지 않는 투명한 래퍼입니다. 불필요한 div를 추가하고
            싶지 않을 때 사용합니다.
          </p>
        </div>

        {/* 규칙 2 */}
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h4>규칙 2: 모든 태그는 반드시 닫아야 한다</h4>
          <p>
            <strong>이유:</strong> JSX는 XML 문법을 따르므로, 모든 태그가 닫혀야
            합니다.
          </p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <p style={{ color: "red" }}>❌ HTML에서는 되지만 JSX에서는 안됨:</p>
              <pre
                style={{
                  backgroundColor: "#ffebee",
                  padding: "10px",
                  borderRadius: "4px",
                }}
              >
                {`<img src="photo.jpg">
<input type="text">
<br>`}
              </pre>
            </div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <p style={{ color: "green" }}>✅ JSX에서는 self-closing 필수:</p>
              <pre
                style={{
                  backgroundColor: "#e8f5e9",
                  padding: "10px",
                  borderRadius: "4px",
                }}
              >
                {`<img src="photo.jpg" />
<input type="text" />
<br />`}
              </pre>
            </div>
          </div>
        </div>

        {/* 규칙 3 */}
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h4>규칙 3: HTML 속성명이 camelCase로 바뀐다</h4>
          <p>
            <strong>이유:</strong> class, for 등은 JavaScript 예약어이므로 다른
            이름을 사용합니다.
          </p>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  HTML
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  JSX
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  이유
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  class
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <strong>className</strong>
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  class는 JS 예약어
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  for
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <strong>htmlFor</strong>
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  for는 JS 예약어
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  onclick
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <strong>onClick</strong>
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  camelCase 규칙
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  tabindex
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <strong>tabIndex</strong>
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  camelCase 규칙
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ==================== 중괄호 사용 ==================== */}
      <section style={{ marginBottom: "40px" }}>
        <h2>4. 중괄호 {"{}"} 사용하기</h2>

        <div
          style={{
            backgroundColor: "#e3f2fd",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <p>
            JSX 안에서 JavaScript 표현식을 사용하려면 <strong>중괄호 {"{}"}</strong>
            로 감쌉니다. 중괄호 안에는 어떤 JavaScript 표현식이든 넣을 수 있습니다.
          </p>
        </div>

        <h3>실습 예제</h3>

        {/* 4-1. 변수 출력 데모 */}
        <CodeDemo
          title="4-1. 변수 출력하기"
          code={`// 컴포넌트 내부에서 변수 선언
const name = "React";
const version = 19;
const isAwesome = true;

// JSX에서 변수 사용
return (
  <div>
    <p>라이브러리 이름: {name}</p>
    <p>버전: {version}</p>
    <p>멋진가요? {isAwesome ? "네!" : "아니요"}</p>
  </div>
);`}
        >
          <p>라이브러리 이름: {name}</p>
          <p>버전: {version}</p>
          <p>멋진가요? {isAwesome ? "네!" : "아니요"}</p>
        </CodeDemo>

        {/* 4-2. 계산식 데모 */}
        <CodeDemo
          title="4-2. 계산식 사용하기"
          code={`// 중괄호 안에서 직접 계산 가능
return (
  <div>
    <p>1 + 2 + 3 = {1 + 2 + 3}</p>
    <p>직접 계산: {10 * 5}</p>
    <p>문자열 연결: {"Hello" + " " + "World"}</p>
  </div>
);`}
        >
          <p>1 + 2 + 3 = {1 + 2 + 3}</p>
          <p>직접 계산: {10 * 5}</p>
          <p>문자열 연결: {"Hello" + " " + "World"}</p>
        </CodeDemo>

        {/* 4-3. 함수 호출 데모 */}
        <CodeDemo
          title="4-3. 함수 호출하기"
          code={`// 함수 호출 결과를 바로 렌더링
return (
  <div>
    <p>오늘 날짜: {new Date().toLocaleDateString('ko-KR')}</p>
    <p>대문자로: {"react".toUpperCase()}</p>
    <p>배열 길이: {[1, 2, 3, 4, 5].length}개</p>
  </div>
);`}
        >
          <p>오늘 날짜: {today}</p>
          <p>대문자로: {name.toUpperCase()}</p>
          <p>배열 길이: {[1, 2, 3, 4, 5].length}개</p>
        </CodeDemo>

        {/* 4-4. 인라인 스타일 데모 */}
        <CodeDemo
          title="4-4. 인라인 스타일 적용하기"
          code={`// style 속성은 객체로 전달
// CSS 속성명은 camelCase로 작성
// font-size → fontSize
// background-color → backgroundColor

return (
  <div>
    <p style={{ color: 'blue', fontSize: '18px' }}>
      파란색 글씨입니다
    </p>
    <p style={{ backgroundColor: 'yellow', padding: '10px' }}>
      노란 배경입니다
    </p>
  </div>
);

// 이중 중괄호 설명:
// 바깥 {} → JSX 표현식
// 안쪽 {} → JavaScript 객체`}
        >
          <p style={{ color: "blue", fontSize: "18px" }}>파란색 글씨입니다</p>
          <p style={{ backgroundColor: "yellow", padding: "10px" }}>
            노란 배경입니다
          </p>
        </CodeDemo>

        {/* 4-5. 동적 스타일 데모 (인터랙티브) */}
        <CodeDemo
          title="4-5. 동적 스타일 변경 (인터랙티브 데모)"
          code={`// useState로 스타일 값을 상태로 관리
const [textColor, setTextColor] = useState("blue");
const [bgColor, setBgColor] = useState("lightyellow");

return (
  <div>
    {/* 버튼으로 상태 변경 */}
    <div style={{ marginBottom: '15px' }}>
      <span>글자색: </span>
      <button onClick={() => setTextColor("blue")}>파랑</button>
      <button onClick={() => setTextColor("red")}>빨강</button>
      <button onClick={() => setTextColor("green")}>초록</button>
    </div>

    <div style={{ marginBottom: '15px' }}>
      <span>배경색: </span>
      <button onClick={() => setBgColor("lightyellow")}>노랑</button>
      <button onClick={() => setBgColor("lightpink")}>분홍</button>
      <button onClick={() => setBgColor("lightcyan")}>청록</button>
    </div>

    {/* 상태 값을 style에 적용 */}
    <p style={{
      color: textColor,
      backgroundColor: bgColor,
      padding: '20px',
      fontSize: '20px'
    }}>
      이 텍스트의 스타일이 동적으로 변합니다!
    </p>
  </div>
);`}
        >
          <div style={{ marginBottom: "15px" }}>
            <span>글자색: </span>
            <button
              onClick={() => setTextColor("blue")}
              style={{
                marginRight: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              파랑
            </button>
            <button
              onClick={() => setTextColor("red")}
              style={{
                marginRight: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              빨강
            </button>
            <button
              onClick={() => setTextColor("green")}
              style={{ padding: "5px 10px", cursor: "pointer" }}
            >
              초록
            </button>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <span>배경색: </span>
            <button
              onClick={() => setBgColor("lightyellow")}
              style={{
                marginRight: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              노랑
            </button>
            <button
              onClick={() => setBgColor("lightpink")}
              style={{
                marginRight: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              분홍
            </button>
            <button
              onClick={() => setBgColor("lightcyan")}
              style={{ padding: "5px 10px", cursor: "pointer" }}
            >
              청록
            </button>
          </div>

          <p
            style={{
              color: textColor,
              backgroundColor: bgColor,
              padding: "20px",
              fontSize: "20px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
            }}
          >
            이 텍스트의 스타일이 동적으로 변합니다!
          </p>
        </CodeDemo>

        <div
          style={{
            backgroundColor: "#fff3e0",
            padding: "20px",
            borderRadius: "8px",
            marginTop: "20px",
          }}
        >
          <h4>주의: 중괄호 안에 넣을 수 없는 것</h4>
          <ul>
            <li>
              <strong>객체 자체:</strong> {`{name: 'React'}`}는 직접 렌더링 불가
              → 객체의 특정 속성을 접근해야 함
            </li>
            <li>
              <strong>if문:</strong> {`{if (true) { ... }}`}는 불가 → 삼항연산자
              사용
            </li>
            <li>
              <strong>for문:</strong> {`{for (...) { }}`}는 불가 → map() 사용
            </li>
          </ul>
          <p>
            <strong>규칙:</strong> 중괄호 안에는 <strong>값을 반환하는 표현식</strong>
            만 가능합니다.
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
                React
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                UI를 만드는 JavaScript 라이브러리. 컴포넌트 기반, 선언적, Virtual
                DOM 특징
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
                Virtual DOM
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                실제 DOM의 가벼운 복사본. 변경사항을 비교(Diffing)해서 필요한
                부분만 실제 DOM에 반영
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
                JSX
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                JavaScript 안에서 HTML처럼 작성하는 문법. React.createElement()로
                변환됨
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
                JSX 규칙
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                1) 하나의 루트 요소 2) 태그 닫기 필수 3) className, htmlFor 등
                camelCase
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
                중괄호 {"{}"}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                JSX 안에서 JavaScript 표현식 사용. 변수, 계산식, 함수 호출 등
                가능
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Study;
