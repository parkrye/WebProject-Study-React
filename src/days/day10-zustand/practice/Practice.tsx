/**
 * ========================================
 * Day 10: 실습 - Zustand
 * ========================================
 *
 * 🎯 실습 목표:
 * Zustand를 사용하여 전역 상태를 관리합니다.
 */

import { create } from "zustand";

// TODO 1: 테마 Store 만들기
// - theme: 'light' | 'dark'
// - toggleTheme(): 테마 전환
// - setTheme(theme): 특정 테마로 설정
interface ThemeStore {
  // 여기에 타입을 정의하세요
}

// const useThemeStore = create<ThemeStore>((set) => ({
//   // 여기에 구현하세요
// }));

// TODO 2: 장바구니 Store 만들기
// - items: CartItem[]
// - addItem(product): 상품 추가 (이미 있으면 수량 증가)
// - removeItem(id): 상품 제거
// - updateQuantity(id, quantity): 수량 변경
// - clearCart(): 장바구니 비우기
// - 계산된 값: totalItems, totalPrice
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  // 여기에 타입을 정의하세요
}

// const useCartStore = create<CartStore>((set, get) => ({
//   // 여기에 구현하세요
//   // get()으로 현재 상태에 접근 가능
// }));

// TODO 3: 알림 Store 만들기
// - notifications: Notification[]
// - addNotification(message, type): 알림 추가
// - removeNotification(id): 알림 제거
// - clearAll(): 모든 알림 제거
interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

interface NotificationStore {
  // 여기에 타입을 정의하세요
}

// const useNotificationStore = create<NotificationStore>((set) => ({
//   // 여기에 구현하세요
// }));

function Practice() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 10: 실습</h1>

      {/* TODO 1: 테마 전환 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>1. 테마 전환</h2>
        {/*
          - 현재 테마 표시
          - 테마 토글 버튼
          - Light / Dark 버튼
          - 테마에 따라 배경색 변경
        */}
      </section>

      {/* TODO 2: 장바구니 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>2. 장바구니</h2>
        {/*
          상품 목록:
          - 노트북 1,500,000원
          - 마우스 35,000원
          - 키보드 89,000원

          각 상품에 "담기" 버튼

          장바구니:
          - 담긴 상품 목록
          - 수량 +/- 버튼
          - 삭제 버튼
          - 총 금액 표시
        */}
      </section>

      {/* TODO 3: 알림 시스템 */}
      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>3. 알림</h2>
        {/*
          버튼들:
          - 성공 알림 추가
          - 에러 알림 추가
          - 경고 알림 추가
          - 정보 알림 추가
          - 모두 삭제

          알림 목록:
          - 각 알림에 X 버튼
          - type에 따라 다른 배경색
        */}
      </section>
    </div>
  );
}

export default Practice;
