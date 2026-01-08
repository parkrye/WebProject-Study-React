/**
 * ========================================
 * Day 04: 실습 - 이벤트 핸들링
 * ========================================
 *
 * 🎯 실습 목표:
 * 다양한 이벤트 핸들러를 직접 구현해보세요.
 */

function Practice() {
  // TODO 1: 버튼 클릭 카운터
  // - "클릭!" 버튼을 누를 때마다 console.log로 클릭 횟수 출력
  // - 힌트: 변수를 만들고 클릭할 때마다 1 증가
  let clickCount = 0;

  const handleCountClick = () => {
    // 여기에 코드를 작성하세요
  };

  // TODO 2: 입력값 실시간 표시
  // - input에 입력할 때마다 console.log로 현재 입력값 출력
  // - 글자 수도 함께 출력
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 여기에 코드를 작성하세요
    // 힌트: e.target.value, e.target.value.length
  };

  // TODO 3: 키보드 이벤트
  // - 특정 키를 누르면 다른 동작 수행
  // - Enter: "제출!" 출력
  // - Escape: "취소!" 출력
  // - 그 외: 누른 키 이름 출력
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 여기에 코드를 작성하세요
  };

  // TODO 4: 폼 제출 처리
  // - 폼 제출 시 기본 동작 방지
  // - "폼이 제출되었습니다" alert 표시
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 여기에 코드를 작성하세요
  };

  // TODO 5: 더블클릭 이벤트
  // - 더블클릭하면 "더블클릭!" alert
  // - 힌트: onDoubleClick
  const handleDoubleClick = () => {
    // 여기에 코드를 작성하세요
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 04: 실습</h1>

      <section style={{ marginBottom: "30px" }}>
        <h2>1. 클릭 카운터</h2>
        <button onClick={handleCountClick}>클릭! (콘솔 확인)</button>
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>2. 입력값 표시</h2>
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="입력해보세요"
          style={{ padding: "8px", width: "200px" }}
        />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>3. 키보드 이벤트</h2>
        <input
          type="text"
          onKeyDown={handleKeyDown}
          placeholder="Enter, Escape 등을 눌러보세요"
          style={{ padding: "8px", width: "250px" }}
        />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>4. 폼 제출</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="이름"
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <button type="submit">제출</button>
        </form>
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>5. 더블클릭</h2>
        <div
          onDoubleClick={handleDoubleClick}
          style={{
            padding: "30px",
            backgroundColor: "#e0e0e0",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          이 영역을 더블클릭하세요
        </div>
      </section>

      {/* TODO 6: 추가 도전 */}
      {/* 마우스 위치 추적기를 만들어보세요 */}
      {/* onMouseMove 이벤트를 사용하여 마우스 x, y 좌표를 console.log로 출력 */}
      <section style={{ marginBottom: "30px" }}>
        <h2>6. 도전: 마우스 위치 추적</h2>
        {/* 여기에 코드를 작성하세요 */}
      </section>
    </div>
  );
}

export default Practice;
