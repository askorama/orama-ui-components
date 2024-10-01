[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)

<p align="center">
  <img src="/misc/readme/orama-readme-dark.png#gh-dark-mode-only" />
  <img src="/misc/readme/orama-readme-light.png#gh-light-mode-only" />
</p>
<h4 align="center">
  <a href="https://orama.com?utm_source=github">Website</a> •
  <a href="https://orama.com/blog?utm_source=github">Blog</a> •
  <a href="https://docs.orama.com?utm_source=github">Documentation</a> •
  <a href="https://orama.to/slack">Community Slack</a>
</h4>
<br />

# Orama UI Components

This library provides a set of reusable UI components for easily implementing search functionalities in your web applications through Orama.

## Authentication

Since most of our components require you to have a cloud index already deployed, make sure to:

1. **Sign Up**: Go to [Our Signup Page](https://cloud.oramasearch.com/auth/signup) and create an account.
2. **Create your first index**: You can even create a Demo index to start playing around

## Getting Started

Orama UI Componets are divided in two types of components: **Internal** and **External Components**.

**Internal Components** are small reusable components like Buttons, Toggles, Inputs that can be used in multiple places.

**External Components** are ready to be used components made with the **Internal Components**. They contain everything needed to get Orama Chat/Search up and running in your project.

Orama Components were built with StencilJS as Web Components. They can be used in any project, no matter the framework or library you are using. But we also provide **React**, **Vue**, and **Angular** wrappers for easy integration.

### Web Components

```bash
npm install @orama/wc-components
```

### React

```bash
npm install @orama/react-components
```

### Angular

```bash
npm install @orama/angular-components
```

### Vue

```bash
npm install @orama/vue-components
```

## Storybook

You can find a Storybook at [https://components.orama.com](https://components.orama.com/?path=/docs/welcome--docs) will all available components.

TODO: CONSIDERE LINKING TO THE AUTO-GENERATED README OF THE COMPONENTS AND USE JSDOC TO BETTER EXPLAIN THE COMPONENT
[Component](./packages/ui-stencil/src/components/orama-chat-box/readme.md)
