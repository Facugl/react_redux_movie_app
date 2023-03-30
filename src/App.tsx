import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer, Header, Home, MovieDetail, PageNotFound } from '@/components';
import { Provider } from 'react-redux';
import MuiThemeProvider from '@/theme';
import store, { persistor } from '@/redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MuiThemeProvider>
          <CssBaseline />
          <Router>
            <Header />
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:imdbID" element={<MovieDetail />} />
                <Route path="/*" element={<PageNotFound />} />
              </Routes>
            </Container>
            <Footer />
          </Router>
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
