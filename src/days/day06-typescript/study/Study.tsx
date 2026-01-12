/**
 * ========================================
 * Day 06: TypeScript 기초
 * ========================================
 */

import { useState } from "react";

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
// 섹션 1: TypeScript란?
// ========================================

function TypeScriptDefinition() {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>1. TypeScript란?</h2>

      {/* 정의 박스 */}
      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>정의</h3>
        <p style={{ margin: 0 }}>
          <strong>TypeScript</strong>는 JavaScript에 정적 타입 시스템을 추가한 프로그래밍 언어입니다.
          Microsoft에서 개발했으며, JavaScript의 상위 집합(Superset)으로 모든 JavaScript 코드는
          유효한 TypeScript 코드입니다.
        </p>
      </div>

      {/* 왜 필요한지 */}
      <div style={{
        backgroundColor: "#fff3e0",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>왜 필요한가?</h3>
        <ul>
          <li><strong>컴파일 타임 에러 감지:</strong> 런타임 전에 타입 관련 버그를 발견</li>
          <li><strong>개발 경험 향상:</strong> 자동완성, 리팩토링, 코드 네비게이션</li>
          <li><strong>문서화 효과:</strong> 타입이 곧 문서 역할</li>
          <li><strong>대규모 프로젝트:</strong> 팀 협업 시 안정성 확보</li>
          <li><strong>유지보수성:</strong> 코드 변경 시 영향 범위 파악 용이</li>
        </ul>
      </div>

      {/* JavaScript vs TypeScript */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{
          backgroundColor: "#ffebee",
          padding: "15px",
          borderRadius: "8px"
        }}>
          <h4 style={{ color: "#c62828" }}>JavaScript</h4>
          <pre style={{ fontSize: "13px", overflow: "auto" }}>
{`// 런타임에서야 에러 발생
function add(a, b) {
  return a + b;
}

add("1", 2);  // "12" (문자열 연결!)
add(null, 5); // 5 (null이 0으로 변환)`}
          </pre>
        </div>
        <div style={{
          backgroundColor: "#e8f5e9",
          padding: "15px",
          borderRadius: "8px"
        }}>
          <h4 style={{ color: "#2e7d32" }}>TypeScript</h4>
          <pre style={{ fontSize: "13px", overflow: "auto" }}>
{`// 컴파일 시점에 에러 감지
function add(a: number, b: number): number {
  return a + b;
}

add("1", 2);  // 에러: string은 안됨
add(null, 5); // 에러: null은 안됨`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 섹션 2: 기본 타입 (Primitive Types)
// ========================================

function PrimitiveTypes() {
  // 타입 데모용 상태
  const [stringVal] = useState<string>("홍길동");
  const [numberVal] = useState<number>(25);
  const [booleanVal, setBooleanVal] = useState<boolean>(true);

  const primitiveCode = `// TypeScript 기본 타입 예제
const [stringVal] = useState<string>("홍길동");
const [numberVal] = useState<number>(25);
const [booleanVal, setBooleanVal] = useState<boolean>(true);

// 타입 추론 - TypeScript가 자동으로 타입을 추론
const inferredString = "추론된 문자열";  // string
const inferredNumber = 42;               // number
const inferredBoolean = false;           // boolean`;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>2. 기본 타입 (Primitive Types)</h2>

      {/* 정의 박스 */}
      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>기본 타입 종류</h3>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// 1. string - 문자열
let name: string = "홍길동";
let greeting: string = \`안녕하세요, \${name}님!\`;

// 2. number - 숫자 (정수, 실수 모두)
let age: number = 25;
let price: number = 99.99;
let hex: number = 0xff;

// 3. boolean - 참/거짓
let isActive: boolean = true;
let hasPermission: boolean = false;

// 4. null & undefined
let empty: null = null;
let notDefined: undefined = undefined;

// 5. symbol (고유 식별자)
let id: symbol = Symbol("id");

// 6. bigint (큰 정수)
let bigNumber: bigint = 9007199254740991n;`}
        </pre>
      </div>

      {/* 실시간 데모 */}
      <CodeDemo title="기본 타입 데모" code={primitiveCode}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
          <div style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "4px" }}>
            <strong>string</strong>
            <p style={{ margin: "5px 0", color: "#1976d2" }}>{stringVal}</p>
            <code style={{ fontSize: "12px", color: "#666" }}>typeof: "string"</code>
          </div>
          <div style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "4px" }}>
            <strong>number</strong>
            <p style={{ margin: "5px 0", color: "#1976d2" }}>{numberVal}</p>
            <code style={{ fontSize: "12px", color: "#666" }}>typeof: "number"</code>
          </div>
          <div style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "4px" }}>
            <strong>boolean</strong>
            <p style={{ margin: "5px 0", color: booleanVal ? "green" : "red" }}>
              {booleanVal.toString()}
            </p>
            <button
              onClick={() => setBooleanVal(!booleanVal)}
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                cursor: "pointer"
              }}
            >
              토글
            </button>
          </div>
        </div>
      </CodeDemo>

      {/* 타입 추론 설명 */}
      <div style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <h3>타입 추론 (Type Inference)</h3>
        <p>TypeScript는 초기값으로부터 타입을 자동으로 추론합니다.</p>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// 명시적 타입 선언
