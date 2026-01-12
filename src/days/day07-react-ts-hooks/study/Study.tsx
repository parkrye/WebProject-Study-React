/**
 * ========================================
 * Day 07: React TypeScript & 커스텀 훅
 * ========================================
 */

import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from "react";

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

// ========================================
// 섹션 1: React에서 TypeScript 사용하기
// ========================================

function ReactTypeScriptIntro() {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>1. React에서 TypeScript 사용하기</h2>

      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>정의</h3>
        <p style={{ margin: 0 }}>
          <strong>React + TypeScript</strong>는 React 컴포넌트에 타입 안정성을 추가하여
          props, state, 이벤트 핸들러 등에서 발생할 수 있는 버그를 컴파일 타임에 방지합니다.
        </p>
      </div>

      <div style={{
        backgroundColor: "#fff3e0",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>왜 필요한가?</h3>
        <ul>
          <li><strong>Props 타입 검증:</strong> 잘못된 props 전달을 컴파일 시점에 감지</li>
          <li><strong>자동완성 지원:</strong> IDE에서 props, state 자동완성</li>
          <li><strong>리팩토링 안정성:</strong> 타입 변경 시 영향받는 코드 자동 감지</li>
          <li><strong>문서화 효과:</strong> 타입이 컴포넌트 사용법을 설명</li>
        </ul>
      </div>
    </div>
  );
}

// ========================================
// 섹션 2: 컴포넌트 Props 타입 정의
// ========================================

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

function Button({ label, onClick, variant = "primary", disabled = false, size = "medium" }: ButtonProps) {
  const sizeStyles = {
    small: { padding: "4px 8px", fontSize: "12px" },
    medium: { padding: "8px 16px", fontSize: "14px" },
    large: { padding: "12px 24px", fontSize: "16px" }
  };

  const variantStyles = {
    primary: { backgroundColor: "#1976d2", color: "white" },
    secondary: { backgroundColor: "#757575", color: "white" },
    danger: { backgroundColor: "#d32f2f", color: "white" }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant],
        border: "none",
        borderRadius: "4px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        marginRight: "8px"
      }}
    >
      {label}
    </button>
  );
}

function PropsTypingSection() {
  const [clickCount, setClickCount] = useState(0);

  const buttonCode = `// Props 인터페이스 정의
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
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
<Button label="Primary" onClick={() => setClickCount(c => c + 1)} />
<Button label="Secondary" variant="secondary" onClick={() => {}} />
<Button label="Disabled" disabled onClick={() => {}} />`;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>2. 컴포넌트 Props 타입 정의</h2>

      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>Props 타입 정의 방법</h3>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// 1. interface로 Props 정의 (권장)
interface ButtonProps {
  label: string;              // 필수
  onClick: () => void;        // 필수 함수
  variant?: "primary" | "secondary";  // 선택적 리터럴 타입
  disabled?: boolean;         // 선택적
}

// 2. children 타입
interface CardProps {
  title: string;
  children: React.ReactNode;  // 모든 React 자식 요소
}`}
        </pre>
      </div>

      <CodeDemo title="타입이 적용된 Button 컴포넌트" code={buttonCode}>
        <p>클릭 횟수: <strong>{clickCount}</strong></p>
        <div style={{ marginBottom: "15px" }}>
          <Button label="Primary" onClick={() => setClickCount(c => c + 1)} />
          <Button label="Secondary" onClick={() => setClickCount(c => c + 1)} variant="secondary" />
          <Button label="Danger" onClick={() => setClickCount(c => c + 1)} variant="danger" />
          <Button label="Disabled" onClick={() => {}} disabled />
        </div>
        <div>
          <Button label="Small" onClick={() => {}} size="small" />
          <Button label="Medium" onClick={() => {}} size="medium" />
          <Button label="Large" onClick={() => {}} size="large" />
        </div>
      </CodeDemo>
    </div>
  );
}

// ========================================
// 섹션 3: 이벤트 핸들러 타입
// ========================================

function EventHandlerSection() {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(e.target.checked);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`입력값: ${inputValue}, 선택값: ${selectValue}, 체크: ${checkboxValue}`);
  };

  const eventCode = `import { ChangeEvent, FormEvent } from "react";

// 이벤트 핸들러 타입 지정
const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value);
};

const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
  setSelectValue(e.target.value);
};

