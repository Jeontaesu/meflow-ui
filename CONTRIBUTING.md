# 컴포넌트 추가 가이드

새 컴포넌트를 만들 때 따르는 패턴을 설명합니다.
기존 컴포넌트들이 모두 이 패턴을 따르므로, 참고하면서 읽으세요.

---

## 디렉터리 구조

컴포넌트 하나당 폴더 하나. 폴더 안에 항상 세 파일.

```
src/components/컴포넌트명/
  ├── 컴포넌트명.tsx        # 실제 컴포넌트
  ├── index.ts             # re-export (진입점)
  └── 컴포넌트명.stories.tsx # Storybook 스토리
```

---

## 핵심 개념 세 가지

### 1. cva — 변형(variant) 관리

`class-variance-authority`의 `cva`는 "이 컴포넌트가 어떤 모양들을 가질 수 있는가"를 정의합니다.

```ts
const buttonVariants = cva(
  // 1) 항상 적용되는 기본 클래스
  'inline-flex items-center rounded-md font-medium transition-colors',
  {
    variants: {
      // 2) 선택 가능한 변형들
      variant: {
        primary:  'bg-primary text-white',
        outline:  'border border-gray-300 bg-white',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
      },
    },
    // 3) 아무것도 안 넘기면 이게 기본값
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

// 사용: buttonVariants({ variant: 'outline', size: 'sm' })
// → 기본 클래스 + 'border border-gray-300 bg-white' + 'h-8 px-3 text-xs'
```

**언제 쓰나?** 같은 컴포넌트인데 모양이 여러 개일 때 (버튼 색상, 인풋 크기 등).
변형이 없고 단순하면 cva 없이 그냥 className 조합해도 됩니다 (Label처럼).

---

### 2. cn — 클래스 충돌 방지

`cn`은 `clsx`의 얇은 래퍼입니다. 조건부 클래스와 외부에서 넘어온 `className`을 안전하게 합칩니다.

```ts
// src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
export const cn = (...inputs: ClassValue[]) => clsx(inputs);
```

```tsx
// 사용 예
<input
  className={cn(
    inputVariants({ variant, size }), // cva 결과
    leftIcon && 'pl-9',               // 조건부 클래스
    className                          // 외부에서 override 가능하게
  )}
/>
```

**규칙:** 컴포넌트 props에 `className`을 항상 열어두세요. 그래야 사용자가 외부에서 스타일을 덧붙일 수 있습니다.

---

### 3. Radix UI — 접근성 처리

Radix UI는 키보드 내비게이션, ARIA 속성, 포커스 관리를 대신 처리해줍니다.
우리가 할 일은 **Radix primitive를 가져다 스타일만 입히는 것**입니다.

두 가지 패턴이 있습니다:

**패턴 A — Root를 그대로 re-export** (Checkbox, Dialog처럼 여러 부분으로 나뉘는 경우)
```tsx
// Radix primitive를 그대로 쓰고, 스타일이 필요한 부분만 래핑
export const Dialog = RadixDialog.Root;         // 그대로
export const DialogTrigger = RadixDialog.Trigger; // 그대로

// 스타일이 필요한 부분만 래핑
export const DialogContent = ({ className, children, ...props }) => (
  <RadixDialog.Portal>
    <RadixDialog.Content className={cn('rounded-lg bg-white ...', className)} {...props}>
      {children}
    </RadixDialog.Content>
  </RadixDialog.Portal>
);
```

**패턴 B — 전체를 하나의 컴포넌트로 캡슐화** (Select, Checkbox처럼 props로 제어하는 경우)
```tsx
export const Checkbox = ({ label, checked, onCheckedChange, disabled }) => (
  <div className="flex items-center gap-2">
    <RadixCheckbox.Root checked={checked} onCheckedChange={onCheckedChange}>
      <RadixCheckbox.Indicator>...</RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
    {label && <label>{label}</label>}
  </div>
);
```

---

## 단계별 실습: Badge 컴포넌트 만들기

Radix 없이 만드는 가장 간단한 예시입니다.

