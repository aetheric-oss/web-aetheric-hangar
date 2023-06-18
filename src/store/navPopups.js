import { defineStore } from 'pinia'

export const useNavPopupStore = defineStore("navPopup", {
  id: 'nav-popup-store',
  state: () => ({
    accountPopup: false,
    notificationsPopup: false,
    profilePopup: false,
  }),
  getters: {
    getAccountPopup: state => state.accountPopup,
    getNotificationsPopup: state => state.notificationsPopup,
    getProfilePopup: state => state.profilePopup,
  },
  actions: {
    togglePopup(popupId) {
        console.log('togglePopup: ', popupId);
        if (popupId === 'business-popup') {
            this.$patch((state) => {
                state.accountPopup = !state.accountPopup;
            });
        } else if (popupId === 'notifications-popup') {
            this.$patch((state) => {
                state.notificationsPopup = !state.notificationsPopup;
            });
        } else if (popupId === 'profile-popup') {
            this.$patch((state) => {
                state.profilePopup = !state.profilePopup;
            });
        }
    },
  },
})
