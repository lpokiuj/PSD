import { Text, Box, Button, SimpleGrid } from '@mantine/core';
import HeaderTabs from "../components/AppHeader"
import Link from 'next/dist/client/link';

export default function Index() {
  return (
    <div>
      <HeaderTabs user={{ image: '', username: 'Username' }}  />
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#00A3FF',
          height: '94vh',
          paddingInline: 46
        }}
      >
        <Text style={{ fontSize: 64, lineHeight: 1, textAlign: 'center' }}>Welcome To</Text>
        <Text style={{ fontSize: 128, fontWeight: 700, lineHeight: 1, textAlign: 'center' }}>AI.URUS</Text>
        <Text style={{ fontSize: 48, textAlign: 'center', paddingBlockEnd: 50}}>A place where you can manage you or your following affairs...</Text>
        <Link href="/register" passHref>
          <Button size='xl' uppercase>Register Now</Button>
        </Link>
      </Box>
    </div>
  )
}
