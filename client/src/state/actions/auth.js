import $api from '../../axios';

export const register = async (user) =>
  await $api.post('/register', user);

export const login = async (user) =>
  await $api.post('/login', user);

export const logout = async () =>
  await $api.post('/logout');