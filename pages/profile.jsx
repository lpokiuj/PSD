import React from 'react';
import { createStyles, Image, Text, Group, SimpleGrid, Button, Title, Divider } from '@mantine/core';
import { Mail } from 'tabler-icons-react';
import Layout from "../components/Layout"

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export default function UserInfoIcons() {
  const { classes } = useStyles();
  return (
    <Layout>
      <div>
        <SimpleGrid cols={2}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: '92vh',
            paddingInline: 46,
            textAlign: 'center',
          }}>
          <Image src={'./assets/profile.svg'} size={100} mt={50} radius="md" />
          <div

          >
            <Button size="xs" color="gray" mb={20}>
              Choose Profile Picture
            </Button>

            <Title size="xl" sx={{ textTransform: 'uppercase', color: "#00A3FF" }} weight={700}  >
              Martinus Andika N
            </Title>

            <p size="lg" weight={500} className={classes.name}>
              I am pursuing computer science because I have been fascinated by technologies in general and computers in particular from the beginning.
            </p>

            <Divider mt={25} mb={25} />
            <Title sx={{ color: '#00A3FF' }}>EMAIL</Title>

            <Group noWrap spacing={10} mt={3}
              style={{
                justifyContent: 'center'
              }}
            >
              <Mail size={36} className={classes.icon} />
              <Text size="xl" color="dimmed">
                idiotcolony97@gmail.com
              </Text>
            </Group>

          </div>
        </SimpleGrid>
      </div>
    </Layout>
  );
}