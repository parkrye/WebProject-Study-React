# Day 01: React 기초 & JSX

## 학습 목표
- React의 정의와 핵심 특징 이해
- JSX 문법과 규칙 학습
- 중괄호를 사용한 JavaScript 표현식 활용

---

## 1. React란?

### 정의
**React**는 Facebook(현 Meta)이 개발한 **사용자 인터페이스(UI)를 만들기 위한 JavaScript 라이브러리**입니다. 2013년에 오픈소스로 공개되었으며, 현재 가장 인기 있는 프론트엔드 기술 중 하나입니다.

### React의 3가지 핵심 특징

#### 1) 컴포넌트 기반 (Component-Based)

**컴포넌트란?** UI를 구성하는 독립적이고 재사용 가능한 코드 조각입니다. 레고 블록처럼 작은 컴포넌트들을 조합해서 복잡한 UI를 만듭니다.

```jsx
// 예시: 버튼 컴포넌트
function Button() {
  return <button>클릭하세요</button>;
}

// 예시: 카드 컴포넌트 (버튼 컴포넌트를 포함)
function Card() {
  return (
    <div>
      <h3>제목</h3>
      <p>내용</p>
      <Button />  {/* 버튼 컴포넌트 재사용 */}
    </div>
  );
}
```

**장점:** 한 번 만든 컴포넌트를 여러 곳에서 재사용할 수 있고, 각 컴포넌트를 독립적으로 개발/테스트할 수 있습니다.

#### 2) 선언적 (Declarative)

**선언적이란?** "어떻게(How)" 보다 "무엇을(What)" 보여줄지 작성하는 방식입니다.

**명령적 (Vanilla JS):**
```javascript
// "어떻게" 업데이트할지 직접 명령
const div = document.createElement('div');
div.id = 'counter';
div.innerText = '0';
document.body.appendChild(div);

function increment() {
  const el = document.getElementById('counter');
  el.innerText = parseInt(el.innerText) + 1;
}
```

**선언적 (React):**
```jsx
// "무엇을" 보여줄지만 선언
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>
        증가
      </button>
    </div>
  );
}
```

**장점:** 코드가 더 읽기 쉽고, 상태(count)가 바뀌면 React가 알아서 화면을 업데이트합니다.

#### 3) Virtual DOM (가상 DOM)

**DOM이란?**
- **DOM (Document Object Model)**: 브라우저가 HTML을 읽고 만드는 트리 구조의 객체
- JavaScript로 DOM을 조작하면 화면이 바뀜

**DOM 조작의 문제점:**
- DOM을 직접 조작하는 것은 비용이 큰 작업
- DOM이 바뀔 때마다 브라우저는 레이아웃을 다시 계산 (Reflow)
- 화면을 다시 그림 (Repaint)

**Virtual DOM의 해결책:**

Virtual DOM은 실제 DOM의 가벼운 복사본(JavaScript 객체)입니다. React는 다음 과정을 거칩니다:

1. **상태 변경 감지:** 데이터가 바뀌면 새로운 Virtual DOM을 생성
2. **비교 (Diffing):** 이전 Virtual DOM과 새 Virtual DOM을 비교해서 변경된 부분만 찾음
3. **일괄 업데이트 (Batch Update):** 변경된 부분만 실제 DOM에 한 번에 적용

```javascript
// Virtual DOM 동작 과정 (개념적 설명)

// 1. 현재 Virtual DOM
{
  type: 'div',
  children: [
    { type: 'h1', children: '제목' },
    { type: 'p', children: '내용' }  // ← 이 부분이 바뀜
  ]
}

// 2. 새로운 Virtual DOM (p 내용 변경)
{
  type: 'div',
  children: [
    { type: 'h1', children: '제목' },
    { type: 'p', children: '새로운 내용' }  // ← 변경됨
  ]
}

// 3. React가 두 Virtual DOM을 비교 (Diffing)
// → "p 태그의 텍스트만 바뀌었네!"

// 4. 실제 DOM에는 p 태그의 텍스트만 업데이트
// → div나 h1은 건드리지 않음 (최소한의 조작)
```

