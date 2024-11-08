import React, {
  useEffect,
  useReducer,
  useState,
  ChangeEvent,
  useCallback,
  useMemo,
} from 'react';
import styles from './Card.module.css';
import { CardHeader } from '@/pages/home/components/card/CardHeader';
import { CardContent } from '@/pages/home/components/card/CardContent';
import { Link, useParams } from 'react-router-dom';
import translations from '@/pages/home/static/Translations';
import {
  deleteCountry,
  updateCountry,
  getCountriesData,
  createCountry,
} from '@/API/countries';
import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

// Types and Interfaces
type Action =
  | { type: 'LIKE'; id: string }
  | { type: 'DELETE'; id: string }
  | { type: 'ADD'; country: Country }
  | { type: 'SET_COUNTRIES'; countries: Country[] }
  | { type: 'SORT'; order: 'asc' | 'desc' }
  | { type: 'EDIT'; country: Country };

interface Country {
  id: string;
  name: { ka: string; en: string };
  capital: { ka: string; en: string };
  population: number;
  likes: number;
  deleted: boolean;
  image: string;
}

interface FormErrors {
  name?: string;
  capital?: string;
  population?: string;
  image?: string;
}

interface CountryFormData {
  name: { ka: string; en: string };
  capital: { ka: string; en: string };
  population: string;
  image: string;
}

// Reducer
const countryReducer = (state: Country[], action: Action): Country[] => {
  switch (action.type) {
    case 'SET_COUNTRIES':
      return action.countries;
    case 'LIKE':
      return state.map((country) =>
        country.id === action.id
          ? { ...country, likes: country.likes + 1 }
          : country
      );
    case 'DELETE':
      return state.filter((country) => country.id !== action.id);
    case 'ADD':
      return [...state, action.country];
    case 'SORT':
      return [...state].sort((a, b) =>
        action.order === 'asc' ? a.likes - b.likes : b.likes - a.likes
      );
    case 'EDIT':
      return state.map((country) =>
        country.id === action.country.id ? action.country : country
      );
    default:
      return state;
  }
};

// Edit Form Component
const EditCountryForm: React.FC<{
  country: Country;
  onEdit: (country: Country) => void;
  onCancel: () => void;
}> = ({ country, onEdit, onCancel }) => {
  const { lang = 'ka' } = useParams<{ lang: 'ka' | 'en' }>();
  const t = translations[lang];

  const [formData, setFormData] = useState<CountryFormData>({
    name: { ...country.name },
    capital: { ...country.capital },
    population: country.population.toString(),
    image: country.image,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [previewImage, setPreviewImage] = useState<string>(country.image);

  const validateForm = useMemo(() => {
    return (): boolean => {
      const newErrors: FormErrors = {};

      if (formData.name.ka.trim() === '' || formData.name.en.trim() === '') {
        newErrors.name = 'Country name is required in both languages';
      }

      if (
        formData.capital.ka.trim() === '' ||
        formData.capital.en.trim() === ''
      ) {
        newErrors.capital = 'Capital is required in both languages';
      }

      if (formData.population.trim() === '') {
        newErrors.population = t.populationError;
      } else if (
        isNaN(Number(formData.population)) ||
        Number(formData.population) <= 0
      ) {
        newErrors.population = t.populationError;
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  }, [formData, t]);

  const handleInputChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      field: keyof CountryFormData,
      subField?: 'ka' | 'en'
    ) => {
      const value = e.target.value;
      setFormData((prev) => {
        if (subField) {
          return {
            ...prev,
            [field]: {
              ...prev[field as keyof Pick<CountryFormData, 'name' | 'capital'>],
              [subField]: value,
            },
          };
        }
        return { ...prev, [field]: value };
      });
    },
    []
  );

  const handleFileUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            setFormData((prev) => ({
              ...prev,
              image: result,
            }));
            setPreviewImage(result);
          };
          reader.readAsDataURL(file);
        } else {
          setErrors((prev) => ({ ...prev, image: t.imageError }));
        }
      }
    },
    [t.imageError]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedCountry: Country = {
        ...country,
        name: formData.name,
        capital: formData.capital,
        population: Number(formData.population),
        image: formData.image,
      };
      // httpClient.patchCountries(id, updatedCountry);
      onEdit(updatedCountry);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.editForm}>
      <div>
        <input
          type="text"
          value={formData.name.ka}
          onChange={(e) => handleInputChange(e, 'name', 'ka')}
          placeholder={t.countryNameGeo}
        />
        <input
          type="text"
          value={formData.name.en}
          onChange={(e) => handleInputChange(e, 'name', 'en')}
          placeholder={t.countryNameEng}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>
      <div>
        <input
          type="text"
          value={formData.capital.ka}
          onChange={(e) => handleInputChange(e, 'capital', 'ka')}
          placeholder={t.capitalGeo}
        />
        <input
          type="text"
          value={formData.capital.en}
          onChange={(e) => handleInputChange(e, 'capital', 'en')}
          placeholder={t.capitalEng}
        />
        {errors.capital && (
          <span className={styles.error}>{errors.capital}</span>
        )}
      </div>
      <div>
        <input
          type="text"
          value={formData.population}
          onChange={(e) => handleInputChange(e, 'population')}
          placeholder={t.populationPlaceholder}
        />
        {errors.population && (
          <span className={styles.error}>{errors.population}</span>
        )}
      </div>
      <div className={styles.imageUploadContainer}>
        {previewImage && (
          <div className={styles.imagePreview}>
            <img src={previewImage} alt="Preview" />
          </div>
        )}
        <div className={styles.uploadControls}>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileUpload}
            id="edit-image-upload"
          />
          <label htmlFor="edit-image-upload">{t.uploadImage}</label>
        </div>
        {errors.image && <span className={styles.error}>{errors.image}</span>}
      </div>
      <div className={styles.formActions}>
        <button type="submit">{t.save || 'Save'}</button>
        <button onClick={onCancel}>{t.cancel || 'Cancel'}</button>
      </div>
    </form>
  );
};