const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
  setCheckboxValue(e.target.checked);
};

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  alert(\`입력값: \${inputValue}\`);
};

// 사용
<form onSubmit={handleSubmit}>
  <input type="text" onChange={handleInputChange} />
  <select onChange={handleSelectChange}>...</select>
  <input type="checkbox" onChange={handleCheckboxChange} />
  <button type="submit">제출</button>
</form>`;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>3. 이벤트 핸들러 타입</h2>

      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>자주 사용하는 이벤트 타입</h3>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`import { ChangeEvent, FormEvent, MouseEvent, KeyboardEvent } from "react";

// Input 변경: ChangeEvent<HTMLInputElement>
// Select 변경: ChangeEvent<HTMLSelectElement>
// Form 제출: FormEvent<HTMLFormElement>
// 클릭: MouseEvent<HTMLButtonElement>
// 키보드: KeyboardEvent<HTMLInputElement>`}
        </pre>
      </div>

      <CodeDemo title="타입이 적용된 폼 이벤트" code={eventCode}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              텍스트 (ChangeEvent&lt;HTMLInputElement&gt;):
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              style={{ padding: "8px", width: "250px" }}
            />
            <span style={{ marginLeft: "10px", color: "#666" }}>값: {inputValue}</span>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              셀렉트 (ChangeEvent&lt;HTMLSelectElement&gt;):
            </label>
            <select value={selectValue} onChange={handleSelectChange} style={{ padding: "8px" }}>
              <option value="">선택하세요</option>
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="angular">Angular</option>
            </select>
            <span style={{ marginLeft: "10px", color: "#666" }}>값: {selectValue}</span>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>
              <input type="checkbox" checked={checkboxValue} onChange={handleCheckboxChange} />
              {" "}체크박스 (e.target.checked)
            </label>
            <span style={{ marginLeft: "10px", color: "#666" }}>값: {checkboxValue.toString()}</span>
          </div>

          <button type="submit" style={{
            padding: "10px 20px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}>
            제출
          </button>
        </form>
      </CodeDemo>
    </div>
  );
}

// ========================================
// 섹션 4: useState 타입
// ========================================

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function HooksTypingSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [apiState, setApiState] = useState<ApiResponse<User>>({
    data: null,
    loading: false,
    error: null
  });

  useEffect(() => {
    const fetchUser = async () => {
      setApiState(prev => ({ ...prev, loading: true }));
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser: User = { id: 1, name: "홍길동", email: "hong@example.com" };
        setApiState({ data: mockUser, loading: false, error: null });
        setStatus("success");
      } catch (err) {
        setApiState({ data: null, loading: false, error: "에러 발생" });
        setStatus("error");
      }
    };

    if (status === "idle") {
      setStatus("loading");
      fetchUser();
    }
  }, [status]);

  const useStateCode = `// useState 타입 지정 방법
const [count, setCount] = useState(0);  // number 추론

// 명시적 타입 지정
const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

// 객체 타입 (null 허용)
interface User { id: number; name: string; email: string; }
const [user, setUser] = useState<User | null>(null);

// 복잡한 제네릭 타입
interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
const [apiState, setApiState] = useState<ApiResponse<User>>({
  data: null,
  loading: false,
  error: null
});`;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>4. useState 타입</h2>

      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>useState 타입 지정 방법</h3>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// 타입 추론: useState(0) → number
// 명시적: useState<string>("")
// 유니온: useState<"a" | "b">("a")
// 객체: useState<User | null>(null)
// 배열: useState<User[]>([])`}
        </pre>
      </div>

      <CodeDemo title="API 상태 관리 (타입 적용)" code={useStateCode}>
        <p>상태: <strong style={{
          color: status === "loading" ? "blue" : status === "success" ? "green" : status === "error" ? "red" : "gray"
        }}>{status}</strong></p>

        {apiState.loading && <p>로딩 중...</p>}
        {apiState.error && <p style={{ color: "red" }}>에러: {apiState.error}</p>}

        {apiState.data && (
          <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "4px" }}>
            <p>ID: {apiState.data.id}</p>
            <p>이름: {apiState.data.name}</p>
            <p>이메일: {apiState.data.email}</p>
          </div>
        )}

        <button onClick={() => { setStatus("idle"); setApiState({ data: null, loading: false, error: null }); }}
          style={{ marginTop: "10px", padding: "8px 16px", backgroundColor: "#ff9800", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          다시 로드
        </button>
      </CodeDemo>
    </div>
  );
}

// ========================================
// 섹션 5: 커스텀 훅이란?
// ========================================

