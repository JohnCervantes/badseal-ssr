import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "./EmblaCarouselButtons";
import { useRecursiveTimeout } from "./useRecursiveTimeout";
import { useEmblaCarousel } from "embla-carousel/react";
import Image from "next/image";

const AUTOPLAY_INTERVAL = 10000;
const PARALLAX_FACTOR = 0.8;

function FeaturedEmblaCarousel({ projectImages }) {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    dragFree: true,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [parallaxValues, setParallaxValues] = useState([]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  const autoplay = useCallback(() => {
    if (!embla) return;
    if (embla.canScrollNext()) {
      embla.scrollNext();
    } else {
      embla.scrollTo(0);
    }
  }, [embla]);

  const { play, stop } = useRecursiveTimeout(autoplay, AUTOPLAY_INTERVAL);

  const scrollPrev = useCallback(
    () => embla && embla.scrollPrev(),
    [embla, stop]
  );
  const scrollNext = useCallback(
    () => embla && embla.scrollNext(),
    [embla, stop]
  );

  const onScroll = useCallback(() => {
    if (!embla) return;

    const engine = embla.dangerouslyGetEngine();
    const scrollProgress = embla.scrollProgress();

    const styles = embla.scrollSnapList().map((scrollSnap, index) => {
      if (!embla.slidesInView().includes(index)) return 0;
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.getTarget();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      return diffToTarget * (-1 / PARALLAX_FACTOR) * 100;
    });
    setParallaxValues(styles);
  }, [embla, setParallaxValues]);

  useEffect(() => {
    if (!embla) return;
    play();
    onSelect();
    onScroll();
    embla.on("select", onSelect);
    embla.on("scroll", onScroll);
    embla.on("resize", onScroll);
  }, [embla, onSelect, onScroll, play]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {JSON.parse(projectImages).map((image, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__inner">
                <div
                  className="embla__slide__parallax"
                  style={{ transform: `translateX(${parallaxValues[index]}%)` }}
                >
                  <Image
                    //className="embla__slide__img"
                    layout="fill"
                    // width="350px"
                    // height="200px"
                    src={image[Object.keys(image)[0]]}
                    quality="100"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="

                    //lurDataURL={image.blurDataURL}
                    //alt="Picture of the missing pet"
                    //placeholder="blur"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
    </div>
  );
}

export default FeaturedEmblaCarousel;

// import React from 'react'
// import 'keen-slider/keen-slider.min.css'
// import { useKeenSlider } from 'keen-slider/react'

// export const Test = () => {
//   const [sliderRef] = useKeenSlider({ loop: true })

//   return (<div ref={sliderRef} className="keen-slider">
//     <div class="keen-slider__slide "><Image src="https://images.dog.ceo/breeds/spaniel-irish/n02102973_3750.jpg" width="300px" height="300px"></Image></div>
//     <div class="keen-slider__slide "><Image src="https://images.dog.ceo/breeds/spaniel-irish/n02102973_3750.jpg" width="300px" height="300px"></Image></div>
//     <div class="keen-slider__slide "><Image src="https://images.dog.ceo/breeds/spaniel-irish/n02102973_3750.jpg" width="300px" height="300px"></Image></div>
//   </div>)
// }

// export default Test
