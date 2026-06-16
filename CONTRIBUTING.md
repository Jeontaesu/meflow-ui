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
