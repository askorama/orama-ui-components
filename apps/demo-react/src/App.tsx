import './App.css'
import { defineCustomElements, OramaChatBox } from '@orama/react-components'

void defineCustomElements()

function App() {
  return (
    <>
      <main>
        <section>
          <h1>App React</h1>
        </section>

        <section>
          <h2>ChatBox</h2>
          <div className="component-row">
            <OramaChatBox
              index={{
                api_key: 'yl2JSnjLNBV6FVfUWEyadpjFr6KzPiDR',
                endpoint: 'https://cloud.orama.run/v1/indexes/recipes-m7w9mm',
              }}
            />
          </div>
        </section>
      </main>
    </>
  )
}

export default App