let count: number = 0;

// 타입 추론 (권장 - 간결함)
let count = 0;  // number로 추론됨

// 주의: 초기값 없이 선언하면 any
let value;      // any 타입 (권장하지 않음)
let value: number;  // 초기값 없이 타입 지정`}
        </pre>
      </div>
    </div>
  );
}

// ========================================
// 섹션 3: 배열과 튜플
// ========================================

function ArraysAndTuples() {
  const [numbers] = useState<number[]>([1, 2, 3, 4, 5]);
  const [tuple] = useState<[string, number, boolean]>(["Kim", 30, true]);

  const arrayTupleCode = `// 배열 타입 정의
const [numbers] = useState<number[]>([1, 2, 3, 4, 5]);

// 튜플 타입 정의 - 고정된 길이와 각 위치의 타입
const [tuple] = useState<[string, number, boolean]>(["Kim", 30, true]);

// 튜플 요소 접근
const name = tuple[0];    // string 타입
const age = tuple[1];     // number 타입
const isActive = tuple[2]; // boolean 타입`;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>3. 배열과 튜플</h2>

      {/* 배열 */}
      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>배열 (Array)</h3>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// 방법 1: 타입[]
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Kim", "Lee", "Park"];

// 방법 2: Array<타입> (제네릭 문법)
let scores: Array<number> = [100, 95, 88];
let users: Array<string> = ["user1", "user2"];

// 혼합 타입 배열 (유니온 타입)
let mixed: (string | number)[] = [1, "two", 3];

// 읽기 전용 배열
let readonlyArr: readonly number[] = [1, 2, 3];
// readonlyArr.push(4);  // 에러!`}
        </pre>
      </div>

      {/* 데모 */}
      <CodeDemo title="배열과 튜플 데모" code={arrayTupleCode}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "4px" }}>
            <strong>number[] 배열</strong>
            <p style={{ margin: "10px 0", fontFamily: "monospace" }}>
              [{numbers.join(", ")}]
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>
              합계: {numbers.reduce((a, b) => a + b, 0)}
            </p>
          </div>
          <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "4px" }}>
            <strong>[string, number, boolean] 튜플</strong>
            <div style={{ marginTop: "10px" }}>
              <p style={{ margin: "3px 0", fontSize: "14px" }}>
                <span style={{ color: "#666" }}>tuple[0]:</span> "{tuple[0]}" <span style={{ color: "#999" }}>(string)</span>
              </p>
              <p style={{ margin: "3px 0", fontSize: "14px" }}>
                <span style={{ color: "#666" }}>tuple[1]:</span> {tuple[1]} <span style={{ color: "#999" }}>(number)</span>
              </p>
              <p style={{ margin: "3px 0", fontSize: "14px" }}>
                <span style={{ color: "#666" }}>tuple[2]:</span> {tuple[2].toString()} <span style={{ color: "#999" }}>(boolean)</span>
              </p>
            </div>
          </div>
        </div>
      </CodeDemo>

      {/* 튜플 */}
      <div style={{
        backgroundColor: "#f3e5f5",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>튜플 (Tuple)</h3>
        <p>고정된 길이와 각 위치의 타입이 정해진 배열</p>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// 튜플 정의
let person: [string, number] = ["홍길동", 25];

// 각 요소 접근
let name = person[0];  // string
let age = person[1];   // number

// React의 useState도 튜플 반환!
const [count, setCount]: [number, (n: number) => void] = useState(0);

// 레이블 튜플 (가독성 향상)
type UserTuple = [name: string, age: number, isActive: boolean];
let user: UserTuple = ["Kim", 30, true];

// 선택적 요소
type Point = [number, number, number?];
let point2D: Point = [10, 20];
let point3D: Point = [10, 20, 30];`}
        </pre>
      </div>
    </div>
  );
}

// ========================================
// 섹션 4: 객체 타입과 Interface
// ========================================

// Interface 데모용 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

function ObjectAndInterface() {
  const [user] = useState<User>({
    id: 1,
    name: "홍길동",
    email: "hong@example.com",
    age: 25
  });

  const interfaceCode = `// Interface 정의
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // 선택적 속성
}

// Interface를 사용한 상태
const [user] = useState<User>({
  id: 1,
  name: "홍길동",
  email: "hong@example.com",
  age: 25
});

// user 객체는 User 인터페이스 구조를 따름
console.log(user.name);  // "홍길동"
console.log(user.age);   // 25 (선택적이지만 존재함)`;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>4. 객체 타입과 Interface</h2>

      {/* 정의 박스 */}
      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>Interface 정의</h3>
        <p>
          <strong>Interface</strong>는 객체의 구조(shape)를 정의하는 방법입니다.
          객체가 가져야 할 속성과 메서드의 타입을 명시합니다.
        </p>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// Interface 정의
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;           // 선택적 속성 (optional)
  readonly createdAt: Date; // 읽기 전용
}

