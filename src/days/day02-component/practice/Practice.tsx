/**
 * ========================================
 * Day 02: 실습 - 컴포넌트 만들기
 * ========================================
 *
 * 🎯 실습 목표:
 * 여러 개의 컴포넌트를 만들고 조합해보세요.
 */

// TODO 1: Badge 컴포넌트 만들기
// - 작은 뱃지 형태의 UI를 만드세요
// - 스타일: 배경색, padding, borderRadius 적용
// - 텍스트: "NEW" 또는 "HOT" 등
function Badge() {
  // 여기에 코드를 작성하세요
  return null; // 이 줄을 수정하세요
}

// TODO 2: Avatar 컴포넌트 만들기
// - 프로필 이미지를 대체하는 원형 UI
// - 스타일: 원형(borderRadius: '50%'), 배경색, 크기(width, height)
// - 가운데에 이니셜 표시 (예: "A", "김")
function Avatar() {
  // 여기에 코드를 작성하세요
  return null; // 이 줄을 수정하세요
}

// TODO 3: Button 컴포넌트 만들기
// - 클릭 가능해 보이는 버튼 UI
// - 스타일: 배경색, 글자색, padding, border 없음, borderRadius
// - cursor: 'pointer' 추가
function Button() {
  // 여기에 코드를 작성하세요
  return null; // 이 줄을 수정하세요
}

// TODO 4: Alert 컴포넌트 만들기
// - 알림 메시지를 표시하는 박스
// - 스타일: 배경색(연한 노랑 또는 연한 빨강), border, padding
// - 아이콘(이모지)과 메시지 표시
function Alert() {
  // 여기에 코드를 작성하세요
  return null; // 이 줄을 수정하세요
}

// TODO 5: UserCard 컴포넌트 만들기
// - 위에서 만든 Avatar, Badge, Button을 조합!
// - 카드 형태로 사용자 정보 표시
function UserCard() {
  // 여기에 코드를 작성하세요
  // Avatar, Badge, Button 컴포넌트를 사용해보세요
  return null; // 이 줄을 수정하세요
}

function Practice() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 02: 실습</h1>

      <section style={{ marginBottom: "30px" }}>
        <h2>1. Badge 컴포넌트</h2>
        <Badge />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>2. Avatar 컴포넌트</h2>
        <Avatar />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>3. Button 컴포넌트</h2>
        <Button />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>4. Alert 컴포넌트</h2>
        <Alert />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>5. UserCard 컴포넌트 (조합)</h2>
        <UserCard />
      </section>
    </div>
  );
}

export default Practice;
