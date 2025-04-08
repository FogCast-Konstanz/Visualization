import { HamburgerIcon } from '@chakra-ui/icons';
import { Flex, Heading, Icon, IconButton, Link, ListItem, Menu, MenuButton, MenuItem, MenuList, Text, UnorderedList, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaDatabase } from "react-icons/fa";
import { FaBolt, FaBook, FaChartSimple, FaCircleInfo, FaRankingStar, FaSatellite } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { useLocation } from 'react-router-dom';
import Settings from './Menu';
import StatusBadge from './StatusBadge';
import { layoutConfig, useColor, useSurfaceColor, useTextColor } from './style';

export default function Navigation() {
  const { t } = useTranslation();

  const navigation = [
    { name: t('navigation.home'), href: '/', icon: GoHomeFill },
    { name: t('navigation.models'), href: '/models', icon: FaChartSimple },
    { name: t('navigation.analysis'), href: '/analysis', icon: FaRankingStar },
    { name: t('navigation.data'), href: '/data', icon: FaDatabase },
    { name: t('navigation.station'), href: '/station', icon: FaSatellite },
    { name: t('navigation.lexikon'), href: "/lexikon", icon: FaBook },
    { name: t('navigation.phenomena'), href: "/phenomena", icon: FaBolt },
    { name: t('impressum.title'), href: "/impressum", icon: FaCircleInfo }
  ]

  const location = useLocation();
  function isActive(href: string): boolean { return location.pathname === href; }

  return (
    <>
      <Flex
        display={{ lg: 'flex', base: 'none' }}
        height={layoutConfig.navBar.height}
        width={layoutConfig.navBar.width}
        padding={layoutConfig.padding}
        direction='column'
        justify={'space-between'}
        bg={useColor('background')}
      >
        <div>
          <Link href='/' _hover={{ textDecoration: "none" }}><Heading size="2xl">{t('title')}</Heading></Link>
          <Heading size="lg">{t('subtitle')}</Heading>
          <StatusBadge></StatusBadge>
        </div>


        <div>
          <UnorderedList fontSize="xl" margin={0} listStyleType="none">
            {navigation.map((entry, index) => (
              <ListItem
                key={index}
                marginBottom={layoutConfig.margin}
                _hover={{ bg: useColor('surface') }}
                bg={isActive(entry.href) ? useColor('surface') : 'transparent'}
                borderRadius={layoutConfig.buttonBorderRadius}
                pl={layoutConfig.padding}
              >
                <Link
                  href={entry.href}
                  display="flex"
                  pl={layoutConfig.padding}
                  alignItems="center"
                  padding="8px 12px"
                  textDecoration='none'
                  _hover={{ textDecoration: "none" }}
                >
                  <Icon as={entry.icon} boxSize={5} />
                  <Text pl={layoutConfig.padding}>{entry.name}</Text>
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
          <Settings></Settings>
        </div>
      </Flex>

      {/* Mobile Mode Navigation */}
      <Flex
        display={{ lg: 'none', base: 'flex' }}
        direction='row'
        justify={'space-between'}
        width={'100vw'}
        position={'sticky'}
        top={'0'}
        zIndex={'1'}
        bg={useColor('surface')}
      >
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
            margin={layoutConfig.margin}
          />
          <MenuList
            background={useColor('background')}
            textColor={useColor('text')}
            borderColor={useColor('surface')}
          >
            {navigation.map((entry, index) => (
              <MenuItem
                icon={<Icon as={entry.icon} boxSize={4} />}
                marginBottom={layoutConfig.margin}
                key={index}
                onClick={() => window.location.href = entry.href}
                background={useColor('background')}
                _hover={{background: useColor('background')}}
              >
                <Link href={entry.href}>{entry.name}</Link>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <Link href='/'><Heading size="2xl">{t('title')}</Heading></Link>

        <Settings></Settings>
      </Flex>
    </>

  )
}
