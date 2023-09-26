'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { usePreferences } from '@/hooks/usePreferences';
import TripTypeForm from '@/components/prompt/form/TripTypeForm';
import DateRangeForm from '@/components/prompt/form/DateRangeForm';
import PeopleNumberForm from '@/components/prompt/form/PeopleNumberForm';
import PaceForm from '@/components/prompt/form/PaceForm';
import BudgetForm from '@/components/prompt/form/BudgetForm';
import InterestsForm from '@/components/prompt/form/InterestsForm';
import createTranslation from 'next-translate/useTranslation';
import type { Recommendation } from '@/types/recommendation';
import Client from '@/client/Client';
import type { ApiContext } from '@/client/ApiContext';
import type { GetResultRequest, GetResultResponse } from '@/client/api/GetResult/interface';

type Props = {
  placeInput: string;
  openModal: boolean;
  handleCloseModal: () => void;
  transitionToResultCallback: (newRecommendations: Recommendation[]) => void;
};

const PreferencesModal = ({
  placeInput,
  openModal,
  handleCloseModal,
  transitionToResultCallback,
}: Props) => {
  const {
    fromDate,
    handleFromDateChange,
    toDate,
    handleToDateChange,
    peopleNumber,
    handlePeopleNumberChange,
    selectedTripType,
    handleSelectTripType,
    selectedPace,
    handleSelectPace,
    selectedBudget,
    handleSelectBudget,
    selectedInterests,
    handleSelectInterest,
  } = usePreferences();

  const homeT = createTranslation('home');
  const commonT = createTranslation('common');

  const lang = homeT.lang;
  const ht = homeT.t;
  const ct = commonT.t;

  // eslint-disable-next-line complexity
  const handleSubmit = async () => {
    let serverResponse: GetResultResponse;
    try {
      serverResponse = await Client.getResult(
        { useMock: false, requireAuth: false } as ApiContext,
        {
          place: placeInput,
          date_from: fromDate ? fromDate.toISOString() : '',
          date_to: toDate ? toDate.toISOString() : '',
          people_num: peopleNumber,
          budget: selectedBudget.length ? selectedBudget : null,
          trip_pace: selectedPace.length ? selectedPace : null,
          interests: selectedInterests.length ? selectedInterests : null,
          trip_type: selectedTripType.length ? selectedTripType : null,
        } as GetResultRequest,
      );
    } catch (error) {
      console.log(error);
      return;
    }
    handleCloseModal();
    transitionToResultCallback(serverResponse.recommendations);
  };

  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>
        {lang === 'ja'
          ? `${placeInput}${ht('dialog-title')}`
          : `${ht('dialog-title')} ${placeInput}`}
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <DialogContentText>{ht('dialog-content')}</DialogContentText>
        <DateRangeForm
          fromDate={fromDate}
          handleFromDateChange={handleFromDateChange}
          toDate={toDate}
          handleToDateChange={handleToDateChange}
        />
        <PeopleNumberForm
          peopleNumber={peopleNumber}
          handlePeopleNumberChange={handlePeopleNumberChange}
        />
        <TripTypeForm
          selectedTripTypes={selectedTripType}
          handleSelectTripType={handleSelectTripType}
        />
        <PaceForm selectedPace={selectedPace} handleSelectPace={handleSelectPace} />
        <BudgetForm selectedBudget={selectedBudget} handleSelectBudget={handleSelectBudget} />
        <InterestsForm
          selectedInterests={selectedInterests}
          handleSelectInterest={handleSelectInterest}
        />
      </DialogContent>
      <DialogActions sx={{ margin: 3 }}>
        <Button onClick={handleCloseModal}>{ct('cancel')}</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!fromDate || !toDate}>
          {ct('finish')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreferencesModal;
