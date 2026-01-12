import { useState, createContext, useContext, ReactNode, forwardRef, ComponentPropsWithoutRef } from "react";

// ============================================
// 타입 정의
// ============================================
interface FormData {
  email: string;
  password: string;
  name: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
}

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
  card: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "14px",
    boxSizing: "border-box" as const,
  },
  inputError: {
    borderColor: "#f44336",
  },
  errorText: {
    color: "#f44336",
    fontSize: "12px",
    marginTop: "-8px",
    marginBottom: "10px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold" as const,
    fontSize: "14px",
  },
};

// ============================================
// 1. Compound Component Pattern (합성 컴포넌트 패턴)
// ============================================

// Card 합성 컴포넌트
interface CardContextType {
  variant: "default" | "outlined" | "elevated";
}

const CardContext = createContext<CardContextType>({ variant: "default" });

interface CardProps {
  children: ReactNode;
  variant?: "default" | "outlined" | "elevated";
}

function Card({ children, variant = "default" }: CardProps) {
  const cardStyles: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    ...(variant === "outlined" && { border: "1px solid #ddd" }),
    ...(variant === "elevated" && { boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }),
    ...(variant === "default" && { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }),
  };

  return (
    <CardContext.Provider value={{ variant }}>
      <div style={cardStyles}>{children}</div>
    </CardContext.Provider>
  );
}

function CardHeader({ children }: { children: ReactNode }) {
  const { variant } = useContext(CardContext);
  return (
    <div
      style={{
        padding: "16px",
        borderBottom: variant === "outlined" ? "1px solid #ddd" : "none",
        backgroundColor: variant === "elevated" ? "#f5f5f5" : "transparent",
      }}
    >
      {children}
    </div>
  );
}

function CardBody({ children }: { children: ReactNode }) {
  return <div style={{ padding: "16px" }}>{children}</div>;
}

function CardFooter({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        padding: "16px",
        borderTop: "1px solid #eee",
        backgroundColor: "#fafafa",
      }}
    >
      {children}
    </div>
  );
}

// Card에 서브 컴포넌트 연결
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

// ============================================
// 2. Render Props Pattern (렌더 프롭스 패턴)
// ============================================

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
  const toggle = () => setOn((prev) => !prev);

  return <>{children({ on, toggle, setOn })}</>;
}

// ============================================
// 3. Controlled vs Uncontrolled Components
// ============================================

// Controlled Input
function ControlledInput({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={styles.label}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...styles.input, ...(error ? styles.inputError : {}) }}
      />
      {error && <p style={styles.errorText}>{error}</p>}
    </div>
  );
}

// ============================================
// 4. Higher-Order Component (HOC)
// ============================================

// withLoading HOC
interface WithLoadingProps {
  isLoading: boolean;
}

function withLoading<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithLoadingComponent({
    isLoading,
    ...props
  }: P & WithLoadingProps) {
    if (isLoading) {
      return (
        <div style={{ textAlign: "center", padding: "20px", color: "#1976d2" }}>
          로딩 중...
        </div>
      );
    }
    return <WrappedComponent {...(props as P)} />;
  };
}

// 예제 컴포넌트
function UserList({ users }: { users: string[] }) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>{user}</li>
      ))}
    </ul>
  );
}

const UserListWithLoading = withLoading(UserList);

// ============================================
// 5. Custom Hook Pattern
// ============================================

// useForm 커스텀 훅
function useForm<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = (field: keyof T) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // 에러 초기화
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof T) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validate = (validationRules: Record<keyof T, (value: string) => string | undefined>) => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const field in validationRules) {
      const error = validationRules[field](values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    setValues,
  };
}

// ============================================
// 6. Polymorphic Component Pattern
// ============================================

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  children: ReactNode;
}

type ButtonProps<C extends React.ElementType> = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<C>, keyof ButtonBaseProps> & {
    as?: C;
  };

