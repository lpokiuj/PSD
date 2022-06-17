import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  SimpleGrid,
  Stack,
  Image,
  Container
} from '@mantine/core';
import { useForm } from '@mantine/form'
import Link from 'next/link';
import Joi from 'joi';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#00A3FF'
  },

  form: {
    height: '100vh',

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).message('Invalid email').required(),
  password: Joi.string().min(8).pattern(new RegExp('[a-zA-Z0-9]{3,30}$')).required(),
})
  .xor('password', 'access')
  .with('passwrod', 'repeatPassword');

schema.validate({
})

export default function LoginPage() {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validate: {
      // username: (value) => (value.match ? null : 'Username must unique'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 8 ? 'Passwords should contain at least 8 characters including an uppercase letter, a symbol, and a number' : null),
    },
  })
  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={2} spacing={0}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: "100vh",
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: 'white',
              height: '100%',
              paddingInline: 46
            }}
          >
            <Stack
              spacing={4}
              style={{
                maxWidth: 400,
              }}
            >
              <Text style={{ fontSize: 64, lineHeight: 1 }}>Welcome To</Text>
              <Link href="/" passHref>
                <Text style={{ fontSize: 128, fontWeight: 700, lineHeight: 1 }}>AI.URUS</Text>
              </Link>
            </Stack>
            <Text style={{ fontSize: 48 }}>A place where you can manage you or your following affairs...</Text>
          </div>

          <Image
            src="/assets/Pattern.svg"
            width="100%"
            mt="auto"
          />
        </div>

        <Paper className={classes.form} radius={0}>
          <Container style={{
            display: 'grid',
            height: '100vh',
            placeItems: 'center'
          }}>
            <form
              onSubmit={form.onSubmit((values) => console.log(values))}
              style={{
                width: 'min(550px, 100%)',
                marginInline: 'auto'
              }}
            >
              <Title order={2} mb="lg" align="center">LOGIN ACCOUNT</Title>

              <TextInput
                label="Username / Email address"
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                placeholder="username or your@email.com"
                mt="md"
                size="md"
                required
              />

              <PasswordInput
                label="Password"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                placeholder="password"
                mt="md"
                size="md"
                required
              />

              <Button fullWidth mt="xl" size="md" >
                Login
              </Button>

              <Text align="center" mt="md">
                Don't have an account?{' '}
                <Link href="/register" passHref>
                  <Anchor weight={700}>
                    Register
                  </Anchor>
                </Link>
              </Text>
            </form>
          </Container>
        </Paper>
      </SimpleGrid>
    </div>
  );
}