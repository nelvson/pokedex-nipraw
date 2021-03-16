import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import MainRoute from './routes/MainRoute';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainRoute />
      </BrowserRouter>
    </QueryClientProvider>
  );
}