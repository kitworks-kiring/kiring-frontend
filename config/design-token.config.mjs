import fs from 'fs';

// 토큰 파일 로드
const tokens = JSON.parse(fs.readFileSync('tokens/design-token.json', 'utf8')).kiring;

// CSS 변수 생성 함수
const createVariable = (prefix, name, value) => `--${prefix}-${name}: ${value};`;

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

  return [
    createVariable('font-family', key, 'Pretendard'),
    createVariable('font-size', key, `${tokens.fontSize[fontSizeNum].value}px`),
    createVariable('font-weight', key, fontWeightNum === '0' ? '600' : '500'),
    createVariable('line-height', key, tokens.lineHeights[lineHeightNum].value === 'AUTO' ? 'auto' : `${tokens.lineHeights[lineHeightNum].value}px`)
  ].join('\n  ');
};

// CSS 생성
const css = `@theme {
  /* 컬러 */
  ${Object.entries(tokens.color)
    .flatMap(([category, colors]) =>
      Object.entries(colors).map(([name, token]) =>
        createVariable('color', `${category}-${name}`, token.value)
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