// Add Country Form Component
const AddCountryForm: React.FC<{ onAdd: (country: Country) => void }> = ({
  onAdd,
}) => {
  const { lang = 'ka' } = useParams<{ lang: 'ka' | 'en' }>();
  const t = translations[lang];

  const [formData, setFormData] = useState<CountryFormData>({
    name: { ka: '', en: '' },
    capital: { ka: '', en: '' },
    population: '',
    image: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const { mutate: addCountry, isPending: isAdding } = useMutation({
    mutationFn: async (newCountry: Country) => {
      try {
        const data = await createCountry(newCountry);
        return data;
      } catch (error) {
        console.error('Error adding country:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      onAdd(data);
      setFormData({
        name: { ka: '', en: '' },
        capital: { ka: '', en: '' },
        population: '',
        image: '',
      });
      setErrors({});
    },
    onError: (error) => {
      console.error('Error adding country:', error);
    },
  });

  const validateForm = useMemo(() => {
    return (): boolean => {
      const newErrors: FormErrors = {};

      if (formData.name.ka.trim() === '' || formData.name.en.trim() === '') {
        newErrors.name = 'Country name is required in both languages';
      }

      if (
        formData.capital.ka.trim() === '' ||
        formData.capital.en.trim() === ''
      ) {
        newErrors.capital = 'Capital is required in both languages';
      }

      if (formData.population.trim() === '') {
        newErrors.population = t.populationError;
      } else if (
        isNaN(Number(formData.population)) ||
        Number(formData.population) <= 0
      ) {
        newErrors.population = t.populationError;
      }

      if (formData.image === '') {
        newErrors.image = 'Image is required';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  }, [formData, t]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const newCountry: Country = {
        id: Date.now().toString(),
        name: formData.name,
        capital: formData.capital,
        population: Number(formData.population),
        likes: 0,
        deleted: false,
        image: formData.image,
      };

      // Trigger the mutation to add the country
      addCountry(newCountry);
    }
  };

  const handleInputChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      field: keyof CountryFormData,
      subField?: 'ka' | 'en'
    ) => {
      const value = e.target.value;
      setFormData((prev) => {
        if (subField) {
          return {
            ...prev,
            [field]: {
              ...prev[field as keyof Pick<CountryFormData, 'name' | 'capital'>],
              [subField]: value,
            },
          };
        }
        return { ...prev, [field]: value };
      });
    },
    []
  );

  const handleFileUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData((prev) => ({
              ...prev,
              image: reader.result as string,
            }));
          };
          reader.readAsDataURL(file);
        } else {
          setErrors((prev) => ({ ...prev, image: t.imageError }));
        }
      }
    },
    [t.imageError]
  );

  return (
    <form onSubmit={handleSubmit} className={styles.addForm}>
      <div>
        <input
          type="text"
          value={formData.name.ka}
          onChange={(e) => handleInputChange(e, 'name', 'ka')}
          placeholder={t.countryNameGeo}
        />
        <input
          type="text"
          value={formData.name.en}
          onChange={(e) => handleInputChange(e, 'name', 'en')}
          placeholder={t.countryNameEng}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>
      <div>
        <input
          type="text"
          value={formData.capital.ka}
          onChange={(e) => handleInputChange(e, 'capital', 'ka')}
          placeholder={t.capitalGeo}
        />
        <input
          type="text"
          value={formData.capital.en}
          onChange={(e) => handleInputChange(e, 'capital', 'en')}
          placeholder={t.capitalEng}
        />
        {errors.capital && (
          <span className={styles.error}>{errors.capital}</span>
        )}
      </div>
      <div>
        <input
          type="text"
          value={formData.population}
          onChange={(e) => handleInputChange(e, 'population')}
          placeholder={t.populationPlaceholder}
        />
        {errors.population && (
          <span className={styles.error}>{errors.population}</span>
        )}
      </div>
      <div>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileUpload}
        />
        <label>{t.uploadImage}</label>
        {errors.image && <span className={styles.error}>{errors.image}</span>}
      </div>
      <button type="submit" disabled={isAdding}>
        {isAdding ? 'Adding...' : t.addCountry}
      </button>
    </form>
  );
};

