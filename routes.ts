/**
 * An array of routes that are accesible to the public
 * There routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/products", "/product"];

/**
 * An array of routes that are used for authentication
 * There will redirect signed-in users do their profile
 * @type {string[]}
 */
export const authRoutes = ["/sign-in", "/sign-up"];

/**
 * The prefix for api authentication routes
 * Routes that start with this prefix
 * are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default user redirect after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