function CustomHookDefinition() {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>5. 커스텀 훅이란?</h2>

      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>정의</h3>
        <p style={{ margin: 0 }}>
          <strong>커스텀 훅(Custom Hook)</strong>은 React의 내장 훅들을 조합하여 만든 재사용 가능한 함수입니다.
          "use"로 시작하는 이름을 가지며, 상태 로직을 컴포넌트에서 분리하여 재사용할 수 있게 합니다.
        </p>
      </div>

      <div style={{
        backgroundColor: "#fff3e0",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>왜 필요한가?</h3>
        <ul>
          <li><strong>로직 재사용:</strong> 여러 컴포넌트에서 같은 상태 로직 공유</li>
          <li><strong>관심사 분리:</strong> UI와 로직을 분리하여 컴포넌트 단순화</li>
          <li><strong>테스트 용이성:</strong> 로직을 독립적으로 테스트 가능</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: "#ffebee",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <h3 style={{ color: "#c62828" }}>커스텀 훅 규칙</h3>
        <ol>
          <li><strong>이름은 "use"로 시작:</strong> useCounter, useFetch, useForm 등</li>
          <li><strong>내부에서 다른 훅 사용 가능:</strong> useState, useEffect 등</li>
          <li><strong>훅의 규칙 준수:</strong> 조건문/반복문 안에서 호출 금지</li>
        </ol>
      </div>
    </div>
  );
}

// ========================================
// 섹션 6: useCounter 커스텀 훅
// ========================================

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

function UseCounterDemo() {
  const counter1 = useCounter();
  const counter2 = useCounter({ initialValue: 10, min: 0, max: 20, step: 2 });

  const useCounterCode = `// useCounter 커스텀 훅
interface UseCounterOptions {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

function useCounter(options: UseCounterOptions = {}) {
  const { initialValue = 0, min = -Infinity, max = Infinity, step = 1 } = options;
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => Math.min(prev + step, max));
  }, [step, max]);

  const decrement = useCallback(() => {
    setCount(prev => Math.max(prev - step, min));
  }, [step, min]);

  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}

// 사용
const counter1 = useCounter();
const counter2 = useCounter({ initialValue: 10, min: 0, max: 20, step: 2 });`;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>6. 커스텀 훅 - useCounter</h2>

      <CodeDemo title="useCounter 데모" code={useCounterCode}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "8px" }}>
            <h4>기본 카운터</h4>
            <p style={{ fontSize: "12px", color: "#666" }}>useCounter()</p>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{counter1.count}</p>
            <div style={{ display: "flex", gap: "5px" }}>
              <button onClick={counter1.decrement}>-</button>
              <button onClick={counter1.increment}>+</button>
              <button onClick={counter1.reset}>Reset</button>
            </div>
          </div>

          <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "8px" }}>
            <h4>옵션 적용 카운터</h4>
            <p style={{ fontSize: "12px", color: "#666" }}>step: 2, min: 0, max: 20</p>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{counter2.count}</p>
            <div style={{ display: "flex", gap: "5px" }}>
              <button onClick={counter2.decrement}>-2</button>
              <button onClick={counter2.increment}>+2</button>
              <button onClick={counter2.reset}>Reset</button>
            </div>
          </div>
        </div>
      </CodeDemo>
    </div>
  );
}

// ========================================
// 섹션 7: useLocalStorage 커스텀 훅
// ========================================

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

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

function UseLocalStorageDemo() {
  const [name, setName] = useLocalStorage<string>("user-name-demo", "");
  const [settings, setSettings] = useLocalStorage<{ theme: string; fontSize: number }>(
    "user-settings-demo",
    { theme: "light", fontSize: 14 }
  );

  const useLocalStorageCode = `function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  }, [key, storedValue]);

  return [storedValue, setValue];
}

// 사용
const [name, setName] = useLocalStorage<string>("user-name", "");
const [settings, setSettings] = useLocalStorage<Settings>("settings", defaultSettings);`;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>7. 커스텀 훅 - useLocalStorage</h2>

      <CodeDemo title="useLocalStorage 데모 (새로고침해도 값 유지)" code={useLocalStorageCode}>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
          값을 변경하고 페이지를 새로고침해도 유지됩니다.
        </p>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>이름:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            style={{ padding: "8px", width: "200px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>테마:</label>
          <select
            value={settings.theme}
            onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
            style={{ padding: "8px" }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>폰트 크기: {settings.fontSize}px</label>
          <input
            type="range"
            min="12"
            max="24"
            value={settings.fontSize}
            onChange={(e) => setSettings(prev => ({ ...prev, fontSize: Number(e.target.value) }))}
          />
        </div>

        <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "4px" }}>
          <p><strong>저장된 값:</strong></p>
          <p>이름: {name || "(없음)"}</p>
          <p>테마: {settings.theme}</p>
          <p>폰트 크기: {settings.fontSize}px</p>
        </div>
      </CodeDemo>
    </div>
  );
}