const Button = forwardRef(function Button<C extends React.ElementType = "button">(
  { as, variant = "primary", children, ...props }: ButtonProps<C>,
  ref: React.Ref<HTMLButtonElement>
) {
  const Component = as || "button";

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: { backgroundColor: "#1976d2", color: "white" },
    secondary: { backgroundColor: "#9e9e9e", color: "white" },
    danger: { backgroundColor: "#f44336", color: "white" },
  };

  return (
    <Component
      ref={ref}
      style={{
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        textDecoration: "none",
        display: "inline-block",
        ...variantStyles[variant],
      }}
      {...props}
    >
      {children}
    </Component>
  );
});

// ============================================
// 데모 컴포넌트들
// ============================================

// 합성 컴포넌트 데모
function CompoundComponentDemo() {
  return (
    <div>
      <h4>합성 컴포넌트 데모</h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
        <Card variant="default">
          <Card.Header>
            <h5 style={{ margin: 0 }}>Default Card</h5>
          </Card.Header>
          <Card.Body>
            <p style={{ margin: 0 }}>기본 스타일의 카드입니다.</p>
          </Card.Body>
          <Card.Footer>
            <small>Footer 영역</small>
          </Card.Footer>
        </Card>

        <Card variant="outlined">
          <Card.Header>
            <h5 style={{ margin: 0 }}>Outlined Card</h5>
          </Card.Header>
          <Card.Body>
            <p style={{ margin: 0 }}>테두리 스타일의 카드입니다.</p>
          </Card.Body>
        </Card>

        <Card variant="elevated">
          <Card.Header>
            <h5 style={{ margin: 0 }}>Elevated Card</h5>
          </Card.Header>
          <Card.Body>
            <p style={{ margin: 0 }}>그림자가 강조된 카드입니다.</p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

// 렌더 프롭스 데모
function RenderPropsDemo() {
  return (
    <div>
      <h4>Render Props 데모</h4>
      <Toggle>
        {({ on, toggle }) => (
          <div>
            <p>현재 상태: <strong>{on ? "ON" : "OFF"}</strong></p>
            <button
              style={{
                ...styles.button,
                ...(on ? styles.successButton : styles.dangerButton),
              }}
              onClick={toggle}
            >
              {on ? "끄기" : "켜기"}
            </button>
          </div>
        )}
      </Toggle>
    </div>
  );
}

// HOC 데모
function HOCDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const users = ["김철수", "이영희", "박민수"];

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div>
      <h4>Higher-Order Component 데모</h4>
      <button
        style={{ ...styles.button, ...styles.primaryButton, marginBottom: "10px" }}
        onClick={simulateLoading}
      >
        로딩 시뮬레이션
      </button>
      <UserListWithLoading isLoading={isLoading} users={users} />
    </div>
  );
}

