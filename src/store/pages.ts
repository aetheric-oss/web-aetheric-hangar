import { defineStore } from 'pinia'

export const usePagesMenuStore = defineStore({
  id: 'pages-store',
  state: () => {
    return {
      pagesMenu: {
        categories: [
          {
            name: 'Manage Assets',
            icon: 'menu/assets',
            pages: [
            {
              name: 'My assets',
              path: '/assets/my-assets/vtol',
              order: 1
            },
            {
              name: 'Group Management',
              path: '/assets/group-management',
              order: 2
            },
            ]
          },
          {
            name: 'Analyse',
            icon: 'menu/analyse',
            pages: [
              {
                name: 'Overview',
                path: '/analyse/overview',
                order: 1
              },
            ]
          },
          {
            name: 'Flights',
            icon: 'menu/flights',
            pages: [
              {
                name: 'Aircraft',
                path: '/flights/aircraft',
                order: 1
              },
              {
                name: 'Vertiports',
                path: '/flights/vertiports',
                order: 2
              },
              {
                name: 'Hangars',
                path: '/flights/hangars',
                order: 3
              }
            ]
          },
          {
            name: 'Documents',
            icon: 'menu/documents',
            pages: []
          },
          {
            name: 'Settings',
            icon: 'menu/settings',
            pages: []
          },
          {
            name: 'Billing',
            icon: 'menu/billing',
            pages: []
          }
        ]
      }
    }
  },
  actions: {},
  getters: {
    getPagesMenu: state => state.pagesMenu,
    getCategories: state => state.pagesMenu.categories,
  },
})
