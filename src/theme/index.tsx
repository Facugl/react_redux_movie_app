import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import { useAppSelector } from '@/hooks/redux';

interface Props {
  children: React.ReactNode;
}

const MuiThemeProvider: React.FC<Props> = ({
  children
}: {
  children: Props['children'];
}) => {
  const { themeMode } = useAppSelector((state) => state.settings);

  const isLight = themeMode === 'light';

  const theme = createTheme({
    palette: {
      mode: isLight ? 'light' : 'dark',
      primary: {
        main: '#42a8bc'
      },
      secondary: {
        main: '#eb9a75'
      }
    }
  });

  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MuiThemeProvider;