// 사용
const user: User = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com",
  createdAt: new Date()
};

// user.createdAt = new Date();  // 에러! readonly`}
        </pre>
      </div>

      {/* Interface 데모 */}
      <CodeDemo title="Interface 사용 예제" code={interfaceCode}>
        <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "4px" }}>
          <h4 style={{ margin: "0 0 10px 0" }}>User 객체</h4>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {Object.entries(user).map(([key, value]) => (
                <tr key={key}>
                  <td style={{ padding: "8px", border: "1px solid #eee", fontWeight: "bold", width: "100px" }}>
                    {key}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #eee" }}>
                    {typeof value === "number" ? value : `"${value}"`}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #eee", color: "#666", fontSize: "12px" }}>
                    {typeof value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CodeDemo>

      {/* 인터페이스 확장 */}
      <div style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3>Interface 확장 (extends)</h3>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// 기본 인터페이스
interface Person {
  name: string;
  age: number;
}

// 확장
interface Employee extends Person {
  employeeId: string;
  department: string;
}

// 다중 확장
interface Manager extends Employee {
  teamSize: number;
  reports: Employee[];
}

const manager: Manager = {
  name: "김부장",
  age: 45,
  employeeId: "EMP001",
  department: "개발팀",
  teamSize: 10,
  reports: []
};`}
        </pre>
      </div>

      {/* 메서드 정의 */}
      <div style={{
        backgroundColor: "#e8f5e9",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <h3>Interface에 메서드 정의</h3>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`interface Calculator {
  // 메서드 문법
  add(a: number, b: number): number;

  // 속성 문법 (화살표 함수 스타일)
  subtract: (a: number, b: number) => number;
}

const calc: Calculator = {
  add(a, b) {
    return a + b;
  },
  subtract: (a, b) => a - b
};`}
        </pre>
      </div>
    </div>
  );
}

// ========================================
// 섹션 5: Type Alias
// ========================================

function TypeAlias() {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>5. Type Alias (타입 별칭)</h2>

      {/* 정의 박스 */}
      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>Type Alias 정의</h3>
        <p>
          <strong>Type Alias</strong>는 타입에 새로운 이름을 부여하는 방법입니다.
          기본 타입, 유니온, 튜플 등 모든 타입에 별칭을 줄 수 있습니다.
        </p>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// 기본 사용
type ID = number | string;
type Name = string;

// 객체 타입
type User = {
  id: ID;
  name: Name;
  email: string;
};

// 함수 타입
type GreetFunction = (name: string) => string;

// 유니온 타입
type Status = "pending" | "approved" | "rejected";

// 튜플 타입
type Coordinate = [number, number];`}
        </pre>
      </div>

      {/* Interface vs Type */}
      <div style={{
        backgroundColor: "#fff3e0",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3>Interface vs Type - 언제 무엇을 사용할까?</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#ffcc80" }}>
              <th style={{ padding: "10px", border: "1px solid #ffb74d" }}>특성</th>
              <th style={{ padding: "10px", border: "1px solid #ffb74d" }}>Interface</th>
              <th style={{ padding: "10px", border: "1px solid #ffb74d" }}>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ffe0b2" }}>객체 타입 정의</td>
              <td style={{ padding: "10px", border: "1px solid #ffe0b2" }}>O</td>
              <td style={{ padding: "10px", border: "1px solid #ffe0b2" }}>O</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ffe0b2" }}>확장 (extends)</td>
              <td style={{ padding: "10px", border: "1px solid #ffe0b2" }}>O (extends)</td>
              <td style={{ padding: "10px", border: "1px solid #ffe0b2" }}>O (&amp; 교차)</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ffe0b2" }}>선언 병합</td>
              <td style={{ padding: "10px", border: "1px solid #ffe0b2" }}>O</td>
              <td style={{ padding: "10px", border: "1px solid #ffe0b2" }}>X</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ffe0b2" }}>유니온/튜플</td>
              <td style={{ padding: "10px", border: "1px solid #ffe0b2" }}>X</td>
              <td style={{ padding: "10px", border: "1px solid #ffe0b2" }}>O</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ffe0b2" }}>기본 타입 별칭</td>
              <td style={{ padding: "10px", border: "1px solid #ffe0b2" }}>X</td>
              <td style={{ padding: "10px", border: "1px solid #ffe0b2" }}>O</td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginTop: "15px", fontStyle: "italic" }}>
          권장: 객체 타입은 Interface, 유니온/튜플/기본타입은 Type 사용
        </p>
      </div>

      {/* 예제 비교 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "8px"
        }}>
          <h4>Interface 확장</h4>
          <pre style={{ fontSize: "13px", overflow: "auto" }}>
{`interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// 선언 병합 (같은 이름으로 추가)
interface Dog {
  age: number;
}
// Dog는 name, breed, age 모두 가짐`}
          </pre>
        </div>
        <div style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "8px"
        }}>
          <h4>Type 확장</h4>
          <pre style={{ fontSize: "13px", overflow: "auto" }}>
{`type Animal = {
  name: string;
};

type Dog = Animal & {
  breed: string;
};

// 선언 병합 불가!
// type Dog = { age: number }; // 에러

// 유니온은 Type만 가능
type Pet = Dog | Cat;`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 섹션 6: 유니온 타입과 리터럴 타입
// ========================================

type Status = "idle" | "loading" | "success" | "error";

function UnionAndLiteral() {
  const [status, setStatus] = useState<Status>("idle");

  const unionLiteralCode = `// 리터럴 타입으로 상태 정의
type Status = "idle" | "loading" | "success" | "error";

// useState에 타입 지정
const [status, setStatus] = useState<Status>("idle");

// 상태 변경 - 정의된 값만 허용
setStatus("loading");  // OK
setStatus("success");  // OK
// setStatus("unknown"); // 컴파일 에러!

// 상태에 따른 조건부 스타일링
const color = status === "error" ? "red" :
              status === "success" ? "green" :
              status === "loading" ? "blue" : "gray";`;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>6. 유니온 타입과 리터럴 타입</h2>

      {/* 유니온 타입 */}
      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>유니온 타입 (Union Type)</h3>
        <p>
          여러 타입 중 하나가 될 수 있는 값을 표현합니다. <code>|</code> 연산자로 연결합니다.
        </p>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// 기본 유니온
type ID = number | string;
let userId: ID = 123;
userId = "abc123";  // OK

// 타입 좁히기 (Type Narrowing)
function printId(id: ID) {
  if (typeof id === "string") {
    // 여기서 id는 string
    console.log(id.toUpperCase());
  } else {
    // 여기서 id는 number
    console.log(id.toFixed(2));
  }
}

// 배열 유니온
type StringOrNumberArray = string[] | number[];
type MixedArray = (string | number)[];`}
        </pre>
      </div>

      {/* 리터럴 타입 */}
      <div style={{
        backgroundColor: "#f3e5f5",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>리터럴 타입 (Literal Type)</h3>
        <p>
          특정 값만 허용하는 타입입니다. 문자열, 숫자, 불리언 리터럴을 사용할 수 있습니다.
        </p>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// 문자열 리터럴 타입
type Direction = "up" | "down" | "left" | "right";
let move: Direction = "up";
// move = "diagonal";  // 에러!

// 숫자 리터럴 타입
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 3;

// 상태 관리에 유용
type Status = "idle" | "loading" | "success" | "error";

// HTTP 메서드
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";`}
        </pre>
      </div>

      {/* 실시간 데모 */}
      <CodeDemo title="리터럴 타입으로 상태 관리" code={unionLiteralCode}>
        <p>현재 상태: <strong style={{
          color: status === "error" ? "red" :
                 status === "success" ? "green" :
                 status === "loading" ? "blue" : "gray"
        }}>{status}</strong></p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
          {(["idle", "loading", "success", "error"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              style={{
                padding: "8px 16px",
                backgroundColor: status === s ? "#1976d2" : "#e0e0e0",
                color: status === s ? "white" : "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
          타입 시스템이 4가지 상태만 허용합니다. 다른 값은 컴파일 에러!
        </p>
      </CodeDemo>
    </div>
  );
}

// ========================================
// 섹션 7: 함수 타입
// ========================================

function FunctionTypes() {
  // 함수 타입 데모
  const [result, setResult] = useState<number>(0);
  const [a, setA] = useState<number>(10);
  const [b, setB] = useState<number>(5);

  type MathOperation = (a: number, b: number) => number;

  const add: MathOperation = (a, b) => a + b;
  const subtract: MathOperation = (a, b) => a - b;
  const multiply: MathOperation = (a, b) => a * b;
  const divide: MathOperation = (a, b) => a / b;

  const functionTypeCode = `// 함수 타입 별칭 정의
type MathOperation = (a: number, b: number) => number;

// 같은 타입으로 여러 함수 구현
const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
const multiply: MathOperation = (a, b) => a * b;
const divide: MathOperation = (a, b) => a / b;

// 사용
const result = add(10, 5);      // 15
const result2 = multiply(3, 4); // 12`;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>7. 함수 타입</h2>

      {/* 정의 박스 */}
      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>함수 타입 정의</h3>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// 1. 함수 선언문
function add(a: number, b: number): number {
  return a + b;
}

// 2. 화살표 함수
const multiply = (a: number, b: number): number => a * b;

// 3. 함수 타입 별칭
type MathOperation = (a: number, b: number) => number;
const divide: MathOperation = (a, b) => a / b;

// 4. 선택적 매개변수
function greet(name: string, greeting?: string): string {
  return \`\${greeting || "Hello"}, \${name}!\`;
}

// 5. 기본값 매개변수
function greet2(name: string, greeting: string = "Hello"): string {
  return \`\${greeting}, \${name}!\`;
}

// 6. 나머지 매개변수
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}`}
        </pre>
      </div>

      {/* 함수 타입 데모 */}
      <CodeDemo title="함수 타입 데모 - 계산기" code={functionTypeCode}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "15px", flexWrap: "wrap" }}>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            style={{ width: "60px", padding: "8px", textAlign: "center" }}
          />
          <span style={{ fontSize: "14px", color: "#666" }}>연산</span>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            style={{ width: "60px", padding: "8px", textAlign: "center" }}
          />
          <span style={{ fontSize: "14px", color: "#666" }}>=</span>
          <strong style={{ fontSize: "18px", minWidth: "50px" }}>{result}</strong>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={() => setResult(add(a, b))} style={{ padding: "8px 16px", cursor: "pointer" }}>
            + (add)
          </button>
          <button onClick={() => setResult(subtract(a, b))} style={{ padding: "8px 16px", cursor: "pointer" }}>
            - (subtract)
          </button>
          <button onClick={() => setResult(multiply(a, b))} style={{ padding: "8px 16px", cursor: "pointer" }}>
            × (multiply)
          </button>
          <button onClick={() => setResult(divide(a, b))} style={{ padding: "8px 16px", cursor: "pointer" }}>
            ÷ (divide)
          </button>
        </div>
      </CodeDemo>

      {/* 콜백 함수 타입 */}
      <div style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3>콜백 함수 타입</h3>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// 콜백 함수를 받는 함수
function fetchData(
  url: string,
  onSuccess: (data: string) => void,
  onError: (error: Error) => void
): void {
  // ...
}

// void vs undefined
type VoidFn = () => void;
type UndefinedFn = () => undefined;

const fn1: VoidFn = () => {};           // OK
const fn2: VoidFn = () => { return; };  // OK
const fn3: VoidFn = () => undefined;    // OK (void는 반환값 무시)

// never - 절대 반환하지 않는 함수
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}`}
        </pre>
      </div>

      {/* 오버로드 */}
      <div style={{
        backgroundColor: "#e8f5e9",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <h3>함수 오버로드 (Function Overload)</h3>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// 오버로드 시그니처 (여러 개 가능)
function format(value: string): string;
function format(value: number): string;
function format(value: Date): string;

// 구현부 (하나만)
function format(value: string | number | Date): string {
  if (typeof value === "string") {
    return value.trim();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return value.toISOString();
  }
}

format("hello");    // OK
format(123.456);    // OK
format(new Date()); // OK`}
        </pre>
      </div>
    </div>
  );
}

