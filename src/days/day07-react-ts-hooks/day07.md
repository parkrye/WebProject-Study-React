# Day 07: React TypeScript & 커스텀 훅

## 학습 목표
- React에서 TypeScript 활용하기
- 컴포넌트 Props 타입 정의하기
- 이벤트 핸들러 타입 지정하기
- useState 타입 지정하기
- 커스텀 훅 개념과 규칙 이해하기
- 실용적인 커스텀 훅 만들기 (useCounter, useLocalStorage, useDebounce)

---

## 1. React에서 TypeScript 사용하기

### 정의

**React + TypeScript**는 React 컴포넌트에 타입 안정성을 추가하여 props, state, 이벤트 핸들러 등에서 발생할 수 있는 버그를 컴파일 타임에 방지합니다.

### 왜 필요한가?

- **Props 타입 검증:** 잘못된 props 전달을 컴파일 시점에 감지
- **자동완성 지원:** IDE에서 props, state 자동완성
- **리팩토링 안정성:** 타입 변경 시 영향받는 코드 자동 감지
- **문서화 효과:** 타입이 컴포넌트 사용법을 설명

---

## 2. 컴포넌트 Props 타입 정의

### interface로 Props 정의 (권장)

```typescript
// Props 인터페이스 정의
interface ButtonProps {
  label: string;              // 필수
  onClick: () => void;        // 필수 함수
  variant?: "primary" | "secondary" | "danger";  // 선택적 리터럴 타입
  disabled?: boolean;         // 선택적
  size?: "small" | "medium" | "large";
}

// 타입이 적용된 컴포넌트
function Button({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  size = "medium"
}: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// 사용
<Button label="Primary" onClick={() => setCount(c => c + 1)} />
<Button label="Secondary" variant="secondary" onClick={() => {}} />
<Button label="Disabled" disabled onClick={() => {}} />
```

### children 타입

```typescript
interface CardProps {
  title: string;
  children: React.ReactNode;  // 모든 React 자식 요소
}

function Card({ title, children }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

---

## 3. 이벤트 핸들러 타입

### 자주 사용하는 이벤트 타입

```typescript
import { ChangeEvent, FormEvent, MouseEvent, KeyboardEvent } from "react";

// Input 변경: ChangeEvent<HTMLInputElement>
// Select 변경: ChangeEvent<HTMLSelectElement>
// Textarea 변경: ChangeEvent<HTMLTextAreaElement>
// Form 제출: FormEvent<HTMLFormElement>
// 클릭: MouseEvent<HTMLButtonElement>
// 키보드: KeyboardEvent<HTMLInputElement>
```

### 이벤트 핸들러 예시

```typescript
import { useState, ChangeEvent, FormEvent } from "react";

function Form() {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);

  // 텍스트 입력
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 셀렉트 박스
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  // 체크박스
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(e.target.checked);
  };

  // 폼 제출
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`입력값: ${inputValue}, 선택값: ${selectValue}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleInputChange} />
      <select onChange={handleSelectChange}>
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </select>
      <input type="checkbox" onChange={handleCheckboxChange} />
      <button type="submit">제출</button>
    </form>
  );
}
```

---

## 4. useState 타입

### useState 타입 지정 방법

```typescript
// 1. 타입 추론: 초기값으로부터 자동 추론
const [count, setCount] = useState(0);  // number 추론
const [name, setName] = useState("");   // string 추론

// 2. 명시적 타입 지정
const [count, setCount] = useState<number>(0);

// 3. 유니온 타입 (리터럴)
const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

// 4. 객체 타입 (null 허용)
interface User {
  id: number;
  name: string;
  email: string;
}
const [user, setUser] = useState<User | null>(null);

// 5. 배열 타입
const [users, setUsers] = useState<User[]>([]);
```

### 복잡한 제네릭 타입

```typescript
// API 응답 타입
interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useApiState() {
  const [apiState, setApiState] = useState<ApiResponse<User>>({
    data: null,
    loading: false,
    error: null
  });

  // 로딩 시작
  setApiState(prev => ({ ...prev, loading: true }));

  // 성공
  setApiState({ data: userData, loading: false, error: null });

  // 에러
  setApiState({ data: null, loading: false, error: "에러 발생" });
}
```

---

## 5. 커스텀 훅이란?

### 정의

**커스텀 훅(Custom Hook)**은 React의 내장 훅들을 조합하여 만든 재사용 가능한 함수입니다. "use"로 시작하는 이름을 가지며, 상태 로직을 컴포넌트에서 분리하여 재사용할 수 있게 합니다.

### 왜 필요한가?

