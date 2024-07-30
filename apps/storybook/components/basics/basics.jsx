import React from 'react'
import './basics.css'

export const Basics = () => (
  <div className="boxes">
    <div className="box">
      <h3 className="box__title">Design tokens</h3>
      <p className="box__description">
        Named entities that store visual design properties. Used to ensure a scalable and consistent visual system for
        UI development.
      </p>
      <a href="/?path=/docs/design-tokens-introduction--docs">Design tokens</a>
    </div>
    <div className="box">
      <h3 className="box__title">Components</h3>
      <p className="box__description">
        Reusable building blocks that can be used to create a UI. Independent, modular, and reusable.
      </p>
      <a href="/">Components library</a>
    </div>
    <div className="box">
      <h3 className="box__title">Contributing</h3>
      <p className="box__description">How to get started and contribute to Orama UI Kit development.</p>
      <a href="https://github.com/askorama/orama-ui-components" target="_blank" rel="noopener noreferrer">
        GitHub repository
      </a>
    </div>
  </div>
)
