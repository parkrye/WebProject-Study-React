# Day 08: Zustand 상태관리

## 학습 목표
- Zustand의 개념과 특징 이해하기
- create 함수로 스토어 생성하기
- set과 get 함수 활용하기
- 미들웨어 (persist, devtools) 사용하기
- 비동기 상태 관리하기
- 선택적 구독으로 성능 최적화하기
- 스토어 설계 패턴 익히기

---

## 1. Zustand란?

### 정의

**Zustand**는 React를 위한 작고 빠르며 확장 가능한 상태 관리 라이브러리입니다. 독일어로 "상태(state)"를 의미하며, Redux보다 훨씬 간단한 API로 전역 상태를 관리할 수 있습니다.

### 특징

- **번들 크기:** 약 1.1KB (gzipped) - 매우 가벼움
- **보일러플레이트:** 최소한의 코드로 스토어 생성
- **TypeScript:** 완벽한 타입 지원
- **미들웨어:** persist, devtools 등 풍부한 미들웨어

### 왜 Zustand가 필요한가?

| 문제 | 기존 해결책 | Zustand 해결책 |
|------|------------|---------------|
| Prop Drilling | Context API (리렌더링 이슈) | 선택적 구독으로 최적화 |
| 복잡한 설정 | Redux (액션, 리듀서, 디스패치) | create() 하나로 끝 |
| Provider 필요 | Context, Redux 모두 필요 | Provider 없이 어디서든 사용 |
| 비동기 처리 | Redux-Thunk, Redux-Saga | 내장된 비동기 지원 |

---

## 2. 기본 사용법

### 스토어 생성하기

```typescript
import { create } from 'zustand';

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
}
```

---

## 3. set 함수 깊게 이해하기

### set 함수의 동작 원리

`set` 함수는 상태를 업데이트하는 핵심 함수입니다. React의 `setState`와 유사하지만, **자동으로 얕은 병합(shallow merge)**을 수행합니다.

### set 함수 사용 패턴

```typescript
// 패턴 1: 객체 직접 전달 (간단한 업데이트)
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
set({ count: 0 }, true)  // 두 번째 인자 true = 전체 교체
```

### 잘못된 예시 vs 올바른 예시

```typescript
// 잘못된 예시 - 직접 상태 변경 (작동 안 함!)
increment: () => {
  state.count++; // 리렌더링 안됨
}

// 잘못된 예시 - set 안에서 리턴 없이
set((state) => {
  state.count + 1;  // 리턴 필요!
})

// 올바른 예시 - set 함수로 새 객체 반환
increment: () => set((state) => ({
  count: state.count + 1
}))
```

---

## 4. get 함수 활용

### get 함수란?

`get` 함수는 스토어의 현재 상태를 읽어오는 함수입니다. 주로 **계산된 값**이나 **파생 상태**를 만들 때 사용합니다.

### get 함수 사용 예시

```typescript
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

  addItem: (item) => set((state) => {
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

  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)
  })),

  // get을 사용한 계산된 값
  getTotal: () => {
    const { items } = get();  // 현재 상태 읽기
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getTotalItems: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
```

---

## 5. 실전 예제: Todo 리스트

```typescript
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
}));

// 사용
function TodoList() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();
  const [input, setInput] = useState("");

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => { addTodo(input); setInput(""); }}>추가</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 6. 미들웨어 (Middleware)

### 미들웨어란?

미들웨어는 스토어의 기능을 확장하는 방법입니다. Zustand는 여러 유용한 내장 미들웨어를 제공합니다.

### 주요 미들웨어

| 미들웨어 | 용도 | 사용 예 |
|---------|------|--------|
| `persist` | 상태를 localStorage에 저장 | 로그인 상태, 설정 유지 |
| `devtools` | Redux DevTools 연동 | 디버깅, 상태 추적 |
| `immer` | 불변성 자동 처리 | 복잡한 중첩 상태 |
| `subscribeWithSelector` | 선택적 구독 | 특정 상태 변화 감지 |

### persist 미들웨어 사용법

```typescript
import { create } from 'zustand';
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
);
```

### devtools 미들웨어 사용법

```typescript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create<StoreType>()(
  devtools(
    (set) => ({
      // 스토어 정의
    }),
    { name: 'my-store' }  // DevTools에 표시될 이름
  )
);
```

---

## 7. 비동기 상태 관리

Zustand에서는 별도의 미들웨어 없이 **async/await**를 사용하여 비동기 액션을 직접 정의할 수 있습니다.

### 비동기 스토어 패턴

```typescript
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
);

