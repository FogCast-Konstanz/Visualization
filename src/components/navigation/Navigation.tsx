import { useState } from 'react'
import './Navigation.scss'
import { Box, Heading, Link, List, ListItem, UnorderedList } from '@chakra-ui/react'

export default function Navigation() {
  return (
    <>
      <Box bg={'custom.background'} color={'custom.text'} className='navigation'>
        <div>
          <Heading size="2xl">FogCast</Heading>
          <Heading size="lg">in Konstanz</Heading>
        </div>

        <UnorderedList fontSize="xl">
          <ListItem><Link href='#'>Modelle</Link></ListItem>
          <ListItem><Link href="#">Station</Link></ListItem>
          <ListItem><Link href="#">Daten</Link></ListItem>
          <ListItem><Link href="/lexikon">Lexikon</Link></ListItem>
          <ListItem><Link href="#">Phänomene</Link></ListItem>
        </UnorderedList>
      </Box>
    </>
  )
}