**Virtual DOM의 장점:**
- **성능 최적화:** 변경된 부분만 실제 DOM에 반영하여 불필요한 리렌더링 방지
- **배치 처리:** 여러 변경사항을 모아서 한 번에 처리
- **개발 편의성:** 개발자는 DOM 조작을 신경 쓰지 않고 상태 관리에만 집중

---

## 2. JSX란?

### 정의
**JSX (JavaScript XML)** 는 JavaScript 코드 안에서 HTML과 유사한 마크업을 작성할 수 있게 해주는 **문법 확장(Syntax Extension)** 입니다.

JSX는 브라우저가 직접 이해할 수 없으므로, Babel 같은 트랜스파일러가 순수 JavaScript로 변환합니다.

### JSX가 JavaScript로 변환되는 과정

**우리가 작성하는 JSX:**
```jsx
const element = (
  <div className="greeting">
    <h1>안녕하세요!</h1>
    <p>React를 배워봅시다.</p>
  </div>
);
```

**Babel이 변환한 JavaScript:**
```javascript
const element = React.createElement(
  'div',
  { className: 'greeting' },
  React.createElement('h1', null, '안녕하세요!'),
  React.createElement('p', null, 'React를 배워봅시다.')
);
```

→ JSX 덕분에 React.createElement를 직접 호출하지 않고도 직관적으로 UI를 작성할 수 있습니다.

---

## 3. JSX 필수 규칙

### 규칙 1: 반드시 하나의 루트 요소로 감싸야 한다

**이유:** JSX는 하나의 React.createElement() 호출로 변환되므로, 하나의 부모 요소가 필요합니다.

```jsx
// ❌ 잘못된 예:
return (
  <h1>제목</h1>
  <p>내용</p>
);
// Error: JSX expressions must have one parent element

// ✅ 올바른 예 (div로 감싸기):
return (
  <div>
    <h1>제목</h1>
    <p>내용</p>
  </div>
);

// ✅ 올바른 예 (Fragment 사용):
return (
  <>
    <h1>제목</h1>
    <p>내용</p>
  </>
);
```

**Fragment란?** `<></>` 또는 `<React.Fragment>`는 실제 DOM에 렌더링되지 않는 투명한 래퍼입니다. 불필요한 div를 추가하고 싶지 않을 때 사용합니다.

### 규칙 2: 모든 태그는 반드시 닫아야 한다

**이유:** JSX는 XML 문법을 따르므로, 모든 태그가 닫혀야 합니다.

```jsx
// ❌ HTML에서는 되지만 JSX에서는 안됨:
<img src="photo.jpg">
<input type="text">
<br>

// ✅ JSX에서는 self-closing 필수:
<img src="photo.jpg" />
<input type="text" />
<br />
```

### 규칙 3: HTML 속성명이 camelCase로 바뀐다

**이유:** class, for 등은 JavaScript 예약어이므로 다른 이름을 사용합니다.

| HTML | JSX | 이유 |
|------|-----|------|
| class | **className** | class는 JS 예약어 |
| for | **htmlFor** | for는 JS 예약어 |
| onclick | **onClick** | camelCase 규칙 |
| tabindex | **tabIndex** | camelCase 규칙 |

---

## 4. 중괄호 {} 사용하기

JSX 안에서 JavaScript 표현식을 사용하려면 **중괄호 {}** 로 감쌉니다. 중괄호 안에는 어떤 JavaScript 표현식이든 넣을 수 있습니다.

### 4-1. 변수 출력하기
```jsx
const name = "React";
const version = 19;
const isAwesome = true;

return (
  <div>
    <p>라이브러리 이름: {name}</p>
    <p>버전: {version}</p>
    <p>멋진가요? {isAwesome ? "네!" : "아니요"}</p>
  </div>
);
```

### 4-2. 계산식 사용하기
```jsx
return (
  <div>
    <p>1 + 2 + 3 = {1 + 2 + 3}</p>
    <p>직접 계산: {10 * 5}</p>
    <p>문자열 연결: {"Hello" + " " + "World"}</p>
  </div>
);
```

### 4-3. 함수 호출하기
```jsx
return (
  <div>
    <p>오늘 날짜: {new Date().toLocaleDateString('ko-KR')}</p>
    <p>대문자로: {"react".toUpperCase()}</p>
    <p>배열 길이: {[1, 2, 3, 4, 5].length}개</p>
  </div>
);
```

