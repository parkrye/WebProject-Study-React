# Day 06: TypeScript 기초

## 학습 목표
- TypeScript의 정의와 필요성 이해
- 기본 타입 (Primitive Types) 사용하기
- 배열, 튜플, 객체 타입 정의하기
- Interface와 Type Alias 구분하기
- 유니온 타입과 리터럴 타입 활용하기
- 함수 타입과 제네릭 기초

---

## 1. TypeScript란?

### 정의
**TypeScript**는 JavaScript에 정적 타입 시스템을 추가한 프로그래밍 언어입니다. Microsoft에서 개발했으며, JavaScript의 상위 집합(Superset)으로 모든 JavaScript 코드는 유효한 TypeScript 코드입니다.

### 왜 필요한가?
- **컴파일 타임 에러 감지:** 런타임 전에 타입 관련 버그를 발견
- **개발 경험 향상:** 자동완성, 리팩토링, 코드 네비게이션
- **문서화 효과:** 타입이 곧 문서 역할
- **대규모 프로젝트:** 팀 협업 시 안정성 확보
- **유지보수성:** 코드 변경 시 영향 범위 파악 용이

### JavaScript vs TypeScript

**JavaScript:**
```javascript
// 런타임에서야 에러 발생
function add(a, b) {
  return a + b;
}

add("1", 2);  // "12" (문자열 연결!)
add(null, 5); // 5 (null이 0으로 변환)
```

**TypeScript:**
```typescript
// 컴파일 시점에 에러 감지
function add(a: number, b: number): number {
  return a + b;
}

add("1", 2);  // 에러: string은 안됨
add(null, 5); // 에러: null은 안됨
```

---

## 2. 기본 타입 (Primitive Types)

```typescript
// 1. string - 문자열
let name: string = "홍길동";
let greeting: string = `안녕하세요, ${name}님!`;

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
let bigNumber: bigint = 9007199254740991n;
```

### 타입 추론 (Type Inference)

TypeScript는 초기값으로부터 타입을 자동으로 추론합니다.

```typescript
// 명시적 타입 선언
let count: number = 0;

// 타입 추론 (권장 - 간결함)
let count = 0;  // number로 추론됨

// 주의: 초기값 없이 선언하면 any
let value;      // any 타입 (권장하지 않음)
let value: number;  // 초기값 없이 타입 지정
```

---

## 3. 배열과 튜플

### 배열 (Array)

```typescript
// 방법 1: 타입[]
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Kim", "Lee", "Park"];

// 방법 2: Array<타입> (제네릭 문법)
let scores: Array<number> = [100, 95, 88];
let users: Array<string> = ["user1", "user2"];

// 혼합 타입 배열 (유니온 타입)
let mixed: (string | number)[] = [1, "two", 3];

// 읽기 전용 배열
let readonlyArr: readonly number[] = [1, 2, 3];
// readonlyArr.push(4);  // 에러!
```

### 튜플 (Tuple)

고정된 길이와 각 위치의 타입이 정해진 배열

```typescript
// 튜플 정의
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
let point3D: Point = [10, 20, 30];
```

---

## 4. 객체 타입과 Interface

### Interface 정의

**Interface**는 객체의 구조(shape)를 정의하는 방법입니다. 객체가 가져야 할 속성과 메서드의 타입을 명시합니다.

```typescript
// Interface 정의
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

// user.createdAt = new Date();  // 에러! readonly
```

### Interface 확장 (extends)

```typescript
// 기본 인터페이스
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
};
```

### Interface에 메서드 정의

```typescript
interface Calculator {
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
};
```

---

## 5. Type Alias (타입 별칭)

**Type Alias**는 타입에 새로운 이름을 부여하는 방법입니다. 기본 타입, 유니온, 튜플 등 모든 타입에 별칭을 줄 수 있습니다.

```typescript
// 기본 사용
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
type Coordinate = [number, number];
```

### Interface vs Type - 언제 무엇을 사용할까?

| 특성 | Interface | Type |
|------|-----------|------|
| 객체 타입 정의 | O | O |
| 확장 (extends) | O (extends) | O (& 교차) |
| 선언 병합 | O | X |
| 유니온/튜플 | X | O |
| 기본 타입 별칭 | X | O |

**권장:** 객체 타입은 Interface, 유니온/튜플/기본타입은 Type 사용

---

## 6. 유니온 타입과 리터럴 타입

### 유니온 타입 (Union Type)

여러 타입 중 하나가 될 수 있는 값을 표현합니다. `|` 연산자로 연결합니다.

```typescript
// 기본 유니온
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
type MixedArray = (string | number)[];
```

### 리터럴 타입 (Literal Type)

특정 값만 허용하는 타입입니다.

```typescript
// 문자열 리터럴 타입
type Direction = "up" | "down" | "left" | "right";
let move: Direction = "up";
// move = "diagonal";  // 에러!

// 숫자 리터럴 타입
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 3;

// 상태 관리에 유용
type Status = "idle" | "loading" | "success" | "error";

// HTTP 메서드
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
```

---

## 7. 함수 타입

