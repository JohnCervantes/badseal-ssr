import { InMemoryCache, makeVar } from "@apollo/client";

export const RESET_TOAST = { show: false, status: "", message: "", header: "" };
export const RESET_MODAL = { show: false, type: "" };
export const SUCCESS_TOAST = {
  show: true,
  status: "success",
  message: "",
  header: "",
};
export const ERROR_TOAST = {
  show: true,
  status: "error",
  message: "",
  header: "",
};

export const RESET_ICON = {
  resumeToggled: false,
  projectsToggled: false,
  blogToggled: false,
  homeToggled: false
};

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        readState: {
          read() {
            return state();
          },
        },
      },
    },
  },
});

export const state = makeVar({
  icon: RESET_ICON,
  activeComponent: "",
  showSpinner: false,
  showToast: RESET_TOAST,
  navbarOpen: false,
  showModal: RESET_MODAL,
  projects: []
});