// Card Component
const Card: React.FC<{
  country: Country;
  onLike: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
  onEdit: (country: Country) => void;
}> = ({ country, onLike, onDelete, onEdit, isDeleting = false }) => {
  const { lang = 'ka' } = useParams<{ lang: 'ka' | 'en' }>();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (updatedCountry: Country) => {
    onEdit(updatedCountry);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={styles.card}>
        <EditCountryForm
          country={country}
          onEdit={handleEdit}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div
      className={`${styles.card} ${country.deleted ? styles.deletedCard : ''}`}
    >
      <Link to={`${country.id}`}>
        <div className={styles.cardImageContainer}>
          <img
            src={country.image || '/path/to/placeholder-image.jpg'}
            alt={country.name[lang]}
            className={styles.cardImage}
          />
        </div>
        <CardHeader title={country.name} />
        <CardContent
          capital={country.capital}
          population={country.population}
        />
      </Link>
      <div className={styles.cardActions}>
        <span>Likes: {country.likes}</span>
        <button onClick={onLike} disabled={country.deleted}>
          Like
        </button>
        <button onClick={() => setIsEditing(true)} disabled={country.deleted}>
          Edit
        </button>

        <button
          onClick={onDelete}
          disabled={isDeleting}
          className={isDeleting ? styles.deletingButton : ''}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};
// Main Cards Component
const Cards: React.FC = () => {
  const [countries, dispatch] = useReducer(countryReducer, []);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['countries-list'],
    queryFn: async () => {
      try {
        const data = await getCountriesData();
        return data;
      } catch (error) {
        console.error('Failed to fetch countries data:', error);
        throw error;
      }
    },
    retry: 0,
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: 'SET_COUNTRIES', countries: data });
    }
  }, [data, dispatch]);

  // Add mutation
  // const { mutate: addCountry } = useMutation({
  //   mutationFn: createCountry,
  //   onSuccess: (data) => {
  //     dispatch({ type: 'ADD', country: data });
  //     refetch();
  //   },
  //   onError: (error) => console.error('Error adding country:', error),
  // });

  // Delete mutation
  const { mutate: DeleteCountry } = useMutation({
    mutationFn: async (id: string) => {
      try {
        await deleteCountry(id);
      } catch (error) {
        console.error('Error deleting country:', error);
        throw error;
      }
    },
    onSuccess: (_, id) => {
      dispatch({ type: 'DELETE', id });
      setIsDeleting(null);
      refetch();
    },
  });

  // Edit mutation
  const { mutate: editCountry } = useMutation({
    mutationFn: async (updatedCountry: {
      id: string;
      payload: Partial<Country>;
    }) => {
      try {
        const data = await updateCountry(updatedCountry);
        return data;
      } catch (error) {
        console.error('Error updating country:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      dispatch({ type: 'EDIT', country: data });
      refetch();
    },
  });

  const { mutate: likeCountry } = useMutation({
    mutationFn: async (updatedCountry: {
      id: string;
      payload: Partial<Country>;
    }) => {
      try {
        await updateCountry(updatedCountry);
      } catch (error) {
        console.error('Error liking country:', error);
        throw error;
      }
    },
    onSuccess: (_, { id }) => {
      dispatch({ type: 'LIKE', id });
      // refetch();
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError || !data) return <p>error...</p>;

  function handleSort() {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    dispatch({ type: 'SORT', order: newOrder });
  }

  const handleLike = (id: string) => {
    const country = countries.find((country) => country.id === id);
    if (country) {
      likeCountry({
        id,
        payload: { likes: country.likes + 1 },
      });
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(null);
    DeleteCountry(id);
  };

  const handleAdd = (country: Country) => {
    dispatch({ type: 'ADD', country });
  };

  const handleEdit = (updatedCountry: Country) => {
    editCountry({
      id: updatedCountry.id,
      payload: { ...updatedCountry },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <AddCountryForm onAdd={handleAdd} />
        <button onClick={handleSort} className={styles.sortButton}>
          Sort by Likes ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>
      {Array.isArray(countries) ? (
        <div className={styles.cardsContainer}>
          {countries.map((country) => (
            <Card
              key={country.id}
              country={country}
              onLike={() => handleLike(country.id)}
              onDelete={() => handleDelete(country.id)}
              onEdit={handleEdit}
              isDeleting={isDeleting === country.id}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Cards;
