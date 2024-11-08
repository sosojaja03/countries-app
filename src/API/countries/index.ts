import { httpClient } from '..';

interface Country {
  id: string;
  name: { ka: string; en: string };
  capital: { ka: string; en: string };
  population: number;
  likes: number;
  deleted: boolean;
  image: string;
}

export const getCountriesData = async (): Promise<Country[]> => {
  try {
    const { data } = await httpClient.get<Country[]>('/countries');
    return data;
  } catch (error) {
    console.error('Error fetching countries data:', error);
    throw new Error('Failed to fetch countries data.');
  }
};

export const updateCountry = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<Country>;
}): Promise<Country> => {
  try {
    const { data } = await httpClient.patch<Country>(
      `/countries/${id}`,
      payload
    );
    return data;
  } catch (error) {
    console.error(`Error updating country with ID ${id}:`, error);
    throw new Error('Failed to update country.');
  }
};

export const createCountry = async (payload: Country): Promise<Country> => {
  try {
    const { data } = await httpClient.post<Country>('/countries', payload);
    return data;
  } catch (error) {
    console.error('Error creating country:', error);
    throw new Error('Failed to create country.');
  }
};

export const deleteCountry = async (id: string): Promise<void> => {
  try {
    const { data } = await httpClient.delete<void>(`/countries/${id}`);
    return data;
  } catch (error) {
    console.error(`Error deleting country with ID ${id}:`, error);
    throw new Error('Failed to delete country.');
  }
};

// export const getCountries = async () => {
//   try {
//     const { data } = await httpClient.get('/countries');
//     return data;
//   } catch (error) {
//     console.log('error with fetching', error);
//   }
// };

// export const postCountry = async (payload: object) => {
//   try {
//     const { data } = await httpClient.post('/countries', payload);
//     return data;
//   } catch (error) {
//     console.error('Error creating country:', error);
//     return null;
//   }
// };

// export const putCountries = async ({
//   id,
//   payload,
// }: {
//   id: string;
//   payload: object;
// }) => {
//   try {
//     const { data } = await httpClient.put(`/countries/${id}`, payload);
//     return data;
//   } catch (error) {
//     console.log('error with  put', error);
//   }
// };

// export const patchCountries = async ({
//   id,
//   payload,
// }: {
//   id: string;
//   payload: object;
// }) => {
//   try {
//     const { data } = await httpClient.patch(`/countries/${id}`, payload);
//     return data.data;
//   } catch (error) {
//     console.log('error with patch', error);
//   }
// };

// export const deleteCountries = async (id: string) => {
//   try {
//     const { data } = await httpClient.delete(`/countries/${id}`);
//     return data;
//   } catch (error) {
//     console.log('error with deleting', error);
//   }
// };
