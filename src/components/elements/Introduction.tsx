import { Card, CardBody, CardHeader, Flex, Heading } from '@chakra-ui/react';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { layoutConfig, useColor } from '../style';


type IntroductionFormat = { header: string; text: string; headerContent?: React.ReactNode };

export default function Introduction({ header, text, headerContent }: IntroductionFormat) {
    return (
        <>
            <Card
                bg={useColor('background')}
                color={useColor('text')}
                width={'100%'}
                borderRadius={layoutConfig.borderRadius}
            >
                <CardHeader pb={'0px'}>
                    <Flex alignItems="center" gap={2} flexWrap="wrap">
                        <Heading minW={0} overflowWrap="anywhere">{header}</Heading>
                        {headerContent}
                    </Flex>
                </CardHeader>
                <CardBody className='markdown'>
                    <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
                </CardBody>
            </Card>
        </>
    )
}