import { httpClient } from '..';

export const getCountries = async () => {
  try {
    const { data } = await httpClient.get('/countries');
    return data;
  } catch (error) {
    console.log('error with fetching', error);
  }
};

export const postCountry = async (payload: object) => {
  try {
    const { data } = await httpClient.post('/countries', payload);
    return data;
  } catch (error) {
    console.error('Error creating country:', error);
    return null;
  }
};

export const putCountries = async ({
  id,
  payload,
}: {
  id: string | number;
  payload: object;
}) => {
  try {
    const { data } = await httpClient.put(`/countries/${id}`, payload);
    return data;
  } catch (error) {
    console.log('error with  put', error);
  }
};

export const patchCountries = async ({
  id,
  payload,
}: {
  id: string | number;
  payload: object;
}) => {
  try {
    const { data } = await httpClient.patch(`/countries/${id}`, payload);
    return data.data;
  } catch (error) {
    console.log('error with patch', error);
  }
};

export const deleteCountries = async (id: string | number) => {
  try {
    const { data } = await httpClient.delete(`/countries/${id}`);
    return data;
  } catch (error) {
    console.log('error with deleting', error);
  }
};
