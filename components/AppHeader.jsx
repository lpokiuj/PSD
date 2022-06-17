import { useState } from 'react';
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Divider,
  Burger,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import {
  Logout,
  Heart,
  Star,
  Message,
  Settings,
  SwitchHorizontal,
  ChevronDown,
} from 'tabler-icons-react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: '#00A3FF',
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
      }`,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  userMenu: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colors.dark[5]
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[5],
  },
    
}));

export default function HeaderTabs({ user }) {
  const { classes, theme, cx } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <Link href="/home" passHref>
            <Text component="a" color="white" style={{ fontSize: 25, fontWeight: 800 }}>AI.URUS</Text>
          </Link>

          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />

          <Menu
            size={260}
            placement="end"
            transition="pop-top-right"
            className={classes.userMenu}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            control={
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group spacing={7}>
                  <Avatar src={user.image} alt={user.username} radius="xl" size={20} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3} color="white">
                    {user.username}
                  </Text>
                  <ChevronDown size={12} color="white" />
                </Group>
              </UnstyledButton>
            }
          >
            <Menu.Item icon={<Heart size={14} color={theme.colors.red[6]} />}>
              Liked posts
            </Menu.Item>
            <Menu.Item icon={<Star size={14} color={theme.colors.yellow[6]} />}>
              Saved posts
            </Menu.Item>
            <Menu.Item icon={<Message size={14} color={theme.colors.blue[6]} />}>
              Your comments
            </Menu.Item>

            <Divider />
            
            <Menu.Label>Settings</Menu.Label>
            <Link href="/profile" passHref>
              <Menu.Item icon={<Settings size={14} />}>Account settings</Menu.Item>
            </Link>
            <Menu.Item icon={<SwitchHorizontal size={14} />}>Change account</Menu.Item>
            <Link href="/" passHref>
              <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>
            </Link>

          </Menu>
        </Group>
      </Container>
    </div>
  );
}