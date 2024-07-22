import './App.css'
import { defineCustomElements, OramaSearchBox } from 'ui-stencil-react'

// import {} from 'ui-stencil-react'

void defineCustomElements()

function App() {
  return (
    <>
      <main>
        <section>
          <h1>App React</h1>
        </section>

        <section>
          <h2>Stencil Components</h2>
          <div className="component-row">
            <OramaSearchBox />
          </div>
        </section>
      </main>
    </>
  )
}

export default App
