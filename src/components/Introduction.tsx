import { Card, CardBody, CardHeader, Heading, useColorModeValue } from '@chakra-ui/react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { layoutConfig, useBackgroundColor, useTextColor } from './style';


type IntroductionFormat = { header: string; text: string };

export default function Introduction({ header, text }: IntroductionFormat) {
    return (
        <>
            <Card
                bg={useBackgroundColor()}
                color={useTextColor()}
                width={'100%'}
                borderRadius={layoutConfig.borderRadius}
                >
                <CardHeader pb={'0px'}>
                        <Heading>{header}</Heading>
                </CardHeader>
                <CardBody>
                    <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
                </CardBody>
            </Card>
        </>
    )
}