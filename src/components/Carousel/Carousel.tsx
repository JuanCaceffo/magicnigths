import { useState, useRef, useEffect } from 'react'
import './Carousel.scss'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { CarouselController, CarouselControllerArgs } from './CarouselController'

interface CarouselArgs {
  elements: ReactJSXElement[]
  gap?: number
  maxElements?: number
}

export const Carousel = (args: CarouselArgs) => {
  const { elements = [], gap = 8, maxElements = elements.length } = args
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [controller, setController] = useState<CarouselController>(new CarouselController({} as CarouselControllerArgs))

  // const updateContainerWidth = () => {
  //   if (carouselContainerRef.current) {
  //     const carousel = carouselContainerRef.current
  //     setController((prev) => {
  //       return new CarouselController({ ...prev, containerWidth: carousel.offsetWidth })
  //     })
  //   }
  // }

  const moveLeft = () => {
    controller.moveLeft()
    updatePosition()
  }

  const moveRight = () => {
    controller.moveRight()
    updatePosition()
  }

  const updatePosition = () => {
    setController((prev) => new CarouselController({ ...prev, containerStart: controller.containerStart }))
  }

  useEffect(() => {
    if (elements.length > 0 && containerRef.current && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth

      setController((prev) => {
        return new CarouselController({
          ...prev,
          totalElements: elements.length,
          maxElements: maxElements,
          cardWidth: cardWidth,
          gap: gap,
        })
      })
    }
  }, [elements])

  // const [offset, setOffset] = useState(0)
  // const [showButton, setShowButton] = useState(false)
  // const [carouselWidth, setCarouselWidth] = useState(0)
  // const [carouselContainerWidth, setCarouselContainerWidth] = useState(0)

  // const getWidth = useCallback((ref: React.RefObject<HTMLDivElement>) => {
  //   return ref.current ? ref.current.getBoundingClientRect().width : 0
  // }, [])

  // const setWidths = useCallback(() => {
  //   setCarouselWidth(getWidth(carouselRef))
  //   setCarouselContainerWidth(getWidth(carouselContainerRef))
  // }, [getWidth])

  // const showHideButtons = useCallback(() => {
  //   setShowButton(carouselWidth < carouselContainerWidth)
  // }, [carouselWidth, carouselContainerWidth])

  // useEffect(() => {
  //   setController( Object.assign(controller, new CarouselController())
  //   window.addEventListener('resize', setWidths)
  //   return () => window.removeEventListener('resize', setWidths)
  // }, [controller])

  // useEffect(() => {
  //   showHideButtons()
  // }, [showHideButtons])

  return (
    <>
      <section className="carousel centered">
        {controller.showArrows && (
          <div
            className="carousel__button carousel__button--arrow carousel__button--arrow-left carousel__button--animated carousel__button--shadowed"
            onClick={moveLeft}
          />
        )}

        <div className="carousel__mask centered" style={{ width: `${controller.maskWidth}px` }}>
          <div
            className="carousel__container centered"
            style={{ transform: `translateX(${controller.containerStart}px)`, gap: `${gap}px` }}
            ref={containerRef}
          >
            {elements.map((e) => (
              <div ref={cardRef}>{e}</div>
            ))}
          </div>
        </div>

        {controller.showArrows && (
          <div
            className="carousel__button carousel__button--arrow carousel__button--arrow-right carousel__button--animated carousel__button--shadowed"
            onClick={moveRight}
          />
        )}
      </section>
    </>
  )
}
