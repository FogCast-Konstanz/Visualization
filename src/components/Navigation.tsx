import { Flex, Heading, Link, ListItem, UnorderedList, useColorMode, useColorModeValue } from '@chakra-ui/react'
import Menu from './Menu'
import { useTranslation } from 'react-i18next';

export default function Navigation() {
  const { t } = useTranslation();

  return (
    <>
      <Flex height={'100dvh'} padding={'20px'} direction='column' justify={'space-between'} bg={useColorModeValue('custom_light.background', 'custom_dark.background')}>
        <div>
          <Heading size="2xl">{t('title')}</Heading>
          <Heading size="lg">{t('subtitle')}</Heading>
        </div>

        <Menu></Menu>

        <UnorderedList fontSize="xl" margin={'0'} listStyleType={'none'}>
          <ListItem marginBottom={'10px'}><Link href='#'>{t('navigation.models')}</Link></ListItem>
          <ListItem marginBottom={'10px'}><Link href="#">{t('navigation.station')}</Link></ListItem>
          <ListItem marginBottom={'10px'}><Link href="#">{t('navigation.data')}</Link></ListItem>
          <ListItem marginBottom={'10px'}><Link href="/lexikon">{t('navigation.lexikon')}</Link></ListItem>
          <ListItem marginBottom={'10px'}><Link href="/phenomena">{t('navigation.phenomena')}</Link></ListItem>
        </UnorderedList>
      </Flex>
    </>
  )
}
