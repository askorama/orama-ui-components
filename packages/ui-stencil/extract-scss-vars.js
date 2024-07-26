const fs = require('fs')
const sass = require('sass')
const postcss = require('postcss')
const postcssScss = require('postcss-scss')

// Path to your SCSS file
const scssFilePath = './src/styles/_colors.scss'

// Function to compile SCSS to CSS
function compileScss(filePath) {
  const result = sass.renderSync({ file: filePath })
  return result.css.toString()
}

// Function to extract :export block
async function extractExportVariables(css) {
  const root = postcss.parse(css, { syntax: postcssScss })
  const variables = {}

  let isExportBlock = false
  let isFirstLight = false
  let isFirstDark = false

  root.walkRules((rule) => {
    if (rule.selector === ':export') {
      isExportBlock = true

      rule.walkDecls((decl) => {
        if (decl.prop.includes('-light')) {
          if (!isFirstLight) {
            isFirstLight = true
            variables.light = {}
          }
          decl.prop = decl.prop.replace('-light', '')
          variables.light[decl.prop] = decl.value
          return
        }

        if (decl.prop.includes('-dark')) {
          if (!isFirstDark) {
            isFirstDark = true
            variables.dark = {}
          }
          decl.prop = decl.prop.replace('-dark', '')
          variables.dark[decl.prop] = decl.value
          return
        }

        variables[decl.prop] = decl.value
      })
    } else if (isExportBlock && rule.selector === '') {
      return
    }
  })

  return variables
}
// Main function
;(async () => {
  try {
    const css = compileScss(scssFilePath)
    const variables = await extractExportVariables(css)

    // Convert the variables to a JavaScript object
    const jsContent = `export default ${JSON.stringify(variables, null, 2)};`

    // add a comment to the top of the file to specify that it is generated
    const comment = '// * IMPORTANT! This file is generated from _colors.scss. Do not modify this file directly.'

    // Write the JavaScript file
    fs.writeFileSync('./src/config/colors.ts', `${comment}\n${jsContent}`, 'utf-8')
    console.log('SCSS :export variables have been extracted to _colors.js')
  } catch (error) {
    console.error('Error extracting SCSS :export variables:', error)
  }
})()