// ========================================
// 섹션 8: 제네릭 기초
// ========================================

function GenericsBasics() {
  // 제네릭 데모
  const [items, setItems] = useState<string[]>(["Apple", "Banana", "Cherry"]);
  const [newItem, setNewItem] = useState("");

  // 제네릭 함수
  function addToArray<T>(arr: T[], item: T): T[] {
    return [...arr, item];
  }

  function firstItem<T>(arr: T[]): T | undefined {
    return arr[0];
  }

  const handleAdd = () => {
    if (newItem.trim()) {
      setItems(addToArray(items, newItem.trim()));
      setNewItem("");
    }
  };

  const genericCode = `// 제네릭 함수 정의
function addToArray<T>(arr: T[], item: T): T[] {
  return [...arr, item];
}

function firstItem<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 사용 - 타입이 자동으로 추론됨
const [items, setItems] = useState<string[]>(["Apple", "Banana", "Cherry"]);

// addToArray<string>으로 타입 추론
const newItems = addToArray(items, "Date"); // string[]

// firstItem<string>으로 타입 추론
const first = firstItem(items); // string | undefined`;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>8. 제네릭 (Generics) 기초</h2>

      {/* 정의 박스 */}
      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>제네릭이란?</h3>
        <p>
          <strong>제네릭</strong>은 타입을 매개변수처럼 사용하는 기능입니다.
          함수, 클래스, 인터페이스를 다양한 타입에서 재사용할 수 있게 합니다.
        </p>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// 제네릭 없이 - 타입마다 함수 필요
function identityNumber(value: number): number {
  return value;
}
function identityString(value: string): string {
  return value;
}

// 제네릭 사용 - 하나의 함수로 모든 타입 처리
function identity<T>(value: T): T {
  return value;
}

identity<number>(123);  // 명시적 타입 지정
identity("hello");      // 타입 추론 (string)`}
        </pre>
      </div>

      {/* 제네릭 데모 */}
      <CodeDemo title="제네릭 함수 데모" code={genericCode}>
        <div style={{ marginBottom: "15px" }}>
          <strong>현재 배열 (string[]):</strong>
          <p style={{ fontFamily: "monospace", margin: "5px 0" }}>
            [{items.map(i => `"${i}"`).join(", ")}]
          </p>
          <p style={{ fontSize: "12px", color: "#666" }}>
            firstItem 결과: "{firstItem(items)}"
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="새 아이템 입력"
            style={{ padding: "8px", flex: 1 }}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button
            onClick={handleAdd}
            style={{
              padding: "8px 16px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            추가 (addToArray)
          </button>
        </div>
      </CodeDemo>

      {/* 제네릭 예제 */}
      <div style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3>제네릭 활용 예제</h3>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// 1. 배열의 첫 번째 요소 반환
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
const num = first([1, 2, 3]);      // number | undefined
const str = first(["a", "b"]);     // string | undefined

// 2. 두 값 교환
function swap<T, U>(pair: [T, U]): [U, T] {
  return [pair[1], pair[0]];
}
const swapped = swap([1, "hello"]); // [string, number]

// 3. 제네릭 인터페이스
interface Box<T> {
  value: T;
  getValue: () => T;
}

const numberBox: Box<number> = {
  value: 123,
  getValue: () => 123
};

// 4. 제네릭 타입 별칭
type Result<T> = {
  success: boolean;
  data: T;
  error?: string;
};

const result: Result<string[]> = {
  success: true,
  data: ["a", "b", "c"]
};`}
        </pre>
      </div>

      {/* 제네릭 제약 */}
      <div style={{
        backgroundColor: "#fff3e0",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <h3>제네릭 제약 (Constraints)</h3>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`// extends로 제약 조건 추가
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(value: T): void {
  console.log(value.length);
}

logLength("hello");     // OK (string has length)
logLength([1, 2, 3]);   // OK (array has length)
// logLength(123);      // 에러! number는 length 없음

// keyof를 활용한 제약
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Kim", age: 30 };
getProperty(person, "name");  // OK
// getProperty(person, "job"); // 에러! 'job'은 없음`}
        </pre>
      </div>
    </div>
  );
}

// ========================================
// 섹션 9: 유틸리티 타입
// ========================================

function UtilityTypes() {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>9. 유틸리티 타입 (Utility Types)</h2>

      {/* 정의 박스 */}
      <div style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>자주 사용하는 유틸리티 타입</h3>
        <p>TypeScript가 제공하는 내장 유틸리티 타입으로 타입 변환을 쉽게 할 수 있습니다.</p>
      </div>

      {/* 유틸리티 타입 예제 */}
      <div style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <pre style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          overflow: "auto"
        }}>
{`interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// 1. Partial<T> - 모든 속성을 선택적으로
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; }

// 2. Required<T> - 모든 속성을 필수로
type RequiredUser = Required<PartialUser>;

// 3. Pick<T, K> - 특정 속성만 선택
type UserBasic = Pick<User, "id" | "name">;
// { id: number; name: string; }

// 4. Omit<T, K> - 특정 속성 제외
type UserWithoutId = Omit<User, "id">;
// { name: string; email: string; age: number; }

// 5. Readonly<T> - 모든 속성을 읽기 전용으로
type ReadonlyUser = Readonly<User>;

// 6. Record<K, T> - 키 타입과 값 타입으로 객체 생성
type UserRoles = Record<"admin" | "user" | "guest", User>;

// 7. ReturnType<T> - 함수의 반환 타입 추출
function getUser() {
  return { id: 1, name: "Kim" };
}
type GetUserReturn = ReturnType<typeof getUser>;
// { id: number; name: string; }

// 8. Parameters<T> - 함수의 매개변수 타입 추출
function createUser(name: string, age: number) { /* ... */ }
type CreateUserParams = Parameters<typeof createUser>;
// [name: string, age: number]`}
        </pre>
      </div>
    </div>
  );
}