```typescript
// 1. 함수 선언문
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
  return `${greeting || "Hello"}, ${name}!`;
}

// 5. 기본값 매개변수
function greet2(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

// 6. 나머지 매개변수
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
```

### 콜백 함수 타입

```typescript
// 콜백 함수를 받는 함수
function fetchData(
  url: string,
  onSuccess: (data: string) => void,
  onError: (error: Error) => void
): void {
  // ...
}

// void vs undefined
type VoidFn = () => void;
const fn1: VoidFn = () => {};           // OK
const fn2: VoidFn = () => { return; };  // OK
const fn3: VoidFn = () => undefined;    // OK (void는 반환값 무시)

// never - 절대 반환하지 않는 함수
function throwError(message: string): never {
  throw new Error(message);
}
```

---

## 8. 제네릭 (Generics) 기초

**제네릭**은 타입을 매개변수처럼 사용하는 기능입니다. 함수, 클래스, 인터페이스를 다양한 타입에서 재사용할 수 있게 합니다.

```typescript
// 제네릭 없이 - 타입마다 함수 필요
function identityNumber(value: number): number {
  return value;
}

// 제네릭 사용 - 하나의 함수로 모든 타입 처리
function identity<T>(value: T): T {
  return value;
}

identity<number>(123);  // 명시적 타입 지정
identity("hello");      // 타입 추론 (string)
```

### 제네릭 활용 예제

```typescript
// 1. 배열의 첫 번째 요소 반환
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 2. 두 값 교환
function swap<T, U>(pair: [T, U]): [U, T] {
  return [pair[1], pair[0]];
}

// 3. 제네릭 인터페이스
interface Box<T> {
  value: T;
  getValue: () => T;
}

// 4. 제네릭 타입 별칭
type Result<T> = {
  success: boolean;
  data: T;
  error?: string;
};
```

### 제네릭 제약 (Constraints)

```typescript
// extends로 제약 조건 추가
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(value: T): void {
  console.log(value.length);
}

logLength("hello");     // OK (string has length)
logLength([1, 2, 3]);   // OK (array has length)
// logLength(123);      // 에러! number는 length 없음
```

---

## 9. 유틸리티 타입 (Utility Types)

TypeScript가 제공하는 내장 유틸리티 타입으로 타입 변환을 쉽게 할 수 있습니다.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// 1. Partial<T> - 모든 속성을 선택적으로
type PartialUser = Partial<User>;

// 2. Required<T> - 모든 속성을 필수로
type RequiredUser = Required<PartialUser>;

// 3. Pick<T, K> - 특정 속성만 선택
type UserBasic = Pick<User, "id" | "name">;

// 4. Omit<T, K> - 특정 속성 제외
type UserWithoutId = Omit<User, "id">;

// 5. Readonly<T> - 모든 속성을 읽기 전용으로
type ReadonlyUser = Readonly<User>;

// 6. Record<K, T> - 키 타입과 값 타입으로 객체 생성
type UserRoles = Record<"admin" | "user" | "guest", User>;

// 7. ReturnType<T> - 함수의 반환 타입 추출
function getUser() {
  return { id: 1, name: "Kim" };
}
type GetUserReturn = ReturnType<typeof getUser>;

// 8. Parameters<T> - 함수의 매개변수 타입 추출
function createUser(name: string, age: number) { /* ... */ }
type CreateUserParams = Parameters<typeof createUser>;
```

---

## 핵심 정리

| 개념 | 설명 | 예시 |
|------|------|------|
| **기본 타입** | 원시 타입 정의 | `string, number, boolean` |
| **Interface** | 객체 구조 정의, 확장 가능 | `interface User { name: string }` |
| **Type** | 타입 별칭, 유니온/튜플 지원 | `type ID = string \| number` |
| **유니온** | 여러 타입 중 하나 | `"a" \| "b" \| "c"` |
| **제네릭** | 타입 매개변수화 | `function fn<T>(x: T): T` |
| **유틸리티 타입** | 내장 타입 변환 도구 | `Partial<T>, Pick<T, K>` |

### TypeScript 사용 시 주의사항

- **any 타입 남용 금지:** 타입 검사를 무력화시킵니다.
- **as 타입 단언 주의:** 실제 타입과 다르면 런타임 에러 발생 가능.
- **! (non-null assertion) 주의:** null/undefined가 아님을 보장해야 함.
- **strict 모드 사용 권장:** tsconfig.json에서 strict: true 설정.

---

## 실습 (Practice)

### 실습 목표
TypeScript 타입 시스템을 실습합니다.

### TODO 리스트
1. 기본 타입을 활용한 변수 선언
2. Interface로 객체 타입 정의하기
3. 유니온 타입과 타입 좁히기 연습
4. 제네릭 함수 작성하기

---

## 숙제 (Homework)

### 과제: TypeScript 타입 정의

#### 요구사항
1. 사용자 정보를 나타내는 `User` 인터페이스 정의
2. 상태를 나타내는 리터럴 타입 정의
3. 제네릭을 활용한 API 응답 타입 정의
4. 유틸리티 타입을 활용한 파생 타입 만들기
