export const isProduction = !global.__DEV__;

export const apiUrl = isProduction ? '' : '';
