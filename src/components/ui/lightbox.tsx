import React, { FC, useEffect } from 'react'
import DialogContent, { Dialog } from './dialog';
import { Button } from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel';

interface LightboxProps {
    images: string[];
    open: boolean;
    onClose: () => void;
    currentIndex: number;
}
const Lightbox: FC<LightboxProps> = ({ images, open, onClose, currentIndex }) => {

    const [index, setIndex] = React.useState(currentIndex || 0);

    useEffect(() => {
        setIndex(currentIndex);
    }, [currentIndex]);

    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="p-0 max-w-3xl border-none ">
                    <Carousel opts={{ startIndex: index, loop: true }} >
                        <CarouselContent>
                            {images.map((img, i) => (
                                <CarouselItem key={i} className="flex justify-center">
                                    <img src={img} className="max-h-[80vh] object-cover rounded-md" />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default Lightbox