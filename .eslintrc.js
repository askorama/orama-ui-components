module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['custom'],
  plugins: ['eslint-plugin-html'],
  overrides: [
    {
      files: ['**/*.html', '**/*.yml']
    }
  ],
  settings: {
    next: {
      rootDir: ['apps/*/']
    }
  }
}
