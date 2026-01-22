# Day 10: 컴포넌트 패턴 & 최종 프로젝트

## 학습 목표
- 주요 컴포넌트 설계 패턴 이해하기
- Compound Components (합성 컴포넌트) 패턴 익히기
- Render Props 패턴 구현하기
- Controlled vs Uncontrolled 컴포넌트 구분하기
- Higher-Order Component (HOC) 이해하기
- Custom Hooks 패턴 활용하기
- Polymorphic Components 구현하기
- 폼 핸들링 & 유효성 검사 구현하기
- 재사용 가능한 컴포넌트 설계 원칙 익히기

---

## 1. 컴포넌트 설계 패턴 개요

### 정의

**컴포넌트 설계 패턴**은 React 컴포넌트를 재사용 가능하고, 유지보수하기 쉽게 만들기 위한 설계 방법론입니다. 각 패턴은 특정 문제를 해결하기 위해 고안되었습니다.

### 주요 컴포넌트 패턴

| 패턴 | 용도 | 사용 시점 |
|------|------|----------|
| Compound Components | 관련 컴포넌트 그룹화 | Card, Tabs, Accordion 등 |
| Render Props | 로직 재사용, UI 커스터마이징 | Toggle, Mouse Tracker 등 |
| HOC | 컴포넌트 기능 확장 | withLoading, withAuth 등 |
| Custom Hooks | 상태 로직 재사용 | useForm, useFetch 등 |
| Polymorphic Components | 유연한 HTML 요소 렌더링 | Button as link, Box as div 등 |

---

## 2. Compound Components (합성 컴포넌트)

### 정의

**합성 컴포넌트 패턴**은 여러 개의 관련된 컴포넌트가 함께 동작하여 하나의 기능을 구성하는 패턴입니다. 부모 컴포넌트가 암묵적으로 상태를 공유하며, 자식 컴포넌트들은 유연하게 조합할 수 있습니다.

### 특징

- **장점:** 유연한 API, 선언적 사용, 관심사 분리
- **예시:** `<Card.Header>`, `<Tabs.Tab>`, `<Select.Option>`

### 합성 컴포넌트 구현

```typescript
// 1. Context 생성
interface CardContextType {
  variant: "default" | "outlined" | "elevated";
}

const CardContext = createContext<CardContextType>({ variant: "default" });

// 2. 부모 컴포넌트
interface CardProps {
  children: ReactNode;
  variant?: "default" | "outlined" | "elevated";
}

function Card({ children, variant = "default" }: CardProps) {
  return (
    <CardContext.Provider value={{ variant }}>
      <div className={`card card--${variant}`}>
        {children}
      </div>
    </CardContext.Provider>
  );
}

// 3. 자식 컴포넌트들
function CardHeader({ children }: { children: ReactNode }) {
  const { variant } = useContext(CardContext);
  return <div className={`card-header--${variant}`}>{children}</div>;
}

function CardBody({ children }: { children: ReactNode }) {
  return <div className="card-body">{children}</div>;
}

function CardFooter({ children }: { children: ReactNode }) {
  return <div className="card-footer">{children}</div>;
}

// 4. 서브 컴포넌트 연결
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

// 5. 사용
<Card variant="elevated">
  <Card.Header>제목</Card.Header>
  <Card.Body>내용</Card.Body>
  <Card.Footer>푸터</Card.Footer>
</Card>
```

---

## 3. Render Props 패턴

### 정의

**Render Props**는 컴포넌트의 로직을 재사용하면서 렌더링 방식은 사용자가 결정할 수 있게 하는 패턴입니다. 함수를 prop으로 전달하여 동적으로 UI를 렌더링합니다.

### Render Props 구현

