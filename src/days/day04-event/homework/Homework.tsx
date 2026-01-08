/**
 * ========================================
 * Day 04: 숙제 - 인터랙티브 카드 만들기
 * ========================================
 *
 * 🎯 과제:
 * 다양한 이벤트에 반응하는 인터랙티브 카드를 만드세요.
 *
 * 📋 요구사항:
 *
 * 1. InteractiveCard 컴포넌트
 *    - 마우스를 올리면 배경색이 변경됨 (console.log로 "hover" 출력)
 *    - 마우스가 나가면 원래대로 (console.log로 "leave" 출력)
 *    - 클릭하면 "카드가 선택되었습니다" alert
 *    - 더블클릭하면 "상세 정보 보기" alert
 *
 * 2. SearchBox 컴포넌트
 *    - 입력할 때마다 입력값을 console.log로 출력
 *    - Enter 키를 누르면 "검색: {입력값}" alert
 *    - Escape 키를 누르면 console.log로 "검색 취소" 출력
 *
 * 3. LikeButton 컴포넌트
 *    - 클릭할 때마다 console.log로 "좋아요 +1" 출력
 *    - 클릭 횟수를 세어서 함께 출력
 *
 * 4. ContactForm 컴포넌트
 *    - 이름, 이메일, 메시지 입력 필드
 *    - 각 필드 변경 시 console.log로 현재 값 출력
 *    - 폼 제출 시:
 *      - 기본 동작 방지
 *      - 모든 입력값을 alert으로 표시
 *
 * 💡 힌트:
 * - 아직 상태(state)를 배우지 않았으므로, 화면에 값을 표시하지 않아도 됩니다
 * - console.log와 alert으로 동작을 확인하세요
 * - 이벤트 객체(e)에서 필요한 정보를 추출하세요
 */

// 여기에 컴포넌트들을 만드세요

function Homework() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 04: 숙제</h1>

      {/* 여기에 컴포넌트들을 배치하세요 */}
    </div>
  );
}

export default Homework;