// 사용
function UserList() {
  const { users, isLoading, error, fetchUsers } = useAsyncStore();

  return (
    <div>
      <button onClick={fetchUsers} disabled={isLoading}>
        {isLoading ? "로딩 중..." : "사용자 불러오기"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 8. 선택적 구독 (Selective Subscription)

### 주의: 불필요한 리렌더링

스토어의 모든 상태를 구독하면, 어떤 상태가 변경되어도 컴포넌트가 리렌더링됩니다. **필요한 상태만 선택적으로 구독**하여 성능을 최적화하세요.

### 비효율적인 방식 vs 효율적인 방식

```typescript
// 비효율적: 전체 스토어 구독
// count가 변경되면 DisplayName도 리렌더링됨!
function DisplayName() {
  const store = useUserStore();
  return <p>{store.name}</p>;
}

// 효율적: 필요한 상태만 선택적 구독
// count가 변경되어도 DisplayName은 리렌더링되지 않음!
function DisplayName() {
  const name = useUserStore((state) => state.name);
  return <p>{name}</p>;
}

function DisplayCount() {
  const count = useUserStore((state) => state.count);
  return <p>{count}</p>;
}
```

### 여러 상태 선택하기

```typescript
// 방법 1: 객체 반환 + shallow 비교
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
}
```

---

## 9. 스토어 설계 패턴

### 패턴 1: 도메인별 스토어 분리

```typescript
// stores/userStore.ts
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
}));
```

### 패턴 2: 슬라이스 패턴 (큰 스토어 분할)

```typescript
// 슬라이스 정의
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
}));
```

### 패턴 3: 스토어 간 통신

```typescript
// 다른 스토어 상태 읽기
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
}));
```

---

## 핵심 정리

| 개념 | 설명 | 사용 시점 |
|------|------|----------|
| `create()` | 스토어 생성 함수 | 전역 상태가 필요할 때 |
| `set()` | 상태 업데이트 함수 (자동 병합) | 상태를 변경할 때 |
| `get()` | 현재 상태 읽기 함수 | 계산된 값, 조건부 업데이트 |
| `persist` | localStorage 저장 미들웨어 | 새로고침 후에도 상태 유지 |
| `devtools` | Redux DevTools 연동 | 디버깅 시 |
| 선택적 구독 | `useStore(s => s.value)` | 성능 최적화 (항상 권장) |
| 비동기 액션 | async 함수로 직접 정의 | API 호출, 데이터 페칭 |
| 스토어 분리 | 도메인별 별도 스토어 | 대규모 애플리케이션 |

---

## 실습 (Practice)

### 실습 목표
Zustand 상태관리를 실습합니다.

### TODO 리스트
1. 기본 카운터 스토어 만들기
2. Todo 리스트 스토어 구현하기
3. persist 미들웨어로 상태 저장하기
4. 선택적 구독 적용하기

---

## 숙제 (Homework)

### 과제: Zustand 스토어 구현

#### 요구사항

**1. 쇼핑몰 장바구니 스토어**
```typescript
interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
}
```
- 상품 추가/삭제/수량 변경
- 총 금액 계산
- persist 미들웨어로 상태 유지

**2. 사용자 인증 스토어**
```typescript
interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}
```
- 비동기 로그인/로그아웃
- 에러 처리
- 로딩 상태 관리

**3. UI 상태 스토어**
```typescript
interface UIStore {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
  toggleTheme: () => void;
  toggleSidebar: () => void;
  addNotification: (message: string) => void;
  removeNotification: (id: number) => void;
}
```
- 테마 토글
- 사이드바 상태
- 알림 관리

#### 힌트
- 각 스토어는 별도 파일로 분리
- TypeScript 타입 정의 필수
- persist, devtools 미들웨어 활용
- 선택적 구독으로 성능 최적화
