export const ROUTES = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  create: '/create',
  settings: '/settings',
  session: (code: string) => `/session/${code}`,
  sessionSuccess: (code: string) => `/session/${code}/success`,
  dashboardSession: (code: string) => `/dashboard/session/${code}`,
} as const;
