/**
 * ========================================
 * Day 10: 숙제 - 미니 쇼핑몰
 * ========================================
 *
 * 🎯 과제:
 * Zustand를 사용하여 미니 쇼핑몰을 만드세요.
 * 지금까지 배운 모든 내용을 종합적으로 활용합니다!
 *
 * 📋 요구사항:
 *
 * 1. Store 구성
 *
 *    a) ProductStore
 *       - products: 상품 목록
 *       - searchTerm: 검색어
 *       - category: 선택된 카테고리
 *       - setSearchTerm, setCategory
 *
 *    b) CartStore
 *       - items: 장바구니 상품
 *       - addItem, removeItem, updateQuantity, clearCart
 *
 *    c) UserStore
 *       - user: 사용자 정보 (로그인 시뮬레이션)
 *       - login, logout
 *
 * 2. 컴포넌트 구성
 *
 *    a) Header
 *       - 로고
 *       - 로그인/로그아웃 버튼
 *       - 장바구니 아이콘 (아이템 수 표시)
 *
 *    b) ProductList
 *       - 검색 입력창
 *       - 카테고리 필터
 *       - 상품 카드 목록
 *       - useMemo로 필터링 최적화
 *
 *    c) ProductCard
 *       - 상품 정보 표시
 *       - "장바구니 담기" 버튼
 *       - memo로 최적화
 *
 *    d) Cart
 *       - 장바구니 상품 목록
 *       - 수량 조절
 *       - 삭제 버튼
 *       - 총 금액
 *       - "구매하기" 버튼 (로그인 필요)
 *
 * 3. 기능
 *    - 상품 검색 (이름, 설명)
 *    - 카테고리 필터
 *    - 장바구니 추가/제거/수량변경
 *    - 로그인 시에만 구매 가능
 *
 * 💡 힌트:
 * - 여러 store를 조합해서 사용
 * - useMemo, useCallback으로 최적화
 * - 조건부 렌더링 활용
 */

import { create } from "zustand";
import { useState, useMemo, useCallback, memo } from "react";

// 상품 데이터
const initialProducts = [
  { id: 1, name: "노트북", price: 1500000, category: "전자기기", description: "고성능 노트북" },
  { id: 2, name: "무선 마우스", price: 35000, category: "전자기기", description: "인체공학 마우스" },
  { id: 3, name: "기계식 키보드", price: 89000, category: "전자기기", description: "청축 키보드" },
  { id: 4, name: "모니터", price: 450000, category: "전자기기", description: "27인치 4K" },
  { id: 5, name: "책상", price: 180000, category: "가구", description: "높이조절 책상" },
  { id: 6, name: "의자", price: 250000, category: "가구", description: "인체공학 의자" },
  { id: 7, name: "책장", price: 120000, category: "가구", description: "5단 책장" },
  { id: 8, name: "프로그래밍 책", price: 35000, category: "도서", description: "React 완벽 가이드" },
  { id: 9, name: "알고리즘 책", price: 32000, category: "도서", description: "코딩 테스트 준비" },
  { id: 10, name: "USB 허브", price: 25000, category: "전자기기", description: "4포트 USB 3.0" },
];

// 여기에 Store들을 정의하세요

// 여기에 컴포넌트들을 구현하세요

function Homework() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 10: 숙제 - 미니 쇼핑몰</h1>

      {/* 여기에 쇼핑몰 UI를 구현하세요 */}
    </div>
  );
}

export default Homework;