### Step 1 — 폴더와 파일 만들기

```
src/components/Badge/
  Badge.tsx
  index.ts
  Badge.stories.tsx
```

### Step 2 — Badge.tsx 작성

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-700',
        primary: 'bg-primary/10 text-primary',
        success: 'bg-success/10 text-success',
        danger:  'bg-danger/10 text-danger',
        warning: 'bg-warning/10 text-warning',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = ({ variant, className, ...props }: BadgeProps) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
);
```

### Step 3 — index.ts 작성

```ts
export * from './Badge';
```

### Step 4 — Badge.stories.tsx 작성

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'success', 'danger', 'warning'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: '기본' } };
export const Primary: Story = { args: { variant: 'primary', children: '신규' } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge>기본</Badge>
      <Badge variant="primary">신규</Badge>
      <Badge variant="success">완료</Badge>
      <Badge variant="danger">오류</Badge>
      <Badge variant="warning">주의</Badge>
    </div>
  ),
};
```

### Step 5 — components/index.ts에 추가

```ts
// src/components/index.ts
export * from './Badge'; // 추가
export * from './Button';
// ...
```

---

## 체크리스트

새 컴포넌트를 만들 때 확인하세요:

- [ ] `컴포넌트명.tsx` — `export const 컴포넌트명` 으로 named export
- [ ] `index.ts` — `export * from './컴포넌트명'`
- [ ] `컴포넌트명.stories.tsx` — `title: 'Components/컴포넌트명'`
- [ ] `src/components/index.ts` — export 추가 (알파벳 순 권장)
- [ ] props에 `className` 열어두기 (외부 override 가능하게)
- [ ] stories에 `AllVariants` 스토리 추가 (한눈에 비교 가능하게)

---

## Radix UI가 있는 컴포넌트를 추가할 때