// 폼 데모
function FormDemo() {
  const { values, errors, handleChange, validate, reset } = useForm<FormData>({
    email: "",
    password: "",
    name: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const validationRules = {
    email: (value: string) => {
      if (!value) return "이메일을 입력해주세요";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "올바른 이메일 형식이 아닙니다";
      return undefined;
    },
    password: (value: string) => {
      if (!value) return "비밀번호를 입력해주세요";
      if (value.length < 6) return "비밀번호는 6자 이상이어야 합니다";
      return undefined;
    },
    name: (value: string) => {
      if (!value) return "이름을 입력해주세요";
      if (value.length < 2) return "이름은 2자 이상이어야 합니다";
      return undefined;
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(validationRules)) {
      setSubmitted(true);
      console.log("제출된 데이터:", values);
    }
  };

  return (
    <div>
      <h4>폼 핸들링 데모</h4>
      {submitted ? (
        <div style={{ ...styles.card, backgroundColor: "#e8f5e9" }}>
          <h5 style={{ color: "#4caf50", margin: "0 0 10px 0" }}>제출 완료!</h5>
          <p style={{ margin: "5px 0" }}>이름: {values.name}</p>
          <p style={{ margin: "5px 0" }}>이메일: {values.email}</p>
          <button
            style={{ ...styles.button, ...styles.primaryButton, marginTop: "10px" }}
            onClick={() => {
              reset();
              setSubmitted(false);
            }}
          >
            다시 작성
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <ControlledInput
            label="이름"
            value={values.name}
            onChange={handleChange("name")}
            error={errors.name}
          />
          <ControlledInput
            label="이메일"
            value={values.email}
            onChange={handleChange("email")}
            error={errors.email}
          />
          <div style={{ marginBottom: "15px" }}>
            <label style={styles.label}>비밀번호</label>
            <input
              type="password"
              value={values.password}
              onChange={(e) => handleChange("password")(e.target.value)}
              style={{ ...styles.input, ...(errors.password ? styles.inputError : {}) }}
            />
            {errors.password && <p style={styles.errorText}>{errors.password}</p>}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" style={{ ...styles.button, ...styles.successButton }}>
              제출
            </button>
            <button
              type="button"
              onClick={reset}
              style={{ ...styles.button, backgroundColor: "#9e9e9e", color: "white" }}
            >
              초기화
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// Polymorphic 컴포넌트 데모
function PolymorphicDemo() {
  return (
    <div>
      <h4>Polymorphic Component 데모</h4>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="danger">Danger Button</Button>
        <Button as="a" href="#" variant="primary">
          Link styled as Button
        </Button>
      </div>
    </div>
  );
}

// ============================================
// 메인 컴포넌트
// ============================================
export default function Study() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Day 10: 컴포넌트 패턴 & 최종 프로젝트</h1>

      {/* 섹션 1: 컴포넌트 설계 패턴 개요 */}
      <section style={styles.section}>
        <h2>1. 컴포넌트 설계 패턴 개요</h2>

        <div style={styles.definitionBox}>
          <h3>정의</h3>
          <p>
            <strong>컴포넌트 설계 패턴</strong>은 React 컴포넌트를 재사용 가능하고,
            유지보수하기 쉽게 만들기 위한 설계 방법론입니다.
            각 패턴은 특정 문제를 해결하기 위해 고안되었습니다.
          </p>
        </div>

        <div style={styles.exampleBox}>
          <h3>주요 컴포넌트 패턴</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>패턴</th>
                <th style={styles.th}>용도</th>
                <th style={styles.th}>사용 시점</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Compound Components</td>
                <td style={styles.td}>관련 컴포넌트 그룹화</td>
                <td style={styles.td}>Card, Tabs, Accordion 등</td>
              </tr>
              <tr>
                <td style={styles.td}>Render Props</td>
                <td style={styles.td}>로직 재사용, UI 커스터마이징</td>
                <td style={styles.td}>Toggle, Mouse Tracker 등</td>
              </tr>
              <tr>
                <td style={styles.td}>HOC (Higher-Order Component)</td>
                <td style={styles.td}>컴포넌트 기능 확장</td>
                <td style={styles.td}>withLoading, withAuth 등</td>
              </tr>
              <tr>
                <td style={styles.td}>Custom Hooks</td>
                <td style={styles.td}>상태 로직 재사용</td>
                <td style={styles.td}>useForm, useFetch 등</td>
              </tr>
              <tr>
                <td style={styles.td}>Polymorphic Components</td>
                <td style={styles.td}>유연한 HTML 요소 렌더링</td>
                <td style={styles.td}>Button as link, Box as div 등</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 섹션 2: 합성 컴포넌트 패턴 */}
      <section style={styles.section}>
        <h2>2. Compound Components (합성 컴포넌트)</h2>

        <div style={styles.definitionBox}>
          <h3>정의</h3>
          <p>
            <strong>합성 컴포넌트 패턴</strong>은 여러 개의 관련된 컴포넌트가
            함께 동작하여 하나의 기능을 구성하는 패턴입니다.
            부모 컴포넌트가 암묵적으로 상태를 공유하며, 자식 컴포넌트들은 유연하게 조합할 수 있습니다.
          </p>
          <ul>
            <li><strong>장점:</strong> 유연한 API, 선언적 사용, 관심사 분리</li>
            <li><strong>예시:</strong> {`<Card.Header>`}, {`<Tabs.Tab>`}, {`<Select.Option>`}</li>
          </ul>
        </div>

        <div style={styles.exampleBox}>
          <h3>합성 컴포넌트 구현</h3>
          <pre style={styles.codeBlock}>
{`// 1. Context 생성
const CardContext = createContext({ variant: 'default' });

// 2. 부모 컴포넌트
function Card({ children, variant = 'default' }) {
  return (
    <CardContext.Provider value={{ variant }}>
      <div className={\`card card--\${variant}\`}>
        {children}
      </div>
    </CardContext.Provider>
  );
}

// 3. 자식 컴포넌트들
function CardHeader({ children }) {
  const { variant } = useContext(CardContext);
  return <div className={\`card-header--\${variant}\`}>{children}</div>;
}

function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
}

function CardFooter({ children }) {
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
</Card>`}
          </pre>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모</h3>
          <CompoundComponentDemo />
        </div>
      </section>

      {/* 섹션 3: Render Props 패턴 */}
      <section style={styles.section}>
        <h2>3. Render Props 패턴</h2>

        <div style={styles.definitionBox}>
          <h3>정의</h3>
          <p>
            <strong>Render Props</strong>는 컴포넌트의 로직을 재사용하면서
            렌더링 방식은 사용자가 결정할 수 있게 하는 패턴입니다.
            함수를 prop으로 전달하여 동적으로 UI를 렌더링합니다.
          </p>
        </div>

        <div style={styles.exampleBox}>
          <h3>Render Props 구현</h3>
          <pre style={styles.codeBlock}>
{`// Toggle 컴포넌트 (로직만 제공)
interface ToggleRenderProps {
  on: boolean;
  toggle: () => void;
  setOn: (value: boolean) => void;
}

function Toggle({ children, initialOn = false }) {
  const [on, setOn] = useState(initialOn);
  const toggle = () => setOn(prev => !prev);

  // children을 함수로 호출하여 상태 전달
  return children({ on, toggle, setOn });
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
</Toggle>`}
          </pre>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모</h3>
          <RenderPropsDemo />
        </div>
      </section>

      {/* 섹션 4: Controlled vs Uncontrolled */}
      <section style={styles.section}>
        <h2>4. Controlled vs Uncontrolled Components</h2>

        <div style={styles.definitionBox}>
          <h3>정의</h3>
          <p>
            <strong>Controlled Component</strong>는 React가 상태를 완전히 제어하는 컴포넌트이고,
            <strong>Uncontrolled Component</strong>는 DOM이 상태를 관리하는 컴포넌트입니다.
          </p>
        </div>

        <div style={{ ...styles.comparisonContainer, marginTop: "20px" }}>
          <div style={styles.wrongExample}>
            <h4 style={{ color: "#f44336" }}>Uncontrolled (비권장)</h4>
            <pre style={{ ...styles.codeBlock, backgroundColor: "#5d1a1a" }}>
{`// DOM이 상태 관리
function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    // ref로 값에 접근
    console.log(inputRef.current?.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        defaultValue="초기값"
      />
      <button type="submit">제출</button>
    </form>
  );
}

// 문제점:
// - 실시간 유효성 검사 어려움
// - 값 변경 추적 어려움
// - 다른 상태와 동기화 어려움`}
            </pre>
          </div>
          <div style={styles.correctExample}>
            <h4 style={{ color: "#4caf50" }}>Controlled (권장)</h4>
            <pre style={{ ...styles.codeBlock, backgroundColor: "#1a3d1a" }}>
{`// React가 상태 관리
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
// - 다른 상태와 쉽게 동기화`}
            </pre>
          </div>
        </div>

        <div style={styles.exampleBox}>
          <h3>언제 Uncontrolled를 사용하나요?</h3>
          <ul>
            <li>파일 입력 ({`<input type="file">`})</li>
            <li>레거시 코드와의 통합</li>
            <li>매우 단순한 폼 (제출 시에만 값 필요)</li>
            <li>성능이 중요한 대량의 폼 필드</li>
          </ul>
        </div>
      </section>

      {/* 섹션 5: Higher-Order Component */}
      <section style={styles.section}>
        <h2>5. Higher-Order Component (HOC)</h2>

        <div style={styles.definitionBox}>
          <h3>정의</h3>
          <p>
            <strong>HOC</strong>는 컴포넌트를 인자로 받아 새로운 컴포넌트를 반환하는 함수입니다.
            컴포넌트에 추가 기능을 주입하거나 공통 로직을 재사용할 때 사용합니다.
          </p>
          <code>const EnhancedComponent = withSomething(OriginalComponent)</code>
        </div>

        <div style={styles.warningBox}>
          <h3>주의사항</h3>
          <p>
            HOC는 강력하지만, 현대 React에서는 <strong>Custom Hooks</strong>가 더 권장됩니다.
            HOC는 래퍼 지옥, props 충돌 등의 문제가 있을 수 있습니다.
          </p>
        </div>

        <div style={styles.exampleBox}>
          <h3>HOC 구현</h3>
          <pre style={styles.codeBlock}>
{`// withLoading HOC
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
<DashboardWithAuth />`}
          </pre>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모</h3>
          <HOCDemo />
        </div>
      </section>

      {/* 섹션 6: Custom Hooks */}
      <section style={styles.section}>
        <h2>6. Custom Hooks 패턴</h2>

        <div style={styles.definitionBox}>
          <h3>정의</h3>
          <p>
            <strong>Custom Hook</strong>은 React Hook을 사용하여 상태 로직을 재사용 가능한 함수로 추출하는 패턴입니다.
            <code>use</code>로 시작하는 함수명을 사용해야 합니다.
          </p>
          <ul>
            <li><strong>장점:</strong> 로직 재사용, 관심사 분리, 테스트 용이</li>
            <li><strong>네이밍:</strong> useXxx (예: useForm, useFetch, useLocalStorage)</li>
          </ul>
        </div>

        <div style={styles.exampleBox}>
          <h3>useForm 커스텀 훅 구현</h3>
          <pre style={styles.codeBlock}>
{`function useForm<T extends Record<string, string>>(initialValues: T) {
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
}`}
          </pre>
        </div>

        <div style={styles.exampleBox}>
          <h3>유용한 커스텀 훅 예시</h3>
          <pre style={styles.codeBlock}>
{`// useLocalStorage
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
}`}
          </pre>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모: useForm 훅</h3>
          <FormDemo />
        </div>
      </section>

      {/* 섹션 7: Polymorphic Components */}
      <section style={styles.section}>
        <h2>7. Polymorphic Components</h2>

        <div style={styles.definitionBox}>
          <h3>정의</h3>
          <p>
            <strong>Polymorphic Component</strong>는 <code>as</code> prop을 통해
            렌더링되는 HTML 요소를 동적으로 변경할 수 있는 컴포넌트입니다.
            스타일은 유지하면서 시맨틱 HTML을 올바르게 사용할 수 있습니다.
          </p>
        </div>

        <div style={styles.exampleBox}>
          <h3>Polymorphic Component 구현</h3>
          <pre style={styles.codeBlock}>
{`type ButtonProps<C extends React.ElementType> = {
  as?: C;
  variant?: 'primary' | 'secondary';
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
      className={\`btn btn--\${variant}\`}
      {...props}
    >
      {children}
    </Component>
  );
});

// 사용 예시
<Button variant="primary">일반 버튼</Button>
<Button as="a" href="/home" variant="primary">링크 버튼</Button>
<Button as="span" variant="secondary">Span 버튼</Button>`}
          </pre>
        </div>

        <div style={styles.demoBox}>
          <h3>실시간 데모</h3>
          <PolymorphicDemo />
        </div>
      </section>

      {/* 섹션 8: 폼 유효성 검사 */}
      <section style={styles.section}>
        <h2>8. 폼 핸들링 & 유효성 검사</h2>

        <div style={styles.definitionBox}>
          <h3>폼 핸들링 전략</h3>
          <p>
            React에서 폼을 다루는 방법은 크게 <strong>직접 구현</strong>과
            <strong>라이브러리 사용</strong>으로 나뉩니다.
          </p>
        </div>

        <div style={styles.exampleBox}>
          <h3>유효성 검사 패턴</h3>
          <pre style={styles.codeBlock}>
{`// 유효성 검사 규칙 정의
const validationRules = {
  email: (value: string) => {
    if (!value) return '이메일을 입력해주세요';
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
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

// 실시간 검증 (onChange 또는 onBlur)
const handleBlur = (field: string) => {
  const error = validationRules[field]?.(values[field], values);
  setErrors(prev => ({ ...prev, [field]: error }));
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
};`}
          </pre>
        </div>

        <div style={styles.exampleBox}>
          <h3>폼 라이브러리 비교</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>라이브러리</th>
                <th style={styles.th}>특징</th>
                <th style={styles.th}>적합한 경우</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>React Hook Form</td>
                <td style={styles.td}>Uncontrolled 기반, 고성능</td>
                <td style={styles.td}>대규모 폼, 성능 중요</td>
              </tr>
              <tr>
                <td style={styles.td}>Formik</td>
                <td style={styles.td}>Controlled 기반, 풍부한 기능</td>
                <td style={styles.td}>복잡한 폼, Yup 연동</td>
              </tr>
              <tr>
                <td style={styles.td}>직접 구현</td>
                <td style={styles.td}>완전한 제어, 커스터마이징</td>
                <td style={styles.td}>간단한 폼, 학습 목적</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 섹션 9: 재사용 가능한 컴포넌트 설계 */}
      <section style={styles.section}>
        <h2>9. 재사용 가능한 컴포넌트 설계 원칙</h2>

        <div style={styles.definitionBox}>
          <h3>좋은 컴포넌트의 특징</h3>
          <ul>
            <li><strong>단일 책임:</strong> 한 가지 일만 잘 수행</li>
            <li><strong>Props 인터페이스:</strong> 명확하고 직관적인 API</li>
            <li><strong>합성 가능:</strong> 다른 컴포넌트와 조합 가능</li>
            <li><strong>접근성:</strong> ARIA 속성, 키보드 네비게이션</li>
            <li><strong>테스트 가능:</strong> 쉽게 테스트할 수 있는 구조</li>
          </ul>
        </div>

        <div style={{ ...styles.comparisonContainer, marginTop: "20px" }}>
          <div style={styles.wrongExample}>
            <h4 style={{ color: "#f44336" }}>나쁜 설계</h4>
            <pre style={{ ...styles.codeBlock, backgroundColor: "#5d1a1a" }}>
{`// 너무 많은 책임
function UserDashboard({ userId }) {
  // 데이터 페칭
  // 로딩 상태 관리
  // 에러 처리
  // 여러 섹션 렌더링
  // 모달 관리
  // 등등...

  return (
    <div>
      {/* 500줄의 JSX */}
    </div>
  );
}

// Props가 불명확
<Button
  a={true}
  b="primary"
  c={() => {}}
  d={5}
/>`}
            </pre>
          </div>
          <div style={styles.correctExample}>
            <h4 style={{ color: "#4caf50" }}>좋은 설계</h4>
            <pre style={{ ...styles.codeBlock, backgroundColor: "#1a3d1a" }}>
{`// 관심사 분리
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

// 명확한 Props
<Button
  variant="primary"
  size="medium"
  onClick={handleClick}
  disabled={isLoading}
>
  제출
</Button>`}
            </pre>
          </div>
        </div>

        <div style={styles.exampleBox}>
          <h3>컴포넌트 Props 설계 팁</h3>
          <pre style={styles.codeBlock}>
{`// 좋은 Props 인터페이스 예시
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
}`}
          </pre>
        </div>
      </section>

      {/* 핵심 정리 */}
      <section style={styles.section}>
        <h2>핵심 정리</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>패턴</th>
              <th style={styles.th}>핵심 개념</th>
              <th style={styles.th}>사용 시점</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Compound Components</td>
              <td style={styles.td}>Context로 상태 공유</td>
              <td style={styles.td}>관련 컴포넌트 그룹화</td>
            </tr>
            <tr>
              <td style={styles.td}>Render Props</td>
              <td style={styles.td}>함수로 UI 위임</td>
              <td style={styles.td}>로직 재사용, UI 커스터마이징</td>
            </tr>
            <tr>
              <td style={styles.td}>HOC</td>
              <td style={styles.td}>컴포넌트 래핑</td>
              <td style={styles.td}>횡단 관심사 (로딩, 인증 등)</td>
            </tr>
            <tr>
              <td style={styles.td}>Custom Hooks</td>
              <td style={styles.td}>상태 로직 추출</td>
              <td style={styles.td}>상태 로직 재사용 (권장)</td>
            </tr>
            <tr>
              <td style={styles.td}>Polymorphic</td>
              <td style={styles.td}>as prop으로 요소 변경</td>
              <td style={styles.td}>유연한 HTML 요소 렌더링</td>
            </tr>
            <tr>
              <td style={styles.td}>Controlled</td>
              <td style={styles.td}>React가 상태 관리</td>
              <td style={styles.td}>폼 입력 (권장)</td>
            </tr>
            <tr>
              <td style={styles.td}>폼 유효성 검사</td>
              <td style={styles.td}>규칙 기반 검증</td>
              <td style={styles.td}>사용자 입력 검증</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 최종 프로젝트 가이드 */}
      <section style={styles.section}>
        <div style={{ ...styles.definitionBox, backgroundColor: "#fff3e0" }}>
          <h3>최종 프로젝트: 미니 피드 앱</h3>
          <p>
            Day 1-10에서 배운 모든 개념을 활용하여 미니 SNS 피드 앱을 만들어보세요!
          </p>

          <h4>요구사항</h4>
          <ol>
            <li>
              <strong>게시글 CRUD</strong>
              <ul>
                <li>게시글 목록 표시 (무한 스크롤)</li>
                <li>새 게시글 작성 (폼 유효성 검사)</li>
                <li>게시글 수정/삭제</li>
              </ul>
            </li>
            <li>
              <strong>상태 관리 (Zustand)</strong>
              <ul>
                <li>게시글 상태 관리</li>
                <li>UI 상태 (모달, 토스트 등)</li>
                <li>사용자 설정 (persist)</li>
              </ul>
            </li>
            <li>
              <strong>컴포넌트 패턴 활용</strong>
              <ul>
                <li>Card 합성 컴포넌트</li>
                <li>재사용 가능한 Button, Input</li>
                <li>Custom Hooks (useForm, usePosts)</li>
              </ul>
            </li>
            <li>
              <strong>API 연동</strong>
              <ul>
                <li>서비스 레이어 패턴</li>
                <li>에러 핸들링</li>
                <li>Optimistic Update</li>
              </ul>
            </li>
          </ol>

          <h4>평가 기준</h4>
          <table style={{ ...styles.table, marginBottom: "20px" }}>
            <thead>
              <tr>
                <th style={styles.th}>항목</th>
                <th style={styles.th}>배점</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>기능 구현</td>
                <td style={styles.td}>40%</td>
              </tr>
              <tr>
                <td style={styles.td}>코드 품질 & 패턴 활용</td>
                <td style={styles.td}>30%</td>
              </tr>
              <tr>
                <td style={styles.td}>UI/UX</td>
                <td style={styles.td}>20%</td>
              </tr>
              <tr>
                <td style={styles.td}>에러 처리</td>
                <td style={styles.td}>10%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 학습 완료 */}
      <section style={styles.section}>
        <div style={{ ...styles.definitionBox, backgroundColor: "#e8f5e9" }}>
          <h3>React 10일 학습 완료!</h3>
          <p>
            축하합니다! 10일간의 React 학습을 모두 마쳤습니다.
            지금까지 배운 내용을 정리하면:
          </p>
          <ul>
            <li><strong>Day 1-3:</strong> React 기초, JSX, 컴포넌트</li>
            <li><strong>Day 4-5:</strong> useState, useEffect, 이벤트 처리</li>
            <li><strong>Day 6-7:</strong> useRef, 조건부 렌더링, 리스트</li>
            <li><strong>Day 8:</strong> Zustand 상태관리</li>
            <li><strong>Day 9:</strong> API 연동, 서비스 레이어</li>
            <li><strong>Day 10:</strong> 컴포넌트 패턴, 최종 프로젝트</li>
          </ul>
          <p>
            이제 실전 프로젝트를 통해 배운 내용을 적용해보세요!
          </p>
        </div>
      </section>
    </div>
  );
}