### 4-4. 인라인 스타일 적용하기
```jsx
// style 속성은 객체로 전달
// CSS 속성명은 camelCase로 작성
// font-size → fontSize
// background-color → backgroundColor

return (
  <div>
    <p style={{ color: 'blue', fontSize: '18px' }}>
      파란색 글씨입니다
    </p>
    <p style={{ backgroundColor: 'yellow', padding: '10px' }}>
      노란 배경입니다
    </p>
  </div>
);

// 이중 중괄호 설명:
// 바깥 {} → JSX 표현식
// 안쪽 {} → JavaScript 객체
```

### 4-5. 동적 스타일 변경
```jsx
const [textColor, setTextColor] = useState("blue");
const [bgColor, setBgColor] = useState("lightyellow");

return (
  <div>
    <div>
      <button onClick={() => setTextColor("blue")}>파랑</button>
      <button onClick={() => setTextColor("red")}>빨강</button>
    </div>
    <p style={{ color: textColor, backgroundColor: bgColor }}>
      이 텍스트의 스타일이 동적으로 변합니다!
    </p>
  </div>
);
```

### 주의: 중괄호 안에 넣을 수 없는 것
- **객체 자체:** `{name: 'React'}`는 직접 렌더링 불가 → 객체의 특정 속성을 접근해야 함
- **if문:** `{if (true) { ... }}`는 불가 → 삼항연산자 사용
- **for문:** `{for (...) { }}`는 불가 → map() 사용

**규칙:** 중괄호 안에는 **값을 반환하는 표현식**만 가능합니다.

---

## 핵심 정리

| 개념 | 설명 |
|------|------|
| **React** | UI를 만드는 JavaScript 라이브러리. 컴포넌트 기반, 선언적, Virtual DOM 특징 |
| **Virtual DOM** | 실제 DOM의 가벼운 복사본. 변경사항을 비교(Diffing)해서 필요한 부분만 실제 DOM에 반영 |
| **JSX** | JavaScript 안에서 HTML처럼 작성하는 문법. React.createElement()로 변환됨 |
| **JSX 규칙** | 1) 하나의 루트 요소 2) 태그 닫기 필수 3) className, htmlFor 등 camelCase |
| **중괄호 {}** | JSX 안에서 JavaScript 표현식 사용. 변수, 계산식, 함수 호출 등 가능 |

---

## 실습 (Practice)

### 실습 목표
아래 지시사항을 따라 JSX 코드를 완성하세요.

### TODO 리스트

1. **변수 선언하기**
   - `myName`: 본인 이름 (문자열)
   - `age`: 본인 나이 (숫자)
   - `hobby`: 취미 (문자열)
   - `favoriteColor`: 좋아하는 색상 (예: "purple", "#3498db")

2. **자기소개 카드 만들기**
   - 이름, 나이, 취미를 출력
   - 좋아하는 색상으로 스타일된 텍스트 만들기
   - 힌트: `style={{ color: favoriteColor }}`

3. **간단한 계산기**
   - 두 숫자를 더하고, 빼고, 곱한 결과를 표시
   ```jsx
   <p>10 + 5 = {10 + 5}</p>
   <p>10 - 5 = {10 - 5}</p>
   <p>10 × 5 = {10 * 5}</p>
   ```

4. **현재 시간 표시하기**
   - 힌트: `new Date().toLocaleTimeString('ko-KR')`

---

## 숙제 (Homework)

### 과제: 프로필 카드 만들기

#### 요구사항

1. **프로필 정보를 변수로 선언하세요:**
   - 이름, 직업, 이메일, 자기소개 한 줄

2. **프로필 카드 UI를 만드세요:**
   - 카드 형태의 레이아웃 (border, padding, borderRadius 사용)
   - 이름은 큰 글씨로
   - 직업은 색상을 다르게
   - 이메일은 작은 글씨로

3. **추가 도전:**
   - 현재 연도와 태어난 연도를 이용해 나이 계산하기
   - 여러 개의 스킬을 가진 배열 만들고 표시하기 (배열.join(', ')을 사용)

#### 힌트
- 스타일은 `style={{ }}` 형태로 작성
- 여러 스타일: `style={{ color: 'blue', fontSize: '20px' }}`
