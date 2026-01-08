/**
 * ========================================
 * Day 02: 컴포넌트 기초
 * ========================================
 *
 * 📚 학습 목표:
 * 1. 컴포넌트가 무엇인지 이해한다
 * 2. 함수형 컴포넌트를 만들 수 있다
 * 3. 컴포넌트를 분리하고 조합할 수 있다
 */

// ----------------------------------------
// 1. 컴포넌트란?
// ----------------------------------------
/**
 * 컴포넌트는 UI를 구성하는 독립적인 조각입니다.
 *
 * 레고 블록처럼:
 * - 작은 조각들을 조합해서 큰 구조물을 만든다
 * - 각 조각은 재사용할 수 있다
 * - 하나의 조각이 고장나도 전체에 영향이 적다
 *
 * 예: 웹페이지
 * - Header 컴포넌트
 * - Navigation 컴포넌트
 * - Content 컴포넌트
 * - Footer 컴포넌트
 */

// ----------------------------------------
// 2. 함수형 컴포넌트 만들기
// ----------------------------------------
/**
 * 컴포넌트는 대문자로 시작하는 함수입니다.
 * JSX를 반환합니다.
 */

// 가장 간단한 컴포넌트
function Hello() {
  return <p>안녕하세요!</p>;
}

// 여러 요소를 반환하는 컴포넌트
function Greeting() {
  return (
    <div>
      <h2>환영합니다</h2>
      <p>React 학습을 시작해봅시다!</p>
    </div>
  );
}

// ----------------------------------------
// 3. 컴포넌트 사용하기
// ----------------------------------------
/**
 * 컴포넌트는 HTML 태그처럼 사용합니다.
 * <컴포넌트이름 />
 */

// ----------------------------------------
// 4. 컴포넌트 분리 예시
// ----------------------------------------

// Header 컴포넌트
function Header() {
  return (
    <header
      style={{
        backgroundColor: "#333",
        color: "white",
        padding: "10px 20px",
      }}
    >
      <h1>My Website</h1>
    </header>
  );
}

// Navigation 컴포넌트
function Navigation() {
  return (
    <nav
      style={{
        backgroundColor: "#f0f0f0",
        padding: "10px",
      }}
    >
      <span style={{ marginRight: "15px" }}>홈</span>
      <span style={{ marginRight: "15px" }}>소개</span>
      <span style={{ marginRight: "15px" }}>연락처</span>
    </nav>
  );
}

// Card 컴포넌트 - 재사용 가능!
function Card() {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        margin: "10px",
        maxWidth: "200px",
      }}
    >
      <h3>카드 제목</h3>
      <p>카드 내용이 들어갑니다.</p>
    </div>
  );
}

// Footer 컴포넌트
function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#333",
        color: "white",
        padding: "10px 20px",
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      <p>© 2025 My Website</p>
    </footer>
  );
}

// ----------------------------------------
// 5. 메인 컴포넌트 - 다른 컴포넌트들을 조합
// ----------------------------------------

function Study() {
  return (
    <div>
      <h1 style={{ padding: "20px" }}>Day 02: 컴포넌트 기초</h1>

      <section style={{ padding: "20px" }}>
        <h2>1. 간단한 컴포넌트 사용</h2>
        <Hello />
        <Hello />
        <Hello />
        {/* 같은 컴포넌트를 여러 번 사용할 수 있습니다! */}
      </section>

      <section style={{ padding: "20px" }}>
        <h2>2. Greeting 컴포넌트</h2>
        <Greeting />
      </section>

      <section>
        <h2 style={{ padding: "20px" }}>3. 페이지 구조 예시</h2>
        <Header />
        <Navigation />
        <div style={{ padding: "20px" }}>
          <h3>컨텐츠 영역</h3>
          {/* Card 컴포넌트 재사용 */}
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}

export default Study;