- **로직 재사용:** 여러 컴포넌트에서 같은 상태 로직 공유
- **관심사 분리:** UI와 로직을 분리하여 컴포넌트 단순화
- **테스트 용이성:** 로직을 독립적으로 테스트 가능

### 커스텀 훅 규칙

1. **이름은 "use"로 시작:** useCounter, useFetch, useForm 등
2. **내부에서 다른 훅 사용 가능:** useState, useEffect 등
3. **훅의 규칙 준수:** 조건문/반복문 안에서 호출 금지

---

## 6. 커스텀 훅 - useCounter

카운터 로직을 캡슐화한 커스텀 훅입니다.

```typescript
import { useState, useCallback } from "react";

interface UseCounterOptions {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const { initialValue = 0, min = -Infinity, max = Infinity, step = 1 } = options;
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => Math.min(prev + step, max));
  }, [step, max]);

  const decrement = useCallback(() => {
    setCount(prev => Math.max(prev - step, min));
  }, [step, min]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset };
}

// 사용
function Counter() {
  const counter1 = useCounter();
  const counter2 = useCounter({ initialValue: 10, min: 0, max: 20, step: 2 });

  return (
    <div>
      <p>기본: {counter1.count}</p>
      <button onClick={counter1.increment}>+</button>
      <button onClick={counter1.decrement}>-</button>

      <p>옵션: {counter2.count}</p>
      <button onClick={counter2.increment}>+2</button>
      <button onClick={counter2.decrement}>-2</button>
    </div>
  );
}
```

---

## 7. 커스텀 훅 - useLocalStorage

localStorage와 연동되는 상태 관리 훅입니다.

```typescript
import { useState, useCallback } from "react";

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // 초기값: localStorage에서 가져오거나 initialValue 사용
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // 값 설정: state와 localStorage 동시 업데이트
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

// 사용
function Settings() {
  const [name, setName] = useLocalStorage<string>("user-name", "");
  const [settings, setSettings] = useLocalStorage<{ theme: string; fontSize: number }>(
    "user-settings",
    { theme: "light", fontSize: 14 }
  );

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름 입력"
      />

      <select
        value={settings.theme}
        onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
```

---

## 8. 커스텀 훅 - useDebounce

입력값의 디바운스 처리를 위한 훅입니다.

```typescript
import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// 사용 - 검색 입력 최적화
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // 500ms 후에 API 호출 (불필요한 API 호출 방지)
      console.log("API 호출:", debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="검색어 입력..."
    />
  );
}
```

---

## 핵심 정리

| 개념 | 설명 | 예시 |
|------|------|------|
| **Props 타입** | interface로 Props 정의 | `interface Props { name: string }` |
| **이벤트 타입** | React 이벤트 타입 사용 | `ChangeEvent<HTMLInputElement>` |
| **useState 타입** | 제네릭으로 타입 지정 | `useState<User \| null>(null)` |
| **커스텀 훅** | use로 시작하는 재사용 로직 | `useCounter, useFetch` |

### 자주 만드는 커스텀 훅

- **useToggle:** boolean 상태 토글
- **useCounter:** 숫자 카운터
- **useLocalStorage:** localStorage 연동
- **useDebounce:** 디바운스 처리
- **useFetch:** API 호출 상태 관리
- **useForm:** 폼 상태 및 유효성 검사

---

## 실습 (Practice)

### 실습 목표
React TypeScript와 커스텀 훅을 실습합니다.

### TODO 리스트
1. 타입이 적용된 컴포넌트 만들기
2. 이벤트 핸들러에 타입 지정하기
3. 커스텀 훅 직접 만들어보기

---

## 숙제 (Homework)

### 과제: 커스텀 훅 구현

#### 요구사항

**1. useToggle 훅 구현**
```typescript
// 사용 예시
const [isOpen, toggle, setIsOpen] = useToggle(false);
```
- 초기값 설정 가능
- toggle() 호출 시 값 반전
- setIsOpen(true/false)로 직접 설정 가능

**2. useForm 훅 구현**
```typescript
// 사용 예시
const { values, errors, handleChange, handleSubmit, isValid } = useForm({
  initialValues: { email: "", password: "" },
  validate: (values) => {
    const errors = {};
    if (!values.email) errors.email = "이메일 필수";
    return errors;
  }
});
```
- 폼 상태 관리
- 유효성 검사
- 에러 메시지 관리

**3. useFetch 훅 구현**
```typescript
// 사용 예시
const { data, loading, error, refetch } = useFetch<User[]>("/api/users");
```
- 로딩 상태 관리
- 에러 처리
- 재요청 기능
- 제네릭 타입 지원

#### 힌트
- 각 훅의 반환 타입을 명확히 정의하세요
- useCallback으로 함수 메모이제이션
- TypeScript 제네릭 활용
