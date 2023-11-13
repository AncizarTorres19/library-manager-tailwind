module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
}