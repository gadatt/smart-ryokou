import type { Location } from '@/types/recommendation';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Box, CardMedia, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

interface LocationDetailProps {
  activeLocation: Location;
}

const LocationDetail = ({ activeLocation }: LocationDetailProps) => {
  const { t } = createTranslation('result');

  return (
    <Paper
      elevation={1}
      style={{
        position: 'absolute',
        right: '8%',
        bottom: '5%',
        width: '80%',
        padding: '16px',
        overflow: 'auto',
      }}
    >
      {/* TODO: Add reviews and images from google map, link to direction */}
      <Grid container>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            height="100px"
            width="100px"
            image={activeLocation.imageUrl}
            alt="Image"
            style={{ flex: '0 0 30%' }}
          />
        </Grid>
        <Grid item xs={7}>
          <Box style={{ flex: '0 0 70%', paddingLeft: '16px' }}>
            <Typography variant="h6">{activeLocation.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {activeLocation.description}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href={`https://www.google.com/maps?saddr=My+Location&daddr=${activeLocation.lat},${activeLocation.lng}`}
          >
            <Tooltip title={t('get-directions')}>
              <IconButton aria-label="directions">
                <DirectionsIcon color="primary" />
              </IconButton>
            </Tooltip>
          </a>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LocationDetail;
// https://www.google.com/maps?saddr=My+Location&daddr=43.12345,-76.12345
