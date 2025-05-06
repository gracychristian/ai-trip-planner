import { Box } from "@mui/material";
import { useState } from "react";
import '../../styles/Carousel.scss'
import ImageTransition from "../common/ImageTransition";

const DestinationCarousel = () => {
    const [stateIndex, setStateIndex] = useState<number>();
    const images = [
        'https://images.unsplash.com/photo-1560306247-e251d8429306?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80',
        'https://images.unsplash.com/photo-1560305527-51dc8ad5a8f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1425&q=80',
        'https://images.unsplash.com/photo-1560306796-3238e049ff45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    ];

    const gotoSlide = (selectedIndex: number) => {
        if (stateIndex !== selectedIndex) {
            // reset the timer
            // clearInterval(sliderInterval);
            // creatSlideInterval();

            // set slider to selected index
            setStateIndex(selectedIndex);
        }
    }

    // const creatSlideInterval() {
    //     sliderInterval = setInterval(() => {
    //         // change state s
    //         setState((prevS) => ({
    //             index: mod(prevS.index + 1, this.images.length),
    //         }));
    //     }, this.duration);
    // }

    return (
        <Box>
            <div className="slider-controller-container">
                {/* <ImageTransition slideIndex={stateIndex} images={images} /> */}
                {/* <TextTransition textIndex={this.state.index} /> */}
                {/* <div className="selectors">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className={`carousel-selector ${i == stateIndex ? 'selector-active' : ''
                                }`}
                            onClick={(e) => gotoSlide(i)}
                        />
                    ))}
                </div> */}
                <img style={{height: "100%", objectFit: "fill", width: "100%"}} src="https://cdn.pixabay.com/photo/2016/03/01/13/38/sailing-boats-1230404_1280.jpg" alt="nature" />
            </div>
        </Box>
    );
}

export default DestinationCarousel;