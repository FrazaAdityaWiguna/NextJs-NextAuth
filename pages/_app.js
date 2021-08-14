import '../styles/globals.css';
import { Provider as AuthProvider } from 'next-auth/client';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <ChakraProvider>
        <Component {...pageProps} />;
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
