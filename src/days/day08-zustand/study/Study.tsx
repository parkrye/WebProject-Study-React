import { useState } from "react";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

// ========================================
// CodeDemo 컴포넌트 (데모 + 코드 병기)
// ========================================

interface CodeDemoProps {
  title: string;
  code: string;
  children: React.ReactNode;
}

function CodeDemo({ title, code, children }: CodeDemoProps) {
  const [showCode, setShowCode] = useState(true);

  return (
    <div style={{
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      marginBottom: "20px",
      overflow: "hidden"
    }}>
      <div style={{
        backgroundColor: "#f5f5f5",
        padding: "10px 15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <strong>{title}</strong>
        <button
          onClick={() => setShowCode(!showCode)}
          style={{
            padding: "5px 10px",
            backgroundColor: showCode ? "#2196f3" : "#9e9e9e",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px"
          }}
        >
          {showCode ? "코드 숨기기" : "코드 보기"}
        </button>
      </div>
      <div style={{
        padding: "20px",
        backgroundColor: "#e8f5e9"
      }}>
        <div style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>실행 결과</div>
        {children}
      </div>
      {showCode && (
        <div style={{
          padding: "15px",
          backgroundColor: "#263238"
        }}>
          <div style={{ fontSize: "12px", color: "#78909c", marginBottom: "10px" }}>소스 코드</div>
          <pre style={{
            backgroundColor: "#1e1e1e",
            color: "#d4d4d4",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
            margin: 0,
            fontSize: "13px",
            lineHeight: "1.5"
          }}>
            {code}
          </pre>
        </div>
      )}
    </div>
  );
}

// ============================================
// Zustand Store 예제들
// ============================================

// 1. 기본 스토어
interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// 2. 복잡한 상태를 가진 스토어
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, completed: false }],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

// 3. get을 사용하는 스토어
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  getTotal: () => number;
  getTotalItems: () => number;
}

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  getTotal: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
  getTotalItems: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));

// 4. Persist 미들웨어를 사용하는 스토어
interface UserPreferences {
  theme: "light" | "dark";
  language: string;
  setTheme: (theme: "light" | "dark") => void;
  setLanguage: (language: string) => void;
}

const usePreferencesStore = create<UserPreferences>()(
  persist(
    (set) => ({
      theme: "light",
      language: "ko",
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "user-preferences-demo",
    }
  )
);

// 5. 비동기 액션이 있는 스토어
interface User {
  id: number;
  name: string;
  email: string;
}

interface AsyncStore {
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
}

const useAsyncStore = create<AsyncStore>()(
  devtools(
    (set) => ({
      users: [],
      isLoading: false,
      error: null,
      fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
          // 시뮬레이션된 API 호출
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const mockUsers: User[] = [
            { id: 1, name: "김철수", email: "kim@example.com" },
            { id: 2, name: "이영희", email: "lee@example.com" },
            { id: 3, name: "박민수", email: "park@example.com" },
          ];
          set({ users: mockUsers, isLoading: false });
        } catch {
          set({ error: "사용자 데이터를 불러오는데 실패했습니다.", isLoading: false });
        }
      },
    }),
    { name: "async-store" }
  )
);

// ============================================
// 스타일 정의
// ============================================
const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    borderBottom: "3px solid #1976d2",
    paddingBottom: "10px",
    color: "#1976d2",
  },
  definitionBox: {
    backgroundColor: "#e3f2fd",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    borderLeft: "4px solid #1976d2",
  },
  warningBox: {
    backgroundColor: "#ffebee",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    borderLeft: "4px solid #f44336",
  },
  exampleBox: {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #ddd",
  },
  codeBlock: {
    backgroundColor: "#263238",
    color: "#aed581",
    padding: "15px",
    borderRadius: "6px",
    overflow: "auto" as const,
    fontSize: "14px",
    fontFamily: "Consolas, Monaco, 'Courier New', monospace",
  },
  demoBox: {
    backgroundColor: "#fff3e0",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "2px solid #ff9800",
  },
  button: {
    padding: "8px 16px",
    margin: "4px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  primaryButton: {
    backgroundColor: "#1976d2",
    color: "white",
  },
  dangerButton: {
    backgroundColor: "#f44336",
    color: "white",
  },
  successButton: {
    backgroundColor: "#4caf50",
    color: "white",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "20px",
  },
  th: {
    backgroundColor: "#1976d2",
    color: "white",
    padding: "12px",
    textAlign: "left" as const,
    border: "1px solid #ddd",
  },
  td: {
    padding: "12px",
    border: "1px solid #ddd",
  },
  section: {
    marginBottom: "40px",
  },
  comparisonContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  wrongExample: {
    backgroundColor: "#ffebee",
    padding: "15px",
    borderRadius: "8px",
    border: "2px solid #f44336",
  },
  correctExample: {
    backgroundColor: "#e8f5e9",
    padding: "15px",
    borderRadius: "8px",
    border: "2px solid #4caf50",
  },
};