// ========================================
// 섹션 10: 핵심 정리 표
// ========================================

function SummaryTable() {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>10. 핵심 정리</h2>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#fff"
      }}>
        <thead>
          <tr style={{ backgroundColor: "#1976d2", color: "white" }}>
            <th style={{ padding: "12px", border: "1px solid #1565c0" }}>개념</th>
            <th style={{ padding: "12px", border: "1px solid #1565c0" }}>설명</th>
            <th style={{ padding: "12px", border: "1px solid #1565c0" }}>예시</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "12px", border: "1px solid #ddd", fontWeight: "bold" }}>기본 타입</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>원시 타입 정의</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}><code>string, number, boolean</code></td>
          </tr>
          <tr>
            <td style={{ padding: "12px", border: "1px solid #ddd", fontWeight: "bold" }}>Interface</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>객체 구조 정의, 확장 가능</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}><code>{`interface User { name: string }`}</code></td>
          </tr>
          <tr>
            <td style={{ padding: "12px", border: "1px solid #ddd", fontWeight: "bold" }}>Type</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>타입 별칭, 유니온/튜플 지원</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}><code>{`type ID = string | number`}</code></td>
          </tr>
          <tr>
            <td style={{ padding: "12px", border: "1px solid #ddd", fontWeight: "bold" }}>유니온</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>여러 타입 중 하나</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}><code>{`"a" | "b" | "c"`}</code></td>
          </tr>
          <tr>
            <td style={{ padding: "12px", border: "1px solid #ddd", fontWeight: "bold" }}>제네릭</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>타입 매개변수화</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}><code>{`function fn<T>(x: T): T`}</code></td>
          </tr>
          <tr>
            <td style={{ padding: "12px", border: "1px solid #ddd", fontWeight: "bold" }}>유틸리티 타입</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>내장 타입 변환 도구</td>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}><code>{`Partial<T>, Pick<T, K>`}</code></td>
          </tr>
        </tbody>
      </table>

      {/* 주의사항 */}
      <div style={{
        backgroundColor: "#ffebee",
        padding: "20px",
        borderRadius: "8px",
        marginTop: "20px"
      }}>
        <h3 style={{ color: "#c62828" }}>TypeScript 사용 시 주의사항</h3>
        <ul>
          <li><strong>any 타입 남용 금지:</strong> 타입 검사를 무력화시킵니다.</li>
          <li><strong>as 타입 단언 주의:</strong> 실제 타입과 다르면 런타임 에러 발생 가능.</li>
          <li><strong>! (non-null assertion) 주의:</strong> null/undefined가 아님을 보장해야 함.</li>
          <li><strong>strict 모드 사용 권장:</strong> tsconfig.json에서 strict: true 설정.</li>
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
      <h1>Day 06: TypeScript 기초</h1>
      <p style={{ fontSize: "18px", color: "#666", marginBottom: "30px" }}>
        정적 타입 시스템으로 더 안전하고 생산적인 JavaScript 개발
      </p>

      <TypeScriptDefinition />
      <PrimitiveTypes />
      <ArraysAndTuples />
      <ObjectAndInterface />
      <TypeAlias />
      <UnionAndLiteral />
      <FunctionTypes />
      <GenericsBasics />
      <UtilityTypes />
      <SummaryTable />
    </div>
  );
}
