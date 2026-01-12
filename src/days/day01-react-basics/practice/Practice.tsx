/**
 * ========================================
 * Day 01: 실습 - JSX 작성하기
 * ========================================
 *
 * 🎯 실습 목표:
 * 아래 지시사항을 따라 JSX 코드를 완성하세요.
 */

function Practice() {
  // TODO 1: 아래 변수들을 선언하세요
  // - myName: 본인 이름 (문자열)
  // - age: 본인 나이 (숫자)
  // - hobby: 취미 (문자열)

  // TODO 2: 좋아하는 색상을 담은 변수를 선언하세요
  // - favoriteColor: 예) "purple", "#3498db" 등

  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 01: 실습</h1>

      {/* TODO 3: 자기소개 카드 만들기 */}
      {/* 아래 div 안에 자기소개를 작성하세요 */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "300px",
        }}
      >
        <h2>자기소개</h2>

        {/* TODO 4: 이름을 출력하세요 */}
        {/* 예: <p>이름: {myName}</p> */}
        {/* TODO 5: 나이를 출력하세요 */}

        {/* TODO 6: 취미를 출력하세요 */}

        {/* TODO 7: 좋아하는 색상으로 스타일된 텍스트를 만드세요 */}
        {/* 힌트: style={{ color: favoriteColor }} */}
      </div>

      {/* TODO 8: 간단한 계산기 */}
      {/* 두 숫자를 더하고, 빼고, 곱한 결과를 표시하세요 */}
      <div style={{ marginTop: "20px" }}>
        <h2>간단한 계산</h2>
        {/*
          예시:
          <p>10 + 5 = {10 + 5}</p>
          <p>10 - 5 = {10 - 5}</p>
          <p>10 × 5 = {10 * 5}</p>
        */}
      </div>

      {/* TODO 9: 현재 시간 표시하기 */}
      {/* 힌트: new Date().toLocaleTimeString('ko-KR') */}
      <div style={{ marginTop: "20px" }}>
        <h2>현재 시간</h2>
        {/* 여기에 현재 시간을 표시하세요 */}
      </div>
    </div>
  );
}

export default Practice;