// ============================================
// 데모 컴포넌트들
// ============================================

// 카운터 데모
function CounterDemo() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div style={{ textAlign: "center" }}>
      <h4>카운터 데모</h4>
      <p style={{ fontSize: "32px", fontWeight: "bold" }}>{count}</p>
      <div>
        <button
          style={{ ...styles.button, ...styles.dangerButton }}
          onClick={decrement}
        >
          -1
        </button>
        <button
          style={{ ...styles.button, ...styles.primaryButton }}
          onClick={reset}
        >
          리셋
        </button>
        <button
          style={{ ...styles.button, ...styles.successButton }}
          onClick={increment}
        >
          +1
        </button>
      </div>
    </div>
  );
}

// Todo 데모
function TodoDemo() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input);
      setInput("");
    }
  };

  return (
    <div>
      <h4>Todo 리스트 데모</h4>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="할 일 입력..."
          style={{ padding: "8px", marginRight: "8px", width: "200px" }}
        />
        <button
          style={{ ...styles.button, ...styles.primaryButton }}
          onClick={handleAdd}
        >
          추가
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              padding: "8px",
              marginBottom: "4px",
              backgroundColor: todo.completed ? "#e8f5e9" : "#fff",
              border: "1px solid #ddd",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#888" : "#333",
              }}
            >
              {todo.text}
            </span>
            <button
              style={{ ...styles.button, ...styles.dangerButton, padding: "4px 8px" }}
              onClick={() => removeTodo(todo.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && (
        <p style={{ color: "#888", textAlign: "center" }}>할 일이 없습니다.</p>
      )}
    </div>
  );
}

// 장바구니 데모
function CartDemo() {
  const { items, addItem, removeItem, getTotal, getTotalItems } = useCartStore();

  const products = [
    { id: 1, name: "React 입문서", price: 25000 },
    { id: 2, name: "TypeScript 가이드", price: 30000 },
    { id: 3, name: "Zustand 마스터", price: 22000 },
  ];

  return (
    <div>
      <h4>장바구니 데모 (get 함수 활용)</h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div>
          <h5>상품 목록</h5>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                padding: "10px",
                marginBottom: "8px",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                {product.name} - {product.price.toLocaleString()}원
              </span>
              <button
                style={{ ...styles.button, ...styles.successButton, padding: "4px 8px" }}
                onClick={() => addItem(product)}
              >
                담기
              </button>
            </div>
          ))}
        </div>
        <div>
          <h5>장바구니 ({getTotalItems()}개)</h5>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "10px",
                marginBottom: "8px",
                backgroundColor: "#e3f2fd",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                {item.name} x {item.quantity}
              </span>
              <button
                style={{ ...styles.button, ...styles.dangerButton, padding: "4px 8px" }}
                onClick={() => removeItem(item.id)}
              >
                삭제
              </button>
            </div>
          ))}
          {items.length === 0 && <p style={{ color: "#888" }}>장바구니가 비었습니다.</p>}
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            총액: {getTotal().toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  );
}

// Persist 데모
function PreferencesDemo() {
  const { theme, language, setTheme, setLanguage } = usePreferencesStore();

  return (
    <div>
      <h4>설정 저장 데모 (Persist 미들웨어)</h4>
      <p style={{ color: "#666", marginBottom: "15px" }}>
        새로고침해도 설정이 유지됩니다! (localStorage에 저장)
      </p>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div>
          <label>테마: </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as "light" | "dark")}
            style={{ padding: "8px", borderRadius: "4px" }}
          >
            <option value="light">라이트</option>
            <option value="dark">다크</option>
          </select>
        </div>
        <div>
          <label>언어: </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px" }}
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </div>
      <div
        style={{
          marginTop: "15px",
          padding: "15px",
          backgroundColor: theme === "dark" ? "#333" : "#fff",
          color: theme === "dark" ? "#fff" : "#333",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        현재 설정: {theme === "dark" ? "다크 모드" : "라이트 모드"} /{" "}
        {language === "ko" ? "한국어" : language === "en" ? "English" : "日本語"}
      </div>
    </div>
  );
}

