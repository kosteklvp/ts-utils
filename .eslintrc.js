module.exports = {
    env: {
        node: true,
        commonjs: true,
    },
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint', 'prettier', 'etc'],
    rules: {
        'no-var': 'warn',
        'no-extra-boolean-cast': 'off',
        'quote-props': ['warn', 'consistent'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'quotes': 'off',
        '@typescript-eslint/quotes': ['warn', 'single', { avoidEscape: true }],
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-empty-interface': 'warn',
        '@typescript-eslint/await-thenable': 'warn',
        '@typescript-eslint/require-await': 'warn',
        '@typescript-eslint/prefer-as-const': 'warn',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/naming-convention': [
            'warn',
            { selector: 'class', format: ['PascalCase'] },
            { selector: 'function', format: ['camelCase'] },
            { selector: 'interface', format: ['PascalCase'] },
            { selector: 'classMethod', format: ['camelCase'] },
            { selector: 'classProperty', format: ['camelCase'] },
            { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
            {
                selector: 'enum',
                format: ['PascalCase'],
                custom: {
                    // enums in singular form
                    regex: '.*[^s]$',
                    match: true,
                },
            },
        ],
        '@typescript-eslint/lines-between-class-members': [
            'warn',
            {
                enforce: [
                    { blankLine: 'always', prev: 'method', next: 'method' },
                    { blankLine: 'always', prev: 'field', next: 'method' },
                ],
            },
        ],
        'curly': 'warn',
        'prefer-const': 'warn',
        'etc/no-commented-out-code': 'warn',
        'prettier/prettier': 'warn',
    },
};
