/**
 * ========================================
 * Day 05: 숙제 - 대시보드 만들기
 * ========================================
 *
 * 🎯 과제:
 * 아래 데이터를 사용하여 간단한 대시보드를 만드세요.
 *
 * 📋 요구사항:
 *
 * 1. StatCard 컴포넌트
 *    - title, value, change(증감률), isPositive 표시
 *    - isPositive에 따라 초록/빨간색으로 표시
 *
 * 2. TaskList 컴포넌트
 *    - tasks 배열을 렌더링
 *    - priority에 따라 다른 색상 (high: 빨강, medium: 노랑, low: 초록)
 *    - completed 항목은 취소선 + 흐리게
 *
 * 3. TeamMembers 컴포넌트
 *    - members 배열을 렌더링
 *    - status에 따라 뱃지 색상 다르게 (online: 초록, away: 노랑, offline: 회색)
 *    - role이 'lead'인 멤버는 이름 옆에 별표(⭐) 표시
 *
 * 4. RecentActivities 컴포넌트
 *    - activities 배열을 렌더링
 *    - 배열이 비어있으면 "최근 활동이 없습니다" 표시
 *
 * 💡 힌트:
 * - 각 컴포넌트에 적절한 Props 타입을 정의하세요
 * - key prop을 잊지 마세요
 * - 조건부 스타일링을 활용하세요
 */

// 데이터
const stats = [
  { id: 1, title: "총 방문자", value: 12453, change: 12.5, isPositive: true },
  { id: 2, title: "신규 가입", value: 342, change: -3.2, isPositive: false },
  { id: 3, title: "매출", value: 8900000, change: 8.1, isPositive: true },
];

const tasks = [
  { id: 1, title: "보고서 작성", priority: "high", completed: false },
  { id: 2, title: "미팅 준비", priority: "medium", completed: true },
  { id: 3, title: "이메일 확인", priority: "low", completed: true },
  { id: 4, title: "코드 리뷰", priority: "high", completed: false },
  { id: 5, title: "문서 업데이트", priority: "medium", completed: false },
];

const members = [
  { id: 1, name: "김팀장", role: "lead", status: "online" },
  { id: 2, name: "이개발", role: "developer", status: "online" },
  { id: 3, name: "박디자인", role: "designer", status: "away" },
  { id: 4, name: "최기획", role: "planner", status: "offline" },
];

const activities = [
  { id: 1, user: "김팀장", action: "새 프로젝트 생성", time: "10분 전" },
  { id: 2, user: "이개발", action: "코드 커밋", time: "25분 전" },
  { id: 3, user: "박디자인", action: "디자인 업로드", time: "1시간 전" },
];

// 여기에 컴포넌트들을 만드세요

function Homework() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 05: 숙제 - 대시보드</h1>

      {/* 여기에 컴포넌트들을 배치하세요 */}
    </div>
  );
}

export default Homework;
