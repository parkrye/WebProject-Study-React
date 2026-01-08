/**
 * ========================================
 * Day 06: 실습 - useState 기초
 * ========================================
 *
 * 🎯 실습 목표:
 * useState를 사용하여 다양한 상태를 관리해보세요.
 */

import { useState } from "react";

function Practice() {
  // TODO 1: 카운터 만들기
  // - count 상태를 선언하세요 (초기값: 0)
  // - +1, -1, +5, -5, 초기화 버튼 구현

  // TODO 2: 텍스트 입력 및 표시
  // - text 상태를 선언하세요 (초기값: '')
  // - 입력창에 타이핑하면 아래에 실시간으로 표시
  // - 글자 수도 함께 표시

  // TODO 3: 토글 버튼 만들기
  // - isVisible 상태를 선언하세요 (초기값: true)
  // - 버튼 클릭 시 아래 내용이 보이거나 숨겨짐
  // - 버튼 텍스트도 "숨기기" / "보이기"로 변경

  // TODO 4: 탭 메뉴 만들기
  // - activeTab 상태를 선언하세요 (초기값: 'tab1')
  // - 세 개의 탭 버튼: Tab 1, Tab 2, Tab 3
  // - 선택된 탭에 따라 다른 내용 표시
  // - 선택된 탭 버튼은 스타일 다르게

  // TODO 5: 좋아요 버튼
  // - likes 상태를 선언하세요 (초기값: 0)
  // - isLiked 상태를 선언하세요 (초기값: false)
  // - 버튼 클릭 시: isLiked 토글, likes 증가/감소
  // - 좋아요 상태에 따라 버튼 색상 변경

  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 06: 실습</h1>

      {/* TODO 1 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>1. 카운터</h2>
        {/* 여기에 코드를 작성하세요 */}
      </section>

      {/* TODO 2 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>2. 텍스트 입력</h2>
        {/* 여기에 코드를 작성하세요 */}
      </section>

      {/* TODO 3 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>3. 토글</h2>
        {/* 여기에 코드를 작성하세요 */}
      </section>

      {/* TODO 4 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>4. 탭 메뉴</h2>
        {/* 여기에 코드를 작성하세요 */}
      </section>

      {/* TODO 5 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>5. 좋아요 버튼</h2>
        {/* 여기에 코드를 작성하세요 */}
      </section>
    </div>
  );
}

export default Practice;
