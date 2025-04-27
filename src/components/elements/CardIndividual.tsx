import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';  // Import the remark-breaks plugin
import rehypeRaw from "rehype-raw";

import { useColor } from '../style';

type Input = { header: string, body: string }
export default function CardIndividual({ header, body }: Input) {

    let md = body;
    md = body.replace(/```[\s\S]*?```/g, (m) =>
        m.replace(/\n/g, "\n ")
    );
    md = md.replace(/(?<=\n\n)(?![*-])\n/g, "&nbsp;\n ");


    return (
        <Card
            bg={useColor('background')}
            color={useColor('text')}
            width={'100%'} >
            <CardHeader paddingBottom={'0'}>
                <Heading size='lg'>{header}</Heading>
                {/* <Text>{description}</Text> */}
            </CardHeader>
            <CardBody>
                {/* <Text>{t('phenomena.introduction')}</Text> */}
                <ReactMarkdown
                    children={md}
                    remarkPlugins={[remarkBreaks]}
                    components={{
                        p: ({ node, children }) => <div>{children}</div>, // Ensures paragraphs work properly
                        img: ({ node, ...props }) => (
                            <figure style={{
                                float: props.alt === 'center' ? 'left' : 'right',
                                margin: props.alt !== 'center' ? '0' : '0 auto',
                            }}>
                                <img {...props}
                                    alt={props.alt}
                                    style={{ padding: '10px 10px 0px 10px' }}
                                />
                                {props.title && <figcaption style={{ padding: '10px' }}>{<ReactMarkdown children={props.title} />}</figcaption>}
                            </figure>
                        ),
                    }}
                />
            </CardBody>
        </Card>
    )
}