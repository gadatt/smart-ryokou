import Prompt from '@/components/recommendation/prompt/Prompt';
import { Container, Box, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

const Home = () => {
  const { t } = createTranslation('common');

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100dvh"
        maxWidth="100%"
      >
        <Typography variant="h1" component="h1">
          {t('title')}
        </Typography>
        <Prompt />
      </Box>
    </Container>
  );
};

export default Home;
