import fs from 'fs';

// 토큰 파일 로드
const tokens = JSON.parse(fs.readFileSync('tokens/design-token.json', 'utf8')).kiring;

// 컬러 변수 생성 함수
const createColorVariable = (prefix, category, name, value) => {
  // category와 name이 중복되는 경우 중복 제거
  const cleanedName = name.startsWith(category) ? `${category}-${name.split('-')[1]}` : `${category}-${name}`;
  return `--${prefix}-${cleanedName}: ${value};`;
};

// 폰트 변수 생성 함수
const createFontVariable = (prefix, name, value) => {
  return `--${prefix}-${name}: ${value};`;
};

// CSS 컴포넌트 생성 함수
const createComponent = (name) => `.${name} {
    font-family: var(--font-family-${name});
    font-size: var(--font-size-${name});
    font-weight: var(--font-weight-${name});
    line-height: var(--line-height-${name});
  }`;

// 타이포그래피 변수 생성 함수
const createTypographyVariables = (key, token) => {
  const { fontSize, fontWeight, lineHeight } = token.value;
  const fontSizeNum = fontSize.match(/\d+/)[0];
  const fontWeightNum = fontWeight.match(/\d+/)[0];
  const lineHeightNum = lineHeight.match(/\d+/)[0];

  const lineHeightValue = tokens.lineHeights[lineHeightNum].value;

  // lineHeight가 'AUTO'가 아니라면 %와 px를 구분하여 처리
  const lineHeightFormatted = lineHeightValue === 'AUTO'
    ? 'auto'
    : lineHeightValue.includes('%')
    ? lineHeightValue // %일 경우 그대로 사용
    : `${lineHeightValue}px`; // px일 경우 px로 변환

  return [
    createFontVariable('font-family', key, 'Pretendard'),
    createFontVariable('font-size', key, `${tokens.fontSize[fontSizeNum].value}px`),
    createFontVariable('font-weight', key, fontWeightNum === '0' ? '600' : '500'),
    createFontVariable('line-height', key, lineHeightFormatted)
  ].join('\n  ');
};

// CSS 생성
const css = `@theme {
  /* 컬러 */
 ${Object.entries(tokens.color)
    .flatMap(([category, colors]) =>
      Object.entries(colors).map(([name, token]) =>
        createColorVariable('color', category, name, token.value)  // 중복 제거된 변수명 생성
      )
    )
    .join('\n  ')}

  /* 타이포그래피 */
    ${[...Object.entries(tokens.fontSize.heading), ...Object.entries(tokens.fontSize.body)]
    .map(([key, token]) => createTypographyVariables(key, token))
    .join('\n\n  ')}
}

@layer components {
  /* 타이포그래피 컴포넌트 */
   ${[...Object.keys(tokens.fontSize.heading), ...Object.keys(tokens.fontSize.body)]
    .map(createComponent)
    .join('\n\n  ')}
}`;

// CSS 파일 저장
fs.writeFileSync('src/styles/design-tokens.css', css);
