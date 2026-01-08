/**
 * ========================================
 * Day 08: 실습 - useEffect
 * ========================================
 *
 * 🎯 실습 목표:
 * useEffect를 다양한 상황에서 사용해봅니다.
 */

import { useState, useEffect } from "react";

function Practice() {
  // TODO 1: 문서 제목 동기화
  // - input에 입력된 값을 브라우저 탭 제목에 반영
  // - 힌트: document.title = 값

  // TODO 2: 자동 저장 기능
  // - textarea의 내용을 localStorage에 자동 저장
  // - 페이지 새로고침 후에도 내용 유지
  // - 힌트: localStorage.setItem('key', value), localStorage.getItem('key')

  // TODO 3: 디바운스 검색
  // - 입력 후 500ms 동안 추가 입력이 없으면 검색 실행
  // - 검색 실행 시 console.log로 검색어 출력
  // - 힌트: setTimeout과 cleanup

  // TODO 4: 온라인/오프라인 상태 감지
  // - navigator.onLine과 이벤트 리스너로 상태 감지
  // - 힌트: window.addEventListener('online', ...), ('offline', ...)

  // TODO 5: 키보드 단축키
  // - Ctrl+S (또는 Cmd+S) 누르면 "저장!" alert
  // - 기본 동작(브라우저 저장) 방지
  // - 힌트: document.addEventListener('keydown', ...)

  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 08: 실습</h1>

      {/* TODO 1 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>1. 문서 제목 동기화</h2>
        {/* 여기에 코드를 작성하세요 */}
      </section>

      {/* TODO 2 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>2. 자동 저장</h2>
        {/* 여기에 코드를 작성하세요 */}
      </section>

      {/* TODO 3 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>3. 디바운스 검색</h2>
        {/* 여기에 코드를 작성하세요 */}
      </section>

      {/* TODO 4 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>4. 온라인 상태</h2>
        {/* 여기에 코드를 작성하세요 */}
      </section>

      {/* TODO 5 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>5. 키보드 단축키</h2>
        <p>Ctrl+S (Mac: Cmd+S)를 눌러보세요</p>
        {/* useEffect로 이벤트 리스너 등록 */}
      </section>
    </div>
  );
}

export default Practice;
