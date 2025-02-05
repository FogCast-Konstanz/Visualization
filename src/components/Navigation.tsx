import { Flex, Heading, HStack, IconButton, Link, ListItem, Menu, MenuButton, MenuItem, MenuList, UnorderedList, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react'
import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next';
import Settings from './Menu';



export default function Navigation() {
  const { t } = useTranslation();

  const navigation = [
    { name: t('navigation.models'), href: '#' },
    { name: t('navigation.station'), href: '#' },
    { name: t('navigation.data'), href: '#' },
    { name: t('navigation.lexikon'), href: "/lexikon" },
    { name: t('navigation.phenomena'), href: "/phenomena" },
    { name: t('impressum.title'), href: "/impressum" }
  ]


  return (
    <>
      <Flex
        display={{ lg: 'flex', base: 'none' }}
        height={'100dvh'}
        padding={'20px'}
        direction='column'
        justify={'space-between'}
        bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
      >
        <div>
          <Link href='/'><Heading size="2xl">{t('title')}</Heading></Link>
          <Heading size="lg">{t('subtitle')}</Heading>
        </div>

        <div>
          <UnorderedList fontSize="xl" margin={'0'} listStyleType={'none'}>
            {navigation.map((entry, index) => (
              <ListItem marginBottom={'10px'} key={index}><Link href={entry.href}>{entry.name}</Link></ListItem>
            ))}
          </UnorderedList>

          <Settings></Settings>
        </div>

      </Flex>

      <Flex
        display={{ lg: 'none', base: 'flex' }}
        direction='row'
        justify={'space-between'}
        width={'100vw'}
        position={'sticky'}
        top={'0'}
        zIndex={'1'}
        bg={useColorModeValue('custom_light.surface', 'custom_dark.surface')}
      >
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
            margin='10px'
          />
          <MenuList>
            {navigation.map((entry, index) => (
              <MenuItem marginBottom={'10px'} key={index}><Link href={entry.href}>{entry.name}</Link></MenuItem>
            ))}
          </MenuList>
        </Menu>

        <Heading size="2xl">{t('title')}</Heading>

        <Settings></Settings>
      </Flex>
    </>

  )
}
