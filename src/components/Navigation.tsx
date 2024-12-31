import { Flex, Heading, HStack, IconButton, Link, ListItem, Menu, MenuButton, MenuItem, MenuList, UnorderedList, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react'
import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next';
import Settings from './Menu';



export default function Navigation() {
  const { t } = useTranslation();

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
          <Heading size="2xl">{t('title')}</Heading>
          <Heading size="lg">{t('subtitle')}</Heading>
        </div>

        <Settings></Settings>

        <UnorderedList fontSize="xl" margin={'0'} listStyleType={'none'}>
          <ListItem marginBottom={'10px'}><Link href='#'>{t('navigation.models')}</Link></ListItem>
          <ListItem marginBottom={'10px'}><Link href="#">{t('navigation.station')}</Link></ListItem>
          <ListItem marginBottom={'10px'}><Link href="#">{t('navigation.data')}</Link></ListItem>
          <ListItem marginBottom={'10px'}><Link href="/lexikon">{t('navigation.lexikon')}</Link></ListItem>
          <ListItem marginBottom={'10px'}><Link href="/phenomena">{t('navigation.phenomena')}</Link></ListItem>
        </UnorderedList>
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
            <MenuItem><Link href='#'>{t('navigation.models')}</Link></MenuItem>
            <MenuItem><Link href="#">{t('navigation.station')}</Link></MenuItem>
            <MenuItem><Link href="#">{t('navigation.data')}</Link></MenuItem>
            <MenuItem><Link href="/lexikon">{t('navigation.lexikon')}</Link></MenuItem>
            <MenuItem><Link href="/phenomena">{t('navigation.phenomena')}</Link></MenuItem>
          </MenuList>
        </Menu>

        <Heading size="2xl">{t('title')}</Heading>

        <Settings></Settings>
      </Flex>
    </>

  )
}
