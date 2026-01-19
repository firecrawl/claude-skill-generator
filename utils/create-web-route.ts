/**
 * Stub route helper for UI library mode
 * In a real app, these would link to your authentication system
 */

export const createWebRoute = {
  auth: {
    signin: ({ view }: { view?: string } = {}) => {
      return view ? `/signin?view=${view}` : "/signin";
    },
  },
};
