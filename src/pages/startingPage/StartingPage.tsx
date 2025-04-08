import { Flex, Heading, Select, useColorModeValue } from '@chakra-ui/react'


import { useTranslation } from 'react-i18next'
import StandardMode from './modes/Standard'
import { useState } from 'react';
import AdvancedMode from './modes/Advanced';
import { layoutConfig, useColor, useSurfaceColor, useTextColor } from '../../components/style';


// const userModes = ['Standard', 'Advanced', 'Segler']

const userModes = [
  { label: "Standard", code: "1" },
  { label: "Advanced", code: "2" },
  { label: "Segler", code: "3" },
];

export default function StartingPage() {
  const { t } = useTranslation();

  const [userMode, setUserMode] = useState<number>(Number(localStorage.getItem('userMode') ?? 1) ?? 1)

  function changeUserMode(mode: number) {
    setUserMode(mode);
    localStorage.setItem('userMode', mode.toString())
  }

  return (
    <Flex direction='column' width={{ lg: layoutConfig.pageWidth, base: 'calc(100vw - 20px)' }}gap={layoutConfig.gap} margin={layoutConfig.margin} maxWidth={'100%'} overflow={'hidden'} overflowY={'auto'} height={'calc(100dvh - 20px)'}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Heading>{t('startingPage.title')}</Heading>

        <Select
          defaultValue={userMode}
          onChange={(e) => changeUserMode(Number(e.target.value))}
          width={'fit-content'}
          bg={useColor('background')}
          color={useColor('text')}
          _focus={{ borderColor: useColor('background') }}
          sx={{
            option: {
              background: useColor('background'),
              color: useColor('text'),
              _hover: { background: useColor('background') }
            },
          }}
        >
          {userModes.map(({code, label}) => (
            <option
              key={code}
              value={code}
              color={useColor('text')}
            >
              {label}
            </option>
          ))}
          
        </Select>

      </Flex>

      { userMode == 1 ? <StandardMode></StandardMode> 
        : userMode == 2 ? <AdvancedMode></AdvancedMode> 
        : <></>
    }
    </Flex>
  )
}