1. [Radix UI 공식 문서](https://www.radix-ui.com/primitives)에서 해당 컴포넌트의 Anatomy 확인
2. 어떤 primitive를 그대로 쓸지, 어떤 것에 스타일을 입힐지 결정
3. `data-[state=*]` 속성으로 상태별 스타일 적용 (Radix가 자동으로 붙여줌)
   ```tsx
   // 예: 체크됐을 때 배경색 변경
   'data-[state=checked]:bg-primary'
   ```

---

## 테마 토큰 참고

`src/index.css`의 `@theme`에 정의된 값들이 Tailwind 클래스로 사용 가능합니다.

| CSS 변수 | Tailwind 클래스 |
|---|---|
| `--color-primary` | `bg-primary`, `text-primary`, `border-primary` |
| `--color-primary-hover` | `bg-primary-hover` |
| `--color-danger` | `bg-danger`, `text-danger` |
| `--color-success` | `bg-success`, `text-success` |
| `--color-warning` | `bg-warning`, `text-warning` |

---

네, 맞습니다. Radix UI는 기능을 제공하는 "원시(Primitive)" 라이브러리이기 때문에, 프로젝트의 디자인 시스템에 맞게 **직접 가공(Wrapping)**해서 사용하는 것이 일반적입니다.

현재 프로젝트의 `Dialog.tsx`를 보면 Radix UI의 컴포넌트들을 가져와서 다음과 같은 방식으로 가공하고 있습니다:

1.  **컴포넌트 분할:** `Root`, `Trigger`, `Content` 등을 각각 명시적인 이름으로 export (`Dialog`, `DialogTrigger`, `DialogContent` 등).
2.  **스타일 적용:** `cn()` 유틸리티를 사용해 공통 스타일(Tailwind)을 입히고 외부에서 `className`을 넘겨받을 수 있게 처리.
3.  **ForwardRef 사용:** DOM에 직접 접근할 수 있도록 `React.forwardRef` 적용 (애니메이션이나 포커스 제어에 필요).

보여주신 `Accordion` 예시를 프로젝트 스타일에 맞춰 가공한다면 아래와 같은 구조가 될 것입니다:

```tsx
// src/components/Accordion/Accordion.tsx 예시
import React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { cn } from '../../utils/cn';

export const Accordion = RadixAccordion.Root;

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(({ className, ...props }, ref) => (
  <RadixAccordion.Item
    ref={ref}
    className={cn('border-b border-gray-200', className)}
    {...props}
  />
));

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Header className="flex">
    <RadixAccordion.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
));

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </RadixAccordion.Content>
));
```

### 가공 시 고려할 점:
- **`classNames` 대신 `cn` 사용:** 프로젝트에 이미 `src/utils/cn.ts`가 있으므로 이를 사용하세요.
- **TypeScript 정의:** `React.forwardRef`와 함께 `React.ElementRef`, `React.ComponentPropsWithoutRef`를 사용하면 타입 안정성을 높일 수 있습니다.
- **애니메이션:** `tokens.css`나 Tailwind 설정에 Accordion용 애니메이션(`slideDown` 등)이 정의되어 있는지 확인이 필요할 수 있습니다.

---

Accordion 컴포넌트 작업을 완료했습니다! `Accordion.stories.tsx`를 완성했고, 부드러운 애니메이션을 위한 스타일 설정과 필요한 패키지 설치까지 모두 마쳤습니다.

이제 Storybook을 실행하시면 `Components/Accordion` 메뉴에서 확인하실 수 있습니다.

---

### 🚀 다른 컴포넌트 작업을 위한 가이드

직접 컴포넌트를 추가하실 때 다음의 **4단계 프로세스**를 따라하시면 됩니다.

#### 1. 패키지 설치 (필요한 경우)
Radix UI를 사용할 경우, 먼저 해당 컴포넌트를 설치해야 합니다.
```bash
# 예: Tabs 컴포넌트를 만든다면
npm install @radix-ui/react-tabs
```

#### 2. 폴더 구조 생성
`src/components` 하위에 컴포넌트 이름으로 폴더를 만들고 3개의 파일을 생성합니다.
- `ComponentName.tsx`: 메인 로직 및 스타일
- `ComponentName.stories.tsx`: 스토리북 설정
- `index.ts`: 폴더 외부로 내보내기 (`export * from './ComponentName'`)

#### 3. 컴포넌트 작성 패턴
우리 프로젝트는 **Tailwind CSS 4**와 **Radix UI**를 함께 사용합니다. `src/utils/cn.ts`를 활용해 클래스명을 조합하세요.

```tsx
// Example.tsx 예시
import * as RadixComponent from '@radix-ui/react-xxx';
import { cn } from '../../utils/cn';

export const Example = React.forwardRef(({ className, ...props }, ref) => (
  <RadixComponent.Root
    ref={ref}
    className={cn('기본-스타일', className)}
    {...props}
  />
));
```

#### 4. 스토리북 작성 패턴
사용자가 스토리북에서 속성을 조절해볼 수 있도록 `argTypes`를 정의해주는 것이 좋습니다.

```tsx
// Example.stories.tsx 예시
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Example } from './Example';

const meta = {
  title: 'Components/Example', // 스토리북 좌측 메뉴 경로
  component: Example,
  tags: ['autodocs'], // 자동 문서화 기능
} satisfies Meta<typeof Example>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // 기본 props 설정
  },
};
```

#### 5. 최종 Export
마지막으로 `src/components/index.ts`에 한 줄을 추가하여 외부 라이브러리처럼 사용할 수 있게 합니다.
```typescript
export * from './Example';
```

---

**추가 팁:**
- **애니메이션:** 방금 Accordion을 위해 `src/styles/base.css`에 `@keyframes`를 추가해두었습니다. 다른 컴포넌트에서도 비슷한 애니메이션이 필요하면 해당 파일에 정의해서 사용하세요.
- **아이콘:** `@radix-ui/react-icons`가 설치되어 있으니 UI에 필요한 아이콘은 여기서 가져다 쓰시면 편리합니다. (예: `ChevronDownIcon`, `PlusIcon` 등)

다음 작업 중에 막히는 부분이 있으면 언제든 말씀해주세요!