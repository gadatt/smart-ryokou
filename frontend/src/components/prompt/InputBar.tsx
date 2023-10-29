'use client';

import type { Dispatch, SetStateAction } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  placeInput: string;
  setPlaceInput: Dispatch<SetStateAction<string>>;
  handleOpenModal: () => void;
};

const InputBar = ({ placeInput, setPlaceInput, handleOpenModal }: Props) => {
  const { t } = useTranslation('home');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleOpenModal();
  };

  return (
    <form
      style={{
        padding: 20,
        width: '600px',
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        required
        id="search"
        type="search"
        placeholder={t('input-message')}
        value={placeInput}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default InputBar;