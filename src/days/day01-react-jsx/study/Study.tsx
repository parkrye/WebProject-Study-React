/**
 * ========================================
 * Day 01: React 소개 & JSX
 * ========================================
 *
 * 📚 학습 목표:
 * 1. React가 무엇인지 이해한다
 * 2. JSX 문법을 이해하고 사용할 수 있다
 * 3. 중괄호 {}를 사용해 JavaScript 표현식을 삽입할 수 있다
 */

// ----------------------------------------
// 1. React란?
// ----------------------------------------
/**
 * React는 사용자 인터페이스(UI)를 만들기 위한 JavaScript 라이브러리입니다.
 *
 * 특징:
 * - 컴포넌트 기반: UI를 독립적인 조각(컴포넌트)으로 나누어 개발
 * - 선언적: "어떻게" 보다 "무엇을" 보여줄지 작성
 * - Virtual DOM: 효율적인 화면 업데이트
 */

// ----------------------------------------
// 2. JSX란?
// ----------------------------------------
/**
 * JSX = JavaScript + XML
 * JavaScript 안에서 HTML처럼 생긴 코드를 작성할 수 있게 해줍니다.
 *
 * 일반 JavaScript:
 * const element = React.createElement('h1', null, '안녕하세요');
 *
 * JSX:
 * const element = <h1>안녕하세요</h1>;
 *
 * 둘은 같은 결과를 만들지만, JSX가 훨씬 읽기 쉽습니다!
 */

// ----------------------------------------
// 3. JSX 기본 규칙
// ----------------------------------------
/**
 * 규칙 1: 반드시 하나의 부모 요소로 감싸야 한다
 *
 * ❌ 잘못된 예:
 * return (
 *   <h1>제목</h1>
 *   <p>내용</p>
 * )
 *
 * ✅ 올바른 예:
 * return (
 *   <div>
 *     <h1>제목</h1>
 *     <p>내용</p>
 *   </div>
 * )
 *
 * ✅ Fragment 사용 (빈 태그):
 * return (
 *   <>
 *     <h1>제목</h1>
 *     <p>내용</p>
 *   </>
 * )
 */

/**
 * 규칙 2: 태그는 반드시 닫아야 한다
 *
 * HTML에서는 <img>, <br>, <input> 등을 닫지 않아도 됨
 * JSX에서는 반드시 닫아야 함!
 *
 * ❌ <img src="photo.jpg">
 * ✅ <img src="photo.jpg" />
 *
 * ❌ <input type="text">
 * ✅ <input type="text" />
 */

/**
 * 규칙 3: HTML 속성명이 다르다
 *
 * class → className
 * for → htmlFor
 *
 * ❌ <div class="container">
 * ✅ <div className="container">
 */

// ----------------------------------------
// 4. 중괄호 {} 사용하기
// ----------------------------------------
/**
 * JSX 안에서 JavaScript 값을 사용하려면 중괄호 {}를 사용합니다.
 */

function Study() {
  // JavaScript 변수 선언
  const name = "React";
  const version = 19;
  const isAwesome = true;

  // 계산식도 가능
  const sum = 1 + 2 + 3;

  // 오늘 날짜
  const today = new Date().toLocaleDateString("ko-KR");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 01: React 소개 & JSX</h1>

      <section>
        <h2>1. 변수 출력하기</h2>
        <p>라이브러리 이름: {name}</p>
        <p>버전: {version}</p>
        <p>멋진가요? {isAwesome ? "네!" : "아니요"}</p>
      </section>

      <section>
        <h2>2. 계산식 사용하기</h2>
        <p>1 + 2 + 3 = {sum}</p>
        <p>직접 계산: {10 * 5}</p>
      </section>

      <section>
        <h2>3. 함수 호출하기</h2>
        <p>오늘 날짜: {today}</p>
        <p>대문자로: {name.toUpperCase()}</p>
      </section>

      <section>
        <h2>4. 스타일 적용하기</h2>
        {/* JSX에서 style은 객체로 전달합니다 */}
        <p style={{ color: "blue", fontSize: "18px" }}>파란색 글씨입니다</p>
        <p style={{ backgroundColor: "yellow", padding: "10px" }}>
          노란 배경입니다
        </p>
      </section>

      {/* JSX 주석은 이렇게 작성합니다 */}
    </div>
  );
}

export default Study;
