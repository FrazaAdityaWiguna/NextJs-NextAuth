import { getProviders, signIn, getSession, getCsrfToken } from 'next-auth/client';
import { Box, Button, Flex, Heading, Input, Container, Stack } from '@chakra-ui/react';

console.log('getSession', getSession);
export default function SignIn({ providers, csrfToken }) {
  console.log(providers);
  console.log(csrfToken);
  return (
    <Container maxW='xl' centerContent>
      <Heading as='h1' textAlign='center'>
        Welcome to our custom page
      </Heading>
      <Box alignContent='center' justifyContent='center' marginTop={12}>
        <Box className='email-form'>
          <form method='post' action='/api/auth/signin/email'>
            <Input name='csrfToken' type='hidden' defaultValue={csrfToken} />
            <label>
              Email address
              <Input type='text' id='email' name='email' />
            </label>
            <Button type='submit'>Use your Email</Button>
          </form>
        </Box>
        <Stack isInline marginTop={12}>
          {Object.values(providers).map((provider) => {
            if (provider.name === 'Email') {
              return;
            }
            return (
              <Box key={provider.name}>
                <Button variant='outline' onClick={() => signIn(provider.id, { callbackUrl: 'http://localhost:3000/' })}>
                  Sign in with {provider.name}
                </Button>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Container>
  );
}

// SignIn.getInitialProps = async (context) => {
//   const { req, res } = context;
//   const session = await getSession({ req });

//   if (session && res && session.accessToken) {
//     res.writeHead(302, {
//       Location: '/',
//     });
//     res.end();
//     return;
//   }

//   return {
//     session: undefined,
//     providers: await providers(context),
//     csrfToken: await csrfToken(context),
//   };
// };

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();

  return {
    props: { providers, csrfToken },
  };
}
