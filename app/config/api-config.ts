/* App config for apis
 */
const ApiConfig = {
  BASE_URL: 'http://54.234.221.228/',
  LOGIN: '/api/auth/signin',
  HOME: '/api/cars/find-by-filters',
  GET_MESSAGES: '/api/chats/get-chats',
  PROFILE: '/api/auth/me',
  INSURANCE: '/api/insurances/find-by-filters',
  NOTIFICATIONS: '/api/notifications/find-by-filters',
  PROMO: '/api/promocodes/find-by-filters',
  VALUE_ADDONS: '/api/value-addons/find-by-filters',
  PAYMENT_CHARGE: '/api/stripe-payments/charge',
  CAR_DETAIL: '/api/cars/',
  LOCATIONS: '/api/locations?',
  BLOG: '/api/blogs/find-by-filters',
  BOOKINGS: '/api/bookings/find-by-filters',
  FAVORITE: '/api/auth/me/cars/favourite',
  MAKE_BOOKING: '/api/bookings',
  SIGN_UP: '/api/auth/signup',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  VERIFY_OTP: '/api/auth/verify-otp',
  RESET_PASSWORD: 'api/auth/reset-password',
  USER_INFO: 'api/users',
};

export default ApiConfig;