```typescript
interface ToggleRenderProps {
  on: boolean;
  toggle: () => void;
  setOn: (value: boolean) => void;
}

interface ToggleProps {
  children: (props: ToggleRenderProps) => ReactNode;
  initialOn?: boolean;
}

function Toggle({ children, initialOn = false }: ToggleProps) {
  const [on, setOn] = useState(initialOn);
  const toggle = () => setOn(prev => !prev);

  // children을 함수로 호출하여 상태 전달
  return <>{children({ on, toggle, setOn })}</>;
}

// 사용 예시 1: 기본 토글
<Toggle>
  {({ on, toggle }) => (
    <button onClick={toggle}>
      {on ? 'ON' : 'OFF'}
    </button>
  )}
</Toggle>

// 사용 예시 2: 커스텀 UI
<Toggle>
  {({ on, toggle }) => (
    <div>
      <span>{on ? '활성화됨' : '비활성화됨'}</span>
      <Switch checked={on} onChange={toggle} />
    </div>
  )}
</Toggle>
```

---

## 4. Controlled vs Uncontrolled Components

### 정의

**Controlled Component**는 React가 상태를 완전히 제어하는 컴포넌트이고, **Uncontrolled Component**는 DOM이 상태를 관리하는 컴포넌트입니다.

### Uncontrolled (비권장)

```typescript
function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    // ref로 값에 접근
    console.log(inputRef.current?.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="초기값" />
      <button type="submit">제출</button>
    </form>
  );
}

// 문제점:
// - 실시간 유효성 검사 어려움
// - 값 변경 추적 어려움
// - 다른 상태와 동기화 어려움
```

### Controlled (권장)

```typescript
function ControlledInput() {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit">제출</button>
    </form>
  );
}

// 장점:
// - 실시간 유효성 검사 가능
// - 입력 값 변환/포맷팅 가능
// - 다른 상태와 쉽게 동기화
```

### 언제 Uncontrolled를 사용하나요?

- 파일 입력 (`<input type="file">`)
- 레거시 코드와의 통합
- 매우 단순한 폼 (제출 시에만 값 필요)
- 성능이 중요한 대량의 폼 필드

---

## 5. Higher-Order Component (HOC)

### 정의

**HOC**는 컴포넌트를 인자로 받아 새로운 컴포넌트를 반환하는 함수입니다. 컴포넌트에 추가 기능을 주입하거나 공통 로직을 재사용할 때 사용합니다.

```typescript
const EnhancedComponent = withSomething(OriginalComponent)
```

### 주의사항

HOC는 강력하지만, 현대 React에서는 **Custom Hooks**가 더 권장됩니다. HOC는 래퍼 지옥, props 충돌 등의 문제가 있을 수 있습니다.

### HOC 구현

```typescript
// withLoading HOC
function withLoading<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithLoadingComponent({
    isLoading,
    ...props
  }: P & { isLoading: boolean }) {
    if (isLoading) {
      return <div>로딩 중...</div>;
    }
    return <WrappedComponent {...props as P} />;
  };
}

// withAuth HOC
function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} user={user} />;
  };
}

// 사용
const UserListWithLoading = withLoading(UserList);
const DashboardWithAuth = withAuth(Dashboard);

<UserListWithLoading isLoading={loading} users={users} />
<DashboardWithAuth />
```

---

## 6. Custom Hooks 패턴

### 정의

**Custom Hook**은 React Hook을 사용하여 상태 로직을 재사용 가능한 함수로 추출하는 패턴입니다. `use`로 시작하는 함수명을 사용해야 합니다.

### 특징

- **장점:** 로직 재사용, 관심사 분리, 테스트 용이
- **네이밍:** useXxx (예: useForm, useFetch, useLocalStorage)

### useForm 커스텀 훅 구현

```typescript
function useForm<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  // 값 변경 핸들러
  const handleChange = (field: keyof T) => (value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // blur 핸들러
  const handleBlur = (field: keyof T) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // 유효성 검사
  const validate = (rules: Record<keyof T, (value: string) => string | undefined>) => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const field in rules) {
      const error = rules[field](values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // 초기화
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return { values, errors, touched, handleChange, handleBlur, validate, reset };
}

// 사용 예시
function SignupForm() {
  const { values, errors, handleChange, validate, reset } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate({
      email: (v) => !v ? '필수입니다' : undefined,
      password: (v) => v.length < 6 ? '6자 이상' : undefined,
    })) {
      // 제출 로직
    }
  };
}
```

