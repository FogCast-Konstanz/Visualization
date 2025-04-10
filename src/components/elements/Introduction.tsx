import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { layoutConfig, useColor } from '../style';


type IntroductionFormat = { header: string; text: string };

export default function Introduction({ header, text }: IntroductionFormat) {
    return (
        <>
            <Card
                bg={useColor('background')}
                color={useColor('text')}
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