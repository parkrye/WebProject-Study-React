/**
 * ========================================
 * Day 05: 실습 - 조건부 렌더링 & 리스트
 * ========================================
 *
 * 🎯 실습 목표:
 * 조건부 렌더링과 리스트 렌더링을 연습합니다.
 */

function Practice() {
  // 데이터
  const isAdmin = true;
  const hasNotifications = true;
  const notificationCount = 3;

  const todos = [
    { id: 1, text: "React 공부하기", completed: true },
    { id: 2, text: "운동하기", completed: false },
    { id: 3, text: "책 읽기", completed: false },
    { id: 4, text: "코딩 테스트", completed: true },
  ];

  const users = [
    { id: 1, name: "김철수", role: "admin", isActive: true },
    { id: 2, name: "이영희", role: "user", isActive: true },
    { id: 3, name: "박민수", role: "user", isActive: false },
    { id: 4, name: "정수진", role: "moderator", isActive: true },
  ];

  const emptyList: string[] = [];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 05: 실습</h1>

      {/* TODO 1: 관리자 전용 메뉴 */}
      {/* isAdmin이 true일 때만 "관리자 메뉴" 버튼을 표시하세요 */}
      <section style={{ marginBottom: "30px" }}>
        <h2>1. 관리자 전용 메뉴</h2>
        {/* 여기에 코드를 작성하세요 */}
        {/* 힌트: && 연산자 사용 */}
      </section>

      {/* TODO 2: 알림 뱃지 */}
      {/* hasNotifications가 true이고 notificationCount > 0일 때 뱃지 표시 */}
      <section style={{ marginBottom: "30px" }}>
        <h2>2. 알림 뱃지</h2>
        <div>
          알림
          {/* 여기에 코드를 작성하세요 */}
          {/* 빨간 원 안에 숫자 표시 */}
        </div>
      </section>

      {/* TODO 3: Todo 리스트 렌더링 */}
      {/* todos 배열을 리스트로 렌더링하세요 */}
      {/* completed가 true인 항목은 취소선(textDecoration: 'line-through') 적용 */}
      <section style={{ marginBottom: "30px" }}>
        <h2>3. Todo 리스트</h2>
        <ul>
          {/* 여기에 코드를 작성하세요 */}
          {/* 힌트: todos.map() 사용 */}
        </ul>
      </section>

      {/* TODO 4: 사용자 목록 */}
      {/* users 배열을 카드 형태로 렌더링하세요 */}
      {/* - isActive가 false인 사용자는 흐리게(opacity: 0.5) */}
      {/* - role이 'admin'인 사용자 이름 옆에 [관리자] 표시 */}
      <section style={{ marginBottom: "30px" }}>
        <h2>4. 사용자 목록</h2>
        <div>
          {/* 여기에 코드를 작성하세요 */}
        </div>
      </section>

      {/* TODO 5: 빈 리스트 처리 */}
      {/* emptyList가 비어있으면 "항목이 없습니다" 메시지 표시 */}
      <section style={{ marginBottom: "30px" }}>
        <h2>5. 빈 리스트 처리</h2>
        {/* 여기에 코드를 작성하세요 */}
        {/* 힌트: 삼항 연산자 또는 && 사용 */}
      </section>

      {/* TODO 6: 도전 - 필터링된 리스트 */}
      {/* users 중 isActive가 true인 사용자만 표시하세요 */}
      {/* 힌트: filter()와 map() 조합 */}
      <section style={{ marginBottom: "30px" }}>
        <h2>6. 도전: 활성 사용자만 표시</h2>
        <div>
          {/* 여기에 코드를 작성하세요 */}
        </div>
      </section>
    </div>
  );
}

export default Practice;
