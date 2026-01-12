/**
 * ========================================
 * Day 07: 실습 - useState 심화
 * ========================================
 *
 * 🎯 실습 목표:
 * 객체와 배열 상태를 올바르게 업데이트하는 연습을 합니다.
 */

import { useState } from "react";

function Practice() {
  // TODO 1: 프로필 편집기
  // - profile 객체 상태: { name, bio, avatar }
  // - 각 필드를 수정할 수 있는 폼 구현

  // TODO 2: 쇼핑 카트
  // - cartItems 배열 상태
  // - 항목 추가, 수량 변경, 삭제 기능 구현
  // - 총 금액 계산 표시

  // TODO 3: 연락처 목록
  // - contacts 배열 상태: { id, name, phone, favorite }
  // - 새 연락처 추가
  // - 연락처 삭제
  // - 즐겨찾기 토글
  // - 즐겨찾기 연락처만 필터링해서 보기

  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 07: 실습</h1>

      {/* TODO 1 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>1. 프로필 편집기</h2>
        {/*
          구현할 것:
          - 이름, 자기소개, 아바타 URL 입력 필드
          - 입력한 내용이 실시간으로 프로필 카드에 반영
        */}
      </section>

      {/* TODO 2 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>2. 쇼핑 카트</h2>
        {/*
          구현할 것:
          - 상품 목록에서 "담기" 버튼으로 카트에 추가
          - 카트에서 수량 +/- 버튼
          - 카트에서 삭제 버튼
          - 총 금액 표시

          예시 상품 데이터:
          const products = [
            { id: 1, name: '사과', price: 1000 },
            { id: 2, name: '바나나', price: 1500 },
            { id: 3, name: '오렌지', price: 2000 },
          ];
        */}
      </section>

      {/* TODO 3 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>3. 연락처 목록</h2>
        {/*
          구현할 것:
          - 이름, 전화번호 입력 후 추가 버튼
          - 각 연락처에 삭제 버튼
          - 각 연락처에 즐겨찾기(별) 토글
          - "즐겨찾기만 보기" 체크박스
        */}
      </section>
    </div>
  );
}

export default Practice;
