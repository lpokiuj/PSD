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
import { useForm, formList, joiResolver } from '@mantine/form'
import Joi from 'joi';
import Link from 'next/link';
import { showNotification, updateNotification } from '@mantine/notifications';
import { CheckIcon } from '@radix-ui/react-icons';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#00A3FF'
  },

  form: {
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
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
  username: Joi.string().min(2).message('Name should have at least 2 characters').required(),
  email: Joi.string().email({ tlds: { allow: false } }).message('Invalid email').required(),
  password: Joi.string().min(8).pattern(new RegExp('[a-zA-Z0-9]{3,30}$')).required(),
  repeatPassword: Joi.string().valid(Joi.ref('password')).required(),
})
  .xor('password', 'access')
  .with('passwrod', 'repeatPassword');

schema.validate({
})

export default function RegisterPage() {
  const { classes } = useStyles();
  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      users: formList([{ username: '', email: '', password: '', repeatPassword: '' }])
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
              <Title order={2} mb="lg" align="center">REGISTER ACCOUNT</Title>

              <TextInput
                label="Username"
                value={form.values.username}
                onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                placeholder="username"
                size="md"
                required
              />
              <Text size="sm" color="dimmed">Username must unique</Text>

              <TextInput
                label="Email"
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                placeholder="username or your@email.com"
                {...form.getInputProps('email')}
                mt="md"
                size="md"
                required
              />
              <Text size="sm" color="dimmed">Input a valid email address</Text>

              <PasswordInput
                label="Password"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                placeholder="password"
                {...form.getInputProps('password')}
                mt="md"
                size="md"
                required
              />
              <Text size="sm" color="dimmed">Password must contain at least 8 characters including an uppercase letter, a symbol, and a number</Text>

              <PasswordInput
                label="Repeat password"
                value={form.values.repeatPassword}
                onChange={(event) => form.setFieldValue('repeatPassword', event.currentTarget.value)}
                placeholder="repeat password"
                {...form.getInputProps('repeatPassword')}
                mt="md"
                size="md"
                required
              />

                <Button
                  type="register"
                  fullWidth
                  mt="xl"
                  size="md"
                  onClick={() => {
                    form.addListItem('users', { username: '', email: '', password: '', repeatPassword: '' });
                    showNotification({
                      id: 'load-data',
                      loading: true,
                      title: 'Loading your data',
                      message: 'Email verification will be send in 3 seconds, you cannot close this yet',
                      autoClose: false,
                      disallowClose: true,
                    });

                    setTimeout(() => {
                      updateNotification({
                        id: 'load-data',
                        color: 'teal',
                        title: 'Data was loaded',
                        message: 'Notification will close in 2 seconds, you can close this notification now',
                        icon: <CheckIcon />,
                        autoClose: 2000,
                      });
                    }, 3000);
                  }}
                >
                  Register
                </Button>

              <Text align="center" mt="md">
                Already have an account?{' '}
                <Link href="/login" passHref>
                  <Anchor weight={700}>
                    Login
                  </Anchor>
                </Link>
              </Text>

            </form>
          </Container>
        </Paper>
      </SimpleGrid>
    </div >
  );
}

