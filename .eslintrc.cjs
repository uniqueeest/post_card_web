module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  rules: {
    indent: [
      'warn', // 들여쓰기를 탭으로 설정하고, switch 문에서 case를 1단계 더 들여쓰기 합니다.
      'tab',
      { SwitchCase: 1, ignoredNodes: ['TemplateLiteral *'] },
    ],
    semi: ['error', 'always'], // 세미콜론을 항상 사용하도록 강제
    quotes: ['error', 'single'], // 작은따옴표를 사용하도록 강제
    'jsx-quotes': ['warn', 'prefer-single'], // JSX에서 작은따옴표를 선호하도록
    'object-curly-spacing': ['error', 'always'], // 객체 리터럴의 중괄호 안에 공백을 강제
    'arrow-parens': ['error', 'always'], // 화살표 함수의 매개변수에 항상 괄호를 사용하도록 강제
    '@typescript-eslint/no-unused-vars': 'warn', // 사용하지 않는 변수에 대해 경고
    '@typescript-eslint/no-explicit-any': 0, // any 허용 (이후 수정 필요)
    'react/jsx-uses-react': 'off', // React 17 이후 JSX 변환으로 인해 더 이상 필요하지 않음.
    'react/react-in-jsx-scope': 'off', // React 17 이후 JSX 변환으로 인해 React를 범위에 가져올 필요가 없음.
  },
};
