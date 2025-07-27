import { Box, Card, CardBody, CardHeader, Heading, Image, Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks'; // Import the remark-breaks plugin
import { useColor } from '../style';

type Input = { header: string, body: string }
export default function CardIndividual({ header, body }: Input) {

    const [isOpen, setIsOpen] = useState(false);
    const [previewSrc, setPreviewSrc] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const onOpenPreview = (src: string, title = '') => {
        setPreviewSrc(src);
        setPreviewTitle(title);
        setIsOpen(true);
    };
    const onClose = () => {
        setIsOpen(false);
        setTimeout(() => setPreviewSrc(''), 300); // wait for modal to close
    };

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
                        img: ({ node, ...props }) => {
                            const isPreview = previewSrc === props.src && isOpen;
                            const [width, height] = (props.title?.match(/(\d+)x(\d+)/) || []).slice(1);

                            // Example: fixed width 400px, height auto to maintain aspect ratio
                            const imgStyle = {
                                padding: '10px 10px 0px 10px',
                                maxWidth: '100%',
                                width: width ? `${width}px` : '400px',
                                height: 'auto',
                            };

                            return (
                                <figure
                                    style={{
                                        float: props.alt === 'center' ? 'left' : 'right',
                                        margin: props.alt !== 'center' ? '0' : '0 auto',
                                        cursor: 'pointer',
                                        pointerEvents: isPreview ? 'none' : 'auto',
                                    }}
                                    onClick={() => onOpenPreview(props.src ?? '', props.title ?? '')}
                                >
                                    <img
                                        {...props}
                                        alt={props.alt}
                                        style={imgStyle}
                                    />
                                    {props.title && (
                                        <figcaption style={{ padding: '0px 10px'}}>
                                            <ReactMarkdown children={props.title} />
                                        </figcaption>
                                    )}
                                </figure>
                            );
                        }
                        ,
                    }}
                />
            </CardBody>
            <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
                <ModalOverlay />
                <ModalContent bg="transparent" boxShadow="none">
                    <ModalBody p={0} display="flex" flexDirection="column" alignItems="center">
                        <Image src={previewSrc} alt="Preview" w="100%" borderRadius="md" />
                        {previewTitle && (
                            <Box p={3} color="white" textAlign="center">
                                <ReactMarkdown children={previewTitle} />
                            </Box>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Card>
    )
}