import { defineStore } from "pinia";

export const useProfileStore = defineStore({
  id: "profile-store",
  state: () => {
    return {
      profile: {
        name: "Patricia Hale",
        publicName: "Miss Patricia",
        arrowBalance: "203,00",
        currentBusiness: "1",
        businesses: [
          {
            uuid: "1",
            name: "Arctic Ocean",
            imgSrc: "/img/demo/current-business.png",
          },
          {
            uuid: "2",
            name: "Future Ventures",
            imgSrc: "/img/demo/business.svg",
          },
          {
            uuid: "3",
            name: "Freedom Arrives",
            imgSrc: "/img/demo/business.svg",
          },
          {
            uuid: "4",
            name: "A Fly Away Airport",
            imgSrc: "/img/demo/business.svg",
          },
          {
            uuid: "5",
            name: "Four Counts",
            imgSrc: "/img/demo/business.svg",
          },
        ],
      },
    } as Profile;
  },

  actions: {
    switchAccount(uuid: string) {
      this.profile.currentBusiness = uuid;
    },
    getBusiness(uuid: string): Business {
      let index = this.profile.businesses.findIndex(
        (business) => business.uuid === uuid
      );
      return this.profile.businesses[index];
    },
  },

  getters: {
    getUser: (state: Profile) => state.profile,
    getUsername: (state: Profile) => state.profile.name,
    getPublicName: (state: Profile) => state.profile.publicName,
    getArrowBalance: (state: Profile) => state.profile.arrowBalance,
    getCurrentBusiness(state: Profile): Business {
      let index = state.profile.businesses.findIndex(
        (business) => business.uuid === state.profile.currentBusiness
      );
      return state.profile.businesses[index];
    },
    getBusinesses: (state) => {
      const sortedBusinessesList: { [key: string]: Array<Business> } = {};
      state.profile.businesses.sort((a, b) => a.name.localeCompare(b.name)).forEach((business) => {
        let firstLetter = business.name[0].toUpperCase();
        if (sortedBusinessesList[firstLetter]) {
          sortedBusinessesList[firstLetter].push(business);
        } else {
          sortedBusinessesList[firstLetter] = [business];
        }
      });
      return sortedBusinessesList;
    },
  },
});