// 비동기 데모
function AsyncDemo() {
  const { users, isLoading, error, fetchUsers } = useAsyncStore();

  return (
    <div>
      <h4>비동기 상태 관리 데모</h4>
      <button
        style={{ ...styles.button, ...styles.primaryButton }}
        onClick={fetchUsers}
        disabled={isLoading}
      >
        {isLoading ? "로딩 중..." : "사용자 불러오기"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {users.length > 0 && (
        <ul style={{ marginTop: "10px" }}>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ============================================
// 메인 컴포넌트
// ============================================
export default function Study() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Day 8: Zustand 상태관리</h1>

      {/* 섹션 1: Zustand란? */}
      <section style={styles.section}>
        <h2>1. Zustand란?</h2>

        <div style={styles.definitionBox}>
          <h3>정의</h3>
          <p>
            <strong>Zustand</strong>는 React를 위한 작고 빠르며 확장 가능한 상태 관리 라이브러리입니다.
            독일어로 "상태(state)"를 의미하며, Redux보다 훨씬 간단한 API로 전역 상태를 관리할 수 있습니다.
          </p>
          <ul>
            <li><strong>번들 크기:</strong> 약 1.1KB (gzipped) - 매우 가벼움</li>
            <li><strong>보일러플레이트:</strong> 최소한의 코드로 스토어 생성</li>
            <li><strong>TypeScript:</strong> 완벽한 타입 지원</li>
            <li><strong>미들웨어:</strong> persist, devtools 등 풍부한 미들웨어</li>
          </ul>
        </div>

        <div style={styles.exampleBox}>
          <h3>왜 Zustand가 필요한가?</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>문제</th>
                <th style={styles.th}>기존 해결책</th>
                <th style={styles.th}>Zustand 해결책</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Prop Drilling</td>
                <td style={styles.td}>Context API (리렌더링 이슈)</td>
                <td style={styles.td}>선택적 구독으로 최적화</td>
              </tr>
              <tr>
                <td style={styles.td}>복잡한 설정</td>
                <td style={styles.td}>Redux (액션, 리듀서, 디스패치)</td>
                <td style={styles.td}>create() 하나로 끝</td>
              </tr>
              <tr>
                <td style={styles.td}>Provider 필요</td>
                <td style={styles.td}>Context, Redux 모두 필요</td>
                <td style={styles.td}>Provider 없이 어디서든 사용</td>
              </tr>
              <tr>
                <td style={styles.td}>비동기 처리</td>
                <td style={styles.td}>Redux-Thunk, Redux-Saga</td>
                <td style={styles.td}>내장된 비동기 지원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 섹션 2: 기본 사용법 */}
      <section style={styles.section}>
        <h2>2. 기본 사용법</h2>

        <div style={styles.exampleBox}>
          <h3>스토어 생성하기</h3>
          <pre style={styles.codeBlock}>
{`import { create } from 'zustand';

// 1. 타입 정의
interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// 2. 스토어 생성
const useCounterStore = create<CounterStore>((set) => ({
  // 초기 상태
  count: 0,

  // 액션들
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// 3. 컴포넌트에서 사용
function Counter() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`}
          </pre>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모</h3>
          <CounterDemo />
        </div>
      </section>

      {/* 섹션 3: set 함수 깊게 이해하기 */}
      <section style={styles.section}>
        <h2>3. set 함수 깊게 이해하기</h2>

        <div style={styles.definitionBox}>
          <h3>set 함수의 동작 원리</h3>
          <p>
            <code>set</code> 함수는 상태를 업데이트하는 핵심 함수입니다.
            React의 <code>setState</code>와 유사하지만, <strong>자동으로 얕은 병합(shallow merge)</strong>을 수행합니다.
          </p>
        </div>

        <div style={styles.exampleBox}>
          <h3>set 함수 사용 패턴</h3>
          <pre style={styles.codeBlock}>
{`// 패턴 1: 객체 직접 전달 (간단한 업데이트)
set({ count: 0 })

// 패턴 2: 함수 전달 (이전 상태 기반 업데이트)
set((state) => ({ count: state.count + 1 }))

// 패턴 3: 복잡한 중첩 상태
set((state) => ({
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      name: 'New Name'
    }
  }
}))

// 패턴 4: replace 옵션 (전체 상태 교체)
set({ count: 0 }, true)  // 두 번째 인자 true = 전체 교체`}
          </pre>
        </div>

        <div style={{ ...styles.comparisonContainer, marginTop: "20px" }}>
          <div style={styles.wrongExample}>
            <h4 style={{ color: "#f44336" }}>잘못된 예시</h4>
            <pre style={{ ...styles.codeBlock, backgroundColor: "#5d1a1a" }}>
{`// 직접 상태 변경 (작동 안 함!)
increment: () => {
  state.count++; // 리렌더링 안됨
}

// set 안에서 리턴 없이
set((state) => {
  state.count + 1;  // 리턴 필요!
})`}
            </pre>
          </div>
          <div style={styles.correctExample}>
            <h4 style={{ color: "#4caf50" }}>올바른 예시</h4>
            <pre style={{ ...styles.codeBlock, backgroundColor: "#1a3d1a" }}>
{`// set 함수로 새 객체 반환
increment: () => set((state) => ({
  count: state.count + 1
}))

// 또는 간단하게
increment: () => set((state) => ({
  count: state.count + 1
}))`}
            </pre>
          </div>
        </div>
      </section>

      {/* 섹션 4: get 함수 활용 */}
      <section style={styles.section}>
        <h2>4. get 함수 활용</h2>

        <div style={styles.definitionBox}>
          <h3>get 함수란?</h3>
          <p>
            <code>get</code> 함수는 스토어의 현재 상태를 읽어오는 함수입니다.
            주로 <strong>계산된 값</strong>이나 <strong>파생 상태</strong>를 만들 때 사용합니다.
          </p>
        </div>

        <div style={styles.exampleBox}>
          <h3>get 함수 사용 예시</h3>
          <pre style={styles.codeBlock}>
{`const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),

  // get을 사용한 계산된 값
  getTotal: () => {
    const { items } = get();  // 현재 상태 읽기
    return items.reduce((sum, item) =>
      sum + item.price * item.quantity, 0
    );
  },

  getTotalItems: () => {
    const { items } = get();
    return items.reduce((sum, item) =>
      sum + item.quantity, 0
    );
  },

  // 조건부 업데이트
  addItemIfNotExists: (item) => {
    const { items } = get();
    if (!items.find(i => i.id === item.id)) {
      set({ items: [...items, item] });
    }
  }
}))`}
          </pre>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모</h3>
          <CartDemo />
        </div>
      </section>

      {/* 섹션 5: Todo 리스트 예제 */}
      <section style={styles.section}>
        <h2>5. 실전 예제: Todo 리스트</h2>

        <div style={styles.exampleBox}>
          <h3>Todo Store 구현</h3>
          <pre style={styles.codeBlock}>
{`interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: (text) => set((state) => ({
    todos: [...state.todos, {
      id: Date.now(),
      text,
      completed: false
    }]
  })),

  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  })),

  removeTodo: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id)
  }))
}))`}
          </pre>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모</h3>
          <TodoDemo />
        </div>
      </section>

      {/* 섹션 6: 미들웨어 */}
      <section style={styles.section}>
        <h2>6. 미들웨어 (Middleware)</h2>

        <div style={styles.definitionBox}>
          <h3>미들웨어란?</h3>
          <p>
            미들웨어는 스토어의 기능을 확장하는 방법입니다.
            Zustand는 여러 유용한 내장 미들웨어를 제공합니다.
          </p>
        </div>

        <div style={styles.exampleBox}>
          <h3>주요 미들웨어</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>미들웨어</th>
                <th style={styles.th}>용도</th>
                <th style={styles.th}>사용 예</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}><code>persist</code></td>
                <td style={styles.td}>상태를 localStorage에 저장</td>
                <td style={styles.td}>로그인 상태, 설정 유지</td>
              </tr>
              <tr>
                <td style={styles.td}><code>devtools</code></td>
                <td style={styles.td}>Redux DevTools 연동</td>
                <td style={styles.td}>디버깅, 상태 추적</td>
              </tr>
              <tr>
                <td style={styles.td}><code>immer</code></td>
                <td style={styles.td}>불변성 자동 처리</td>
                <td style={styles.td}>복잡한 중첩 상태</td>
              </tr>
              <tr>
                <td style={styles.td}><code>subscribeWithSelector</code></td>
                <td style={styles.td}>선택적 구독</td>
                <td style={styles.td}>특정 상태 변화 감지</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={styles.exampleBox}>
          <h3>persist 미들웨어 사용법</h3>
          <pre style={styles.codeBlock}>
{`import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: string) => void;
}

const usePreferencesStore = create<UserPreferences>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'ko',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'user-preferences', // localStorage key
      // 선택적: 특정 상태만 저장
      partialize: (state) => ({
        theme: state.theme,
        language: state.language
      }),
    }
  )
);`}
          </pre>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모</h3>
          <PreferencesDemo />
        </div>
      </section>

      {/* 섹션 7: 비동기 상태 관리 */}
      <section style={styles.section}>
        <h2>7. 비동기 상태 관리</h2>

        <div style={styles.definitionBox}>
          <h3>비동기 액션</h3>
          <p>
            Zustand에서는 별도의 미들웨어 없이 <strong>async/await</strong>를 사용하여
            비동기 액션을 직접 정의할 수 있습니다.
          </p>
        </div>

        <div style={styles.exampleBox}>
          <h3>비동기 스토어 패턴</h3>
          <pre style={styles.codeBlock}>
{`interface AsyncStore {
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
}

const useAsyncStore = create<AsyncStore>()(
  devtools(
    (set) => ({
      users: [],
      isLoading: false,
      error: null,

      fetchUsers: async () => {
        // 1. 로딩 시작
        set({ isLoading: true, error: null });

        try {
          // 2. API 호출
          const response = await fetch('/api/users');
          const users = await response.json();

          // 3. 성공 시 데이터 저장
          set({ users, isLoading: false });
        } catch (error) {
          // 4. 에러 처리
          set({
            error: '데이터를 불러오는데 실패했습니다.',
            isLoading: false
          });
        }
      },
    }),
    { name: 'async-store' }
  )
);`}
          </pre>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모</h3>
          <AsyncDemo />
        </div>
      </section>

      {/* 섹션 8: 선택적 구독 */}
      <section style={styles.section}>
        <h2>8. 선택적 구독 (Selective Subscription)</h2>

        <div style={styles.warningBox}>
          <h3>주의: 불필요한 리렌더링</h3>
          <p>
            스토어의 모든 상태를 구독하면, 어떤 상태가 변경되어도 컴포넌트가 리렌더링됩니다.
            <strong>필요한 상태만 선택적으로 구독</strong>하여 성능을 최적화하세요.
          </p>
        </div>

        <div style={{ ...styles.comparisonContainer, marginTop: "20px" }}>
          <div style={styles.wrongExample}>
            <h4 style={{ color: "#f44336" }}>비효율적인 방식</h4>
            <pre style={{ ...styles.codeBlock, backgroundColor: "#5d1a1a" }}>
{`// 전체 스토어 구독
// count가 변경되면 DisplayName도
// 리렌더링됨!
function DisplayName() {
  const store = useUserStore();
  return <p>{store.name}</p>;
}

function DisplayCount() {
  const store = useUserStore();
  return <p>{store.count}</p>;
}`}
            </pre>
          </div>
          <div style={styles.correctExample}>
            <h4 style={{ color: "#4caf50" }}>효율적인 방식</h4>
            <pre style={{ ...styles.codeBlock, backgroundColor: "#1a3d1a" }}>
{`// 필요한 상태만 선택적 구독
// count가 변경되어도 DisplayName은
// 리렌더링되지 않음!
function DisplayName() {
  const name = useUserStore(
    (state) => state.name
  );
  return <p>{name}</p>;
}

function DisplayCount() {
  const count = useUserStore(
    (state) => state.count
  );
  return <p>{count}</p>;
}`}
            </pre>
          </div>
        </div>

        <div style={styles.exampleBox}>
          <h3>여러 상태 선택하기</h3>
          <pre style={styles.codeBlock}>
{`// 방법 1: 객체 반환 + shallow 비교
import { useShallow } from 'zustand/react/shallow';

function UserInfo() {
  const { name, email } = useUserStore(
    useShallow((state) => ({
      name: state.name,
      email: state.email,
    }))
  );
  return <p>{name} ({email})</p>;
}

// 방법 2: 배열로 선택
function UserInfo() {
  const [name, email] = useUserStore(
    useShallow((state) => [state.name, state.email])
  );
  return <p>{name} ({email})</p>;
}`}
          </pre>
        </div>
      </section>

      {/* 섹션 9: 스토어 설계 패턴 */}
      <section style={styles.section}>
        <h2>9. 스토어 설계 패턴</h2>

        <div style={styles.exampleBox}>
          <h3>패턴 1: 도메인별 스토어 분리</h3>
          <pre style={styles.codeBlock}>
{`// stores/userStore.ts
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: async (credentials) => { ... },
  logout: () => set({ user: null }),
}));

// stores/cartStore.ts
export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) => { ... },
  removeItem: (id) => { ... },
}));

// stores/uiStore.ts
export const useUIStore = create<UIStore>((set) => ({
  isMenuOpen: false,
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
}));`}
          </pre>
        </div>

        <div style={styles.exampleBox}>
          <h3>패턴 2: 슬라이스 패턴 (큰 스토어 분할)</h3>
          <pre style={styles.codeBlock}>
{`// 슬라이스 정의
const createUserSlice = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
});

const createCartSlice = (set) => ({
  items: [],
  addItem: (item) => set((s) => ({
    items: [...s.items, item]
  })),
});

// 슬라이스 합치기
const useBoundStore = create((...args) => ({
  ...createUserSlice(...args),
  ...createCartSlice(...args),
}));`}
          </pre>
        </div>

        <div style={styles.exampleBox}>
          <h3>패턴 3: 스토어 간 통신</h3>
          <pre style={styles.codeBlock}>
{`// 다른 스토어 상태 읽기
const useOrderStore = create((set) => ({
  createOrder: () => {
    // 다른 스토어의 현재 상태 읽기
    const user = useUserStore.getState().user;
    const items = useCartStore.getState().items;

    if (!user) {
      throw new Error('로그인이 필요합니다');
    }

    // 주문 생성 로직...

    // 주문 후 장바구니 비우기
    useCartStore.getState().clearCart();
  },
}))`}
          </pre>
        </div>
      </section>

      {/* 핵심 정리 */}
      <section style={styles.section}>
        <h2>핵심 정리</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>개념</th>
              <th style={styles.th}>설명</th>
              <th style={styles.th}>사용 시점</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}><code>create()</code></td>
              <td style={styles.td}>스토어 생성 함수</td>
              <td style={styles.td}>전역 상태가 필요할 때</td>
            </tr>
            <tr>
              <td style={styles.td}><code>set()</code></td>
              <td style={styles.td}>상태 업데이트 함수 (자동 병합)</td>
              <td style={styles.td}>상태를 변경할 때</td>
            </tr>
            <tr>
              <td style={styles.td}><code>get()</code></td>
              <td style={styles.td}>현재 상태 읽기 함수</td>
              <td style={styles.td}>계산된 값, 조건부 업데이트</td>
            </tr>
            <tr>
              <td style={styles.td}><code>persist</code></td>
              <td style={styles.td}>localStorage 저장 미들웨어</td>
              <td style={styles.td}>새로고침 후에도 상태 유지</td>
            </tr>
            <tr>
              <td style={styles.td}><code>devtools</code></td>
              <td style={styles.td}>Redux DevTools 연동</td>
              <td style={styles.td}>디버깅 시</td>
            </tr>
            <tr>
              <td style={styles.td}>선택적 구독</td>
              <td style={styles.td}><code>useStore(s =&gt; s.value)</code></td>
              <td style={styles.td}>성능 최적화 (항상 권장)</td>
            </tr>
            <tr>
              <td style={styles.td}>비동기 액션</td>
              <td style={styles.td}>async 함수로 직접 정의</td>
              <td style={styles.td}>API 호출, 데이터 페칭</td>
            </tr>
            <tr>
              <td style={styles.td}>스토어 분리</td>
              <td style={styles.td}>도메인별 별도 스토어</td>
              <td style={styles.td}>대규모 애플리케이션</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 다음 단계 */}
      <section style={styles.section}>
        <div style={{ ...styles.definitionBox, backgroundColor: "#e8f5e9" }}>
          <h3>다음 단계: Day 9 - API 연동</h3>
          <p>
            Day 8에서 배운 Zustand 상태관리를 바탕으로,
            Day 9에서는 실제 API와 연동하여 데이터를 가져오고 관리하는 방법을 학습합니다.
          </p>
          <ul>
            <li>fetch API 사용법</li>
            <li>서비스 레이어 패턴</li>
            <li>에러 핸들링</li>
            <li>Optimistic Update</li>
            <li>무한 스크롤</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
