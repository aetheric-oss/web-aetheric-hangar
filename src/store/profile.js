import { defineStore } from 'pinia'

const sortBusinessesList = (businessesList) => {
  let sortedBusinessesList = {}
  businessesList.sort((a, b) => a.name.localeCompare(b.name)).forEach((business) => {
    let firstLetter = business.name[0].toUpperCase()
    if (sortedBusinessesList[firstLetter]) {
      sortedBusinessesList[firstLetter].push(business)
    } else {
      sortedBusinessesList[firstLetter] = [business]
    }
  })
  return sortedBusinessesList
}

export const useProfileStore = defineStore("profile", {
  id: 'profile-store',
  state: () => {
    return {
      profile: {
        name: 'Patricia Hale',
        currentBusiness: {
          name: 'Arctic Ocean',
          imgSrc: '/img/demo/current-business.png'
        },
        businesses: [
          'Arctic Ocean',
          'Future Ventures',
          'Freedom Arrives',
          'A Fly Away Airport',
          'Four Counts'
        ],
        businessesList: [
          {
            name: 'Arctic Ocean',
            imgSrc: '/img/demo/current-business.png'
          },
          {
            name: 'Future Ventures',
            imgSrc: ''
          },
          {
            name: 'Freedom Arrives',
            imgSrc: ''
          },
          {
            name: 'A Fly Away Airport',
            imgSrc: ''
          },
          {
            name: 'Four Counts',
            imgSrc: ''
          }
        ]
      }
    }
  },
  getters: {
    getUser: state => state.profile,
    getUsername: state => state.profile.name,
    getCurrentBusiness: state => state.profile.currentBusiness,
    getBusinesses: (state) => {
      return sortBusinessesList(state.profile.businessesList);
    }
  },
})
