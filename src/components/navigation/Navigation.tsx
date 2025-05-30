import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Icon, IconButton, Image, Link, ListItem, Menu, MenuButton, MenuItem, MenuList, Text, UnorderedList, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaDatabase } from "react-icons/fa";
import { FaBolt, FaBook, FaChartSimple, FaCircleInfo, FaRankingStar, FaSatellite } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { useLocation } from 'react-router-dom';
import { layoutConfig, useColor } from '../style';
import Settings from './Menu';
import StatusBadge from './StatusBadge';

export default function Navigation() {
  const { t } = useTranslation();

  const groupedNavigation = [
    {
      title: t('navigation.main'),
      items: [
        { name: t('navigation.home'), href: '/', icon: GoHomeFill },
        { name: t('navigation.station'), href: '/station', icon: FaSatellite },
      ],
    },
    {
      title: t('navigation.data'),
      items: [
        { name: t('navigation.models'), href: '/models', icon: FaChartSimple },
        { name: t('navigation.analysis'), href: '/analysis', icon: FaRankingStar },
        { name: t('navigation.data'), href: '/data', icon: FaDatabase },
      ],
    },
    {
      title: t('navigation.info'),
      items: [
        { name: t('navigation.phenomena'), href: '/phenomena', icon: FaBolt },
        { name: t('navigation.lexikon'), href: '/lexikon', icon: FaBook },
        { name: t('impressum.title'), href: '/impressum', icon: FaCircleInfo },
      ],
    },
  ];

  const location = useLocation();
  const logo = useColorModeValue('/logo-light.png', '/logo-dark.png');

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
          <Link href='/' _hover={{ textDecoration: "none" }}>
            <Image src={logo} alt={t('title')} paddingTop={layoutConfig.padding} />
          </Link>
          <StatusBadge></StatusBadge>
        </div>


        <div>
          {groupedNavigation.map((group, i) => (
            <Box key={i} mb={4}>
              <Text fontSize="sm" fontWeight="bold" color={useColor('textVariant')} px={layoutConfig.padding}>
                {group.title}
              </Text>
              <UnorderedList fontSize="xl" m={0} listStyleType="none">
                {group.items.map((entry, index) => (
                  <ListItem
                    key={index}
                    mb={layoutConfig.margin}
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
            </Box>
          ))}
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
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            margin={layoutConfig.margin}
          />
          <MenuList
            background={useColor('background')}
            textColor={useColor('text')}
            borderColor={useColor('surface')}
          >
            {groupedNavigation.map((group, i) => (
              <Box key={i} px={2} py={1}>
                <Text fontSize="sm" fontWeight="bold" color={useColor('textVariant')} px={2}>
                  {group.title}
                </Text>
                {group.items.map((entry, index) => (
                  <MenuItem
                    key={index}
                    icon={<Icon as={entry.icon} boxSize={4} />}
                    onClick={() => window.location.href = entry.href}
                    background={useColor('background')}
                    _hover={{ background: useColor('surface') }}
                  >
                    {entry.name}
                  </MenuItem>
                ))}
              </Box>
            ))}
          </MenuList>
        </Menu>
        <Link href='/'><Heading size="2xl">{t('title')}</Heading></Link>

        <Settings></Settings>
      </Flex>
    </>

  )
}
