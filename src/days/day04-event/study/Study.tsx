/**
 * ========================================
 * Day 04: 이벤트 핸들링
 * ========================================
 *
 * 📚 학습 목표:
 * 1. React에서 이벤트를 처리하는 방법을 이해한다
 * 2. onClick, onChange 등 주요 이벤트를 사용할 수 있다
 * 3. 이벤트 객체를 활용할 수 있다
 */

// ----------------------------------------
// 1. 이벤트란?
// ----------------------------------------
/**
 * 이벤트 = 사용자의 행동
 * - 클릭 (click)
 * - 입력 (change, input)
 * - 제출 (submit)
 * - 마우스 오버 (mouseenter, mouseleave)
 * - 키보드 (keydown, keyup)
 *
 * React에서는 camelCase로 작성합니다:
 * - onclick → onClick
 * - onchange → onChange
 * - onsubmit → onSubmit
 */

// ----------------------------------------
// 2. onClick - 클릭 이벤트
// ----------------------------------------

function ClickExample() {
  // 이벤트 핸들러 함수
  const handleClick = () => {
    alert("버튼이 클릭되었습니다!");
  };

  // 매개변수가 필요한 경우
  const handleGreet = (name: string) => {
    alert(`안녕하세요, ${name}님!`);
  };

  return (
    <div>
      <h3>onClick 예제</h3>

      {/* 방법 1: 함수 참조 전달 */}
      <button onClick={handleClick}>클릭하세요</button>

      {/* 방법 2: 인라인 함수 */}
      <button onClick={() => alert("인라인 클릭!")}>인라인 클릭</button>

      {/* 방법 3: 매개변수 전달 */}
      <button onClick={() => handleGreet("철수")}>철수에게 인사</button>
      <button onClick={() => handleGreet("영희")}>영희에게 인사</button>

      {/* ❌ 잘못된 예: 함수를 호출해버림 (렌더링 시 즉시 실행됨!) */}
      {/* <button onClick={handleClick()}>잘못된 방법</button> */}
    </div>
  );
}

// ----------------------------------------
// 3. 이벤트 객체 사용하기
// ----------------------------------------

function EventObjectExample() {
  // 이벤트 객체에서 정보 얻기
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("클릭된 요소:", e.target);
    console.log("클릭 위치:", e.clientX, e.clientY);
  };

  // 키보드 이벤트
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("눌린 키:", e.key);
    if (e.key === "Enter") {
      alert("엔터 키를 눌렀습니다!");
    }
  };

  return (
    <div>
      <h3>이벤트 객체 예제</h3>
      <button onClick={handleButtonClick}>클릭 정보 보기 (콘솔)</button>
      <br />
      <br />
      <input
        type="text"
        placeholder="Enter를 눌러보세요"
        onKeyDown={handleKeyDown}
        style={{ padding: "8px" }}
      />
    </div>
  );
}

// ----------------------------------------
// 4. onChange - 입력 이벤트
// ----------------------------------------

function InputExample() {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("입력값:", e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("선택값:", e.target.value);
  };

  return (
    <div>
      <h3>onChange 예제</h3>

      <div style={{ marginBottom: "10px" }}>
        <label>텍스트 입력: </label>
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="입력해보세요 (콘솔 확인)"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>선택: </label>
        <select onChange={handleSelectChange}>
          <option value="">선택하세요</option>
          <option value="apple">사과</option>
          <option value="banana">바나나</option>
          <option value="orange">오렌지</option>
        </select>
      </div>
    </div>
  );
}

// ----------------------------------------
// 5. onSubmit - 폼 제출
// ----------------------------------------

function FormExample() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 페이지 새로고침 방지!
    alert("폼이 제출되었습니다!");
  };

  return (
    <div>
      <h3>onSubmit 예제</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="이름" style={{ marginRight: "10px" }} />
        <button type="submit">제출</button>
      </form>
      <p style={{ fontSize: "12px", color: "gray" }}>
        * e.preventDefault()로 기본 동작(페이지 새로고침)을 막습니다
      </p>
    </div>
  );
}

// ----------------------------------------
// 6. 마우스 이벤트
// ----------------------------------------

function MouseExample() {
  return (
    <div>
      <h3>마우스 이벤트 예제</h3>
      <div
        onMouseEnter={() => console.log("마우스 진입!")}
        onMouseLeave={() => console.log("마우스 이탈!")}
        style={{
          padding: "30px",
          backgroundColor: "#f0f0f0",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        마우스를 올려보세요 (콘솔 확인)
      </div>
    </div>
  );
}

// ----------------------------------------
// 메인 컴포넌트
// ----------------------------------------

function Study() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 04: 이벤트 핸들링</h1>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <ClickExample />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <EventObjectExample />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <InputExample />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <FormExample />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <MouseExample />
      </section>
    </div>
  );
}

export default Study;