// ========================================
// 섹션 8: useDebounce 커스텀 훅
// ========================================

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function UseDebounceDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchCount, setSearchCount] = useState(0);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchCount(c => c + 1);
    }
  }, [debouncedSearchTerm]);

  const useDebounceCode = `function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// 사용 - 검색 입력 최적화
const [searchTerm, setSearchTerm] = useState("");
const debouncedSearchTerm = useDebounce(searchTerm, 500);

useEffect(() => {
  if (debouncedSearchTerm) {
    // 500ms 후에 API 호출
    searchAPI(debouncedSearchTerm);
  }
}, [debouncedSearchTerm]);`;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>8. 커스텀 훅 - useDebounce</h2>

      <CodeDemo title="useDebounce 데모 (500ms 디바운스)" code={useDebounceCode}>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
          입력 후 500ms가 지나야 검색(API 호출)이 실행됩니다.
        </p>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력하세요..."
            style={{ padding: "10px", width: "300px", fontSize: "16px" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "4px" }}>
            <p><strong>입력값 (실시간):</strong></p>
            <p style={{ fontSize: "18px" }}>{searchTerm || "(비어있음)"}</p>
          </div>
          <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "4px" }}>
            <p><strong>디바운스된 값:</strong></p>
            <p style={{ fontSize: "18px" }}>{debouncedSearchTerm || "(비어있음)"}</p>
          </div>
        </div>

        <p style={{ marginTop: "15px", color: "#666" }}>
          검색 API 호출 횟수: <strong>{searchCount}</strong>
        </p>
      </CodeDemo>
    </div>
  );
}

// ========================================
// 섹션 9: 핵심 정리
// ========================================

function SummaryTable() {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>9. 핵심 정리</h2>

      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff" }}>
        <thead>
          <tr style={{ backgroundColor: "#1976d2", color: "white" }}>
            <th style={{ padding: "12px", border: "1px solid #1565c0" }}>개념</th>
            <th style={{ padding: "12px", border: "1px solid #1565c0" }}>설명</th>
            <th style={{ padding: "12px", border: "1px solid #1565c0" }}>예시</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "12px", border: "1px solid #ddd", fontWeight: "bold" }}>Props 타입</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>interface로 Props 정의</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}><code>{`interface Props { name: string }`}</code></td>
          </tr>
          <tr>
            <td style={{ padding: "12px", border: "1px solid #ddd", fontWeight: "bold" }}>이벤트 타입</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>React 이벤트 타입</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}><code>{`ChangeEvent<HTMLInputElement>`}</code></td>
          </tr>
          <tr>
            <td style={{ padding: "12px", border: "1px solid #ddd", fontWeight: "bold" }}>useState 타입</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>제네릭으로 지정</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}><code>{`useState<User | null>(null)`}</code></td>
          </tr>
          <tr>
            <td style={{ padding: "12px", border: "1px solid #ddd", fontWeight: "bold" }}>커스텀 훅</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>use로 시작하는 재사용 로직</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}><code>{`useCounter, useFetch`}</code></td>
          </tr>
        </tbody>
      </table>

      <div style={{
        backgroundColor: "#e8f5e9",
        padding: "20px",
        borderRadius: "8px",
        marginTop: "20px"
      }}>
        <h3>자주 만드는 커스텀 훅</h3>
        <ul>
          <li><strong>useToggle:</strong> boolean 상태 토글</li>
          <li><strong>useCounter:</strong> 숫자 카운터</li>
          <li><strong>useLocalStorage:</strong> localStorage 연동</li>
          <li><strong>useDebounce:</strong> 디바운스 처리</li>
          <li><strong>useFetch:</strong> API 호출 상태 관리</li>
          <li><strong>useForm:</strong> 폼 상태 및 유효성 검사</li>
        </ul>
      </div>
    </div>
  );
}

// ========================================
// 메인 컴포넌트
// ========================================

export default function Study() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h1>Day 07: React TypeScript & 커스텀 훅</h1>
      <p style={{ fontSize: "18px", color: "#666", marginBottom: "30px" }}>
        React에서 TypeScript를 활용하고 재사용 가능한 커스텀 훅 만들기
      </p>

      <ReactTypeScriptIntro />
      <PropsTypingSection />
      <EventHandlerSection />
      <HooksTypingSection />
      <CustomHookDefinition />
      <UseCounterDemo />
      <UseLocalStorageDemo />
      <UseDebounceDemo />
      <SummaryTable />
    </div>
  );
}