### 유용한 커스텀 훅 예시

```typescript
// useLocalStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// useDebounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// useFetch
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error };
}
```

---

## 7. Polymorphic Components

### 정의

**Polymorphic Component**는 `as` prop을 통해 렌더링되는 HTML 요소를 동적으로 변경할 수 있는 컴포넌트입니다. 스타일은 유지하면서 시맨틱 HTML을 올바르게 사용할 수 있습니다.

### Polymorphic Component 구현

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'danger';

type ButtonProps<C extends React.ElementType> = {
  as?: C;
  variant?: ButtonVariant;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<C>, 'as' | 'variant' | 'children'>;

const Button = forwardRef(function Button<C extends React.ElementType = 'button'>(
  { as, variant = 'primary', children, ...props }: ButtonProps<C>,
  ref: React.Ref<HTMLButtonElement>
) {
  const Component = as || 'button';

  return (
    <Component
      ref={ref}
      className={`btn btn--${variant}`}
      {...props}
    >
      {children}
    </Component>
  );
});

// 사용 예시
<Button variant="primary">일반 버튼</Button>
<Button as="a" href="/home" variant="primary">링크 버튼</Button>
<Button as="span" variant="secondary">Span 버튼</Button>
```

---

## 8. 폼 핸들링 & 유효성 검사

### 폼 핸들링 전략

React에서 폼을 다루는 방법은 크게 **직접 구현**과 **라이브러리 사용**으로 나뉩니다.

### 유효성 검사 패턴

```typescript
// 유효성 검사 규칙 정의
const validationRules = {
  email: (value: string) => {
    if (!value) return '이메일을 입력해주세요';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return '올바른 이메일 형식이 아닙니다';
    }
    return undefined;
  },

  password: (value: string) => {
    if (!value) return '비밀번호를 입력해주세요';
    if (value.length < 8) return '비밀번호는 8자 이상이어야 합니다';
    if (!/[A-Z]/.test(value)) return '대문자를 포함해야 합니다';
    if (!/[0-9]/.test(value)) return '숫자를 포함해야 합니다';
    return undefined;
  },

  confirmPassword: (value: string, formValues: FormData) => {
    if (value !== formValues.password) {
      return '비밀번호가 일치하지 않습니다';
    }
    return undefined;
  },
};

// 제출 시 전체 검증
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const newErrors: Record<string, string> = {};
  let isValid = true;

  for (const field in validationRules) {
    const error = validationRules[field](values[field], values);
    if (error) {
      newErrors[field] = error;
      isValid = false;
    }
  }

  setErrors(newErrors);

  if (isValid) {
    submitForm(values);
  }
};
```

### 폼 라이브러리 비교

| 라이브러리 | 특징 | 적합한 경우 |
|-----------|------|------------|
| React Hook Form | Uncontrolled 기반, 고성능 | 대규모 폼, 성능 중요 |
| Formik | Controlled 기반, 풍부한 기능 | 복잡한 폼, Yup 연동 |
| 직접 구현 | 완전한 제어, 커스터마이징 | 간단한 폼, 학습 목적 |

---

## 9. 재사용 가능한 컴포넌트 설계 원칙

### 좋은 컴포넌트의 특징

- **단일 책임:** 한 가지 일만 잘 수행
- **Props 인터페이스:** 명확하고 직관적인 API
- **합성 가능:** 다른 컴포넌트와 조합 가능
- **접근성:** ARIA 속성, 키보드 네비게이션
- **테스트 가능:** 쉽게 테스트할 수 있는 구조

### 나쁜 설계 vs 좋은 설계

```typescript
// 나쁜 설계: 너무 많은 책임
function UserDashboard({ userId }) {
  // 데이터 페칭, 로딩 상태 관리, 에러 처리,
  // 여러 섹션 렌더링, 모달 관리 등...
  return (
    <div>{/* 500줄의 JSX */}</div>
  );
}

