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
  const [controller, setController] = useState<CarouselController>(new CarouselController({} as CarouselControllerArgs))

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
    if (elements.length > 0 && cardRef.current) {
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

  return (
    <>
      <section className="carousel centered">
        {controller.showArrows && (
          <div
            className="carousel__button carousel__button--arrow carousel__button--arrow-left carousel__button--animated carousel__button--shadowed"
            onClick={moveRight}
          />
        )}

        <div className="carousel__mask" style={{ width: `${controller.maskWidth}px` }}>
          <div
            className="carousel__container"
            style={{ transform: `translateX(${controller.containerStart}px)`, gap: `${gap}px` }}
          >
            {elements.map((card) => (
              <div key={card.key} ref={cardRef}>
                {card}
              </div>
            ))}
          </div>
        </div>

        {controller.showArrows && (
          <div
            className="carousel__button carousel__button--arrow carousel__button--arrow-right carousel__button--animated carousel__button--shadowed"
            onClick={moveLeft}
          />
        )}
      </section>
    </>
  )
}
