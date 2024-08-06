const demoIndexes = {
  orama: {
    index: {
      api_key: 'LerNlbp6379jVKaPs4wt2nZT4MJZbU1J',
      endpoint: 'https://cloud.orama.run/v1/indexes/docs-orama-b3f5xd',
    },
    placeholder: 'What do you want to learn about Orama?',
    sourceBaseUrl: 'https://docs.orama.com',
    sourcesMap: {
      description: 'content',
    },
    suggestions: [
      'Why is Orama better than other search or AI solutions?',
      'How does Orama ensure correct answers?',
      'What are the steps to implement?',
    ],
    themeConfig: {
      colors: {
        light: {
          '--text-color-primary': '',
        },
        dark: {
          '--text-color-primary': '',
        },
      },
    },
    facetProperty: 'category',
    resultMap: {
      description: 'title',
      section: 'category',
    },
  },
  recipes: {
    index: {
      api_key: 'yl2JSnjLNBV6FVfUWEyadpjFr6KzPiDR',
      endpoint: 'https://cloud.orama.run/v1/indexes/recipes-m7w9mm',
    },
    placeholder: 'What do you want to cook today?',
    sourcesMap: {
      description: 'category',
    },
    suggestions: [
      'How do I make a chocolate cake?',
      'What are the ingredients for a margarita pizza?',
      'How do I make a vegan lasagna?',
    ],
    themeConfig: {
      colors: {
        light: {
          '--text-color-primary': '',
        },
        dark: {
          '--text-color-primary': '',
        },
      },
    },
    facetProperty: 'category',
    resultMap: {
      description: 'title',
      section: 'category',
    },
  },
  videogames: {
    index: {
      api_key: 'WL7pKdEqCTPf3G2412x8ecneqVbnkklr',
      endpoint: 'https://cloud.orama.foo/v1/indexes/videogames-rk139h',
    },
    placeholder: 'What do you want to play today?',
    sourcesMap: {
      path: 'url',
    },
    suggestions: [
      'What are the best games for PS5?',
      'How do I beat the final boss in Elden Ring?',
      'What are the best games for the Nintendo Switch',
    ],
    themeConfig: {
      colors: {
        light: {
          '--text-color-primary': '',
        },
        dark: {
          '--text-color-primary': '',
        },
      },
    },
    facetProperty: 'category',
    resultMap: {
      description: 'title',
      section: 'category',
    },
  },
}

export default demoIndexes
