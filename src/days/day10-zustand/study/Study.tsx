/**
 * ========================================
 * Day 10: Zustand
 * ========================================
 *
 * 📚 학습 목표:
 * 1. 전역 상태 관리의 필요성을 이해한다
 * 2. Zustand의 기본 사용법을 익힌다
 * 3. Store를 만들고 여러 컴포넌트에서 사용할 수 있다
 */

import { create } from "zustand";

// ----------------------------------------
// 1. 왜 전역 상태 관리가 필요한가?
// ----------------------------------------
/**
 * 문제: Prop Drilling
 *
 * App
 *  └── Header (user 필요)
 *  └── Main
 *       └── Sidebar (user 필요)
 *       └── Content
 *            └── Profile (user 필요)
 *
 * user 데이터를 모든 중간 컴포넌트를 통해 전달해야 함
 * → 코드가 복잡해지고 유지보수가 어려움
 *
 * 해결: 전역 상태 관리
 * - 어디서든 직접 상태에 접근 가능
 * - props로 전달할 필요 없음
 */

// ----------------------------------------
// 2. Zustand 기본 사용법
// ----------------------------------------
/**
 * 1. Store 정의
 * 2. 컴포넌트에서 사용
 *
 * 장점:
 * - 간단한 API
 * - 적은 보일러플레이트
 * - TypeScript 지원 우수
 * - 작은 번들 사이즈
 */

// ----------------------------------------
// 3. 카운터 Store 만들기
// ----------------------------------------

// Store 타입 정의
interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementBy: (amount: number) => void;
}

// Store 생성
const useCounterStore = create<CounterStore>((set) => ({
  // 상태
  count: 0,

  // 액션 (상태 변경 함수)
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementBy: (amount) => set((state) => ({ count: state.count + amount })),
}));

// 컴포넌트에서 사용
function CounterDisplay() {
  // 필요한 상태만 선택
  const count = useCounterStore((state) => state.count);

  return (
    <div>
      <h4>카운터 값: {count}</h4>
    </div>
  );
}

function CounterControls() {
  // 필요한 액션만 선택
  const { increment, decrement, reset, incrementBy } = useCounterStore();

  return (
    <div>
      <button onClick={decrement}>-1</button>
      <button onClick={increment}>+1</button>
      <button onClick={() => incrementBy(5)}>+5</button>
      <button onClick={reset}>초기화</button>
    </div>
  );
}

function CounterExample() {
  return (
    <div>
      <h3>카운터 예제</h3>
      <CounterDisplay />
      <CounterControls />
      <p style={{ fontSize: "12px", color: "gray" }}>
        두 컴포넌트가 같은 store를 공유
      </p>
    </div>
  );
}

// ----------------------------------------
// 4. Todo Store 만들기
// ----------------------------------------

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [
    { id: 1, text: "Zustand 배우기", completed: false },
    { id: 2, text: "Store 만들기", completed: false },
  ],

  addTodo: (text) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: Date.now(), text, completed: false },
      ],
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
}));

// Todo 관련 컴포넌트들
function TodoInput() {
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("todoInput") as HTMLInputElement;
    if (input.value.trim()) {
      addTodo(input.value);
      input.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="todoInput" placeholder="할 일 입력..." />
      <button type="submit">추가</button>
    </form>
  );
}

function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodoStore();

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            padding: "8px",
            marginBottom: "5px",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span
            style={{
              marginLeft: "10px",
              flex: 1,
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>삭제</button>
        </li>
      ))}
    </ul>
  );
}

function TodoStats() {
  const todos = useTodoStore((state) => state.todos);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;

  return (
    <div style={{ marginTop: "10px" }}>
      <p>
        완료: {completed} / {total}
      </p>
      <button onClick={clearCompleted}>완료된 항목 삭제</button>
    </div>
  );
}

function TodoExample() {
  return (
    <div>
      <h3>Todo 예제</h3>
      <TodoInput />
      <TodoList />
      <TodoStats />
    </div>
  );
}

// ----------------------------------------
// 5. 사용자 인증 Store
// ----------------------------------------

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,

  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));

function AuthStatus() {
  const { user, isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <p>로그인되지 않음</p>;
  }

  return (
    <div>
      <p>환영합니다, {user?.name}님!</p>
      <p>이메일: {user?.email}</p>
    </div>
  );
}

function AuthControls() {
  const { isLoggedIn, login, logout } = useAuthStore();

  const handleLogin = () => {
    login({
      id: 1,
      name: "홍길동",
      email: "hong@example.com",
    });
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={logout}>로그아웃</button>
      ) : (
        <button onClick={handleLogin}>로그인 (시뮬레이션)</button>
      )}
    </div>
  );
}

function AuthExample() {
  return (
    <div>
      <h3>인증 예제</h3>
      <AuthStatus />
      <AuthControls />
    </div>
  );
}

// ----------------------------------------
// 6. 주의사항
// ----------------------------------------
/**
 * 1. Store 분리
 *    - 관련된 상태끼리 묶어서 별도 store로
 *    - 너무 큰 store는 피하기
 *
 * 2. 선택적 구독
 *    - 필요한 상태만 선택: (state) => state.count
 *    - 불필요한 리렌더링 방지
 *
 * 3. 액션은 store 내부에
 *    - 상태 변경 로직을 store에 캡슐화
 *    - 컴포넌트는 단순히 액션만 호출
 */

// ----------------------------------------
// 메인 컴포넌트
// ----------------------------------------

function Study() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Day 10: Zustand</h1>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <CounterExample />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <TodoExample />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <AuthExample />
      </section>

      <section style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h3>Zustand 요약</h3>
        <ul>
          <li><strong>create</strong>: Store 생성</li>
          <li><strong>set</strong>: 상태 업데이트</li>
          <li><strong>useStore(selector)</strong>: 필요한 상태만 선택</li>
          <li><strong>useStore()</strong>: 전체 store 사용</li>
        </ul>
      </section>
    </div>
  );
}

export default Study;