// 좋은 설계: 관심사 분리
function UserDashboard({ userId }) {
  const { user } = useUser(userId);

  return (
    <DashboardLayout>
      <UserProfile user={user} />
      <UserStats userId={userId} />
      <RecentActivity userId={userId} />
    </DashboardLayout>
  );
}
```

### 컴포넌트 Props 설계 팁

```typescript
// 좋은 Props 인터페이스 예시
interface ButtonProps {
  // 필수 props
  children: ReactNode;

  // 스타일링
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';

  // 상태
  isLoading?: boolean;
  disabled?: boolean;

  // 이벤트
  onClick?: () => void;

  // 확장성 (HTML 속성 상속)
  className?: string;
}

// Default props 패턴
function Button({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  ...props
}: ButtonProps) {
  // ...
}
```

---

## 핵심 정리

| 패턴 | 핵심 개념 | 사용 시점 |
|------|----------|----------|
| Compound Components | Context로 상태 공유 | 관련 컴포넌트 그룹화 |
| Render Props | 함수로 UI 위임 | 로직 재사용, UI 커스터마이징 |
| HOC | 컴포넌트 래핑 | 횡단 관심사 (로딩, 인증 등) |
| Custom Hooks | 상태 로직 추출 | 상태 로직 재사용 (권장) |
| Polymorphic | as prop으로 요소 변경 | 유연한 HTML 요소 렌더링 |
| Controlled | React가 상태 관리 | 폼 입력 (권장) |
| 폼 유효성 검사 | 규칙 기반 검증 | 사용자 입력 검증 |

---

## 실습 (Practice)

### 실습 목표
컴포넌트 패턴을 실습합니다.

### TODO 리스트
1. Card 합성 컴포넌트 만들기
2. Render Props 패턴으로 Toggle 구현하기
3. useForm 커스텀 훅 구현하기
4. Polymorphic Button 컴포넌트 만들기

---

## 숙제 (Homework)

### 최종 프로젝트: 미니 피드 앱

Day 1-10에서 배운 모든 개념을 활용하여 미니 SNS 피드 앱을 만들어보세요!

#### 요구사항

**1. 게시글 CRUD**
- 게시글 목록 표시 (무한 스크롤)
- 새 게시글 작성 (폼 유효성 검사)
- 게시글 수정/삭제

**2. 상태 관리 (Zustand)**
- 게시글 상태 관리
- UI 상태 (모달, 토스트 등)
- 사용자 설정 (persist)

**3. 컴포넌트 패턴 활용**
- Card 합성 컴포넌트
- 재사용 가능한 Button, Input
- Custom Hooks (useForm, usePosts)

**4. API 연동**
- 서비스 레이어 패턴
- 에러 핸들링
- Optimistic Update

#### 평가 기준

| 항목 | 배점 |
|------|------|
| 기능 구현 | 40% |
| 코드 품질 & 패턴 활용 | 30% |
| UI/UX | 20% |
| 에러 처리 | 10% |

---

## React 10일 학습 완료!

축하합니다! 10일간의 React 학습을 모두 마쳤습니다.

지금까지 배운 내용:
- **Day 1-3:** React 기초, JSX, 컴포넌트, Props, 이벤트 처리
- **Day 4-5:** useState, useEffect, Performance Hooks
- **Day 6-7:** TypeScript, 커스텀 훅
- **Day 8:** Zustand 상태관리
- **Day 9:** API 연동, 서비스 레이어
- **Day 10:** 컴포넌트 패턴, 최종 프로젝트

이제 실전 프로젝트를 통해 배운 내용을 적용해보세요!
