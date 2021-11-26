module.exports = {
    //cuánto y qué código se abarca en los tests.
    //Se incluyen todos los archivos js, jsx, ts y tsx
    //Se excluyen .d.ts
    //se excluyen archivos en carpeta node_modules
    collectCoverageFrom: [
      '**/*.{js,jsx,ts,tsx}',
      '!**/*.d.ts',
      '!**/node_modules/**',
    ],

    //permite manejar imports de CSS con módulos
    //permite manejar imports de CSS sin módulos
    //permite manejar imports de imágenes 
    moduleNameMapper: {
      /* Handle CSS imports (with CSS modules)
      https://jestjs.io/docs/webpack#mocking-css-modules */
      '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  
      // Handle CSS imports (without CSS modules)
      '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
  
      /* Handle image imports
      https://jestjs.io/docs/webpack#handling-static-assets */
      '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$':
        '<rootDir>/__mocks__/fileMock.js',
    },
    //carpetas ignoradas
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    //entorno en que se ejecutan los tests
    testEnvironment: 'jsdom',    
    transform: {
      /* Use babel-jest to transpile tests with the next/babel preset
      https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    transformIgnorePatterns: [
      '/node_modules/',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
  }