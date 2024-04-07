import React, { useEffect, useRef } from "react"
import "./Carousel.scss"

export const Carousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const carouselWrapper = carouselRef.current!
    const nextButton = document.querySelector('.next-button') as HTMLButtonElement
    const prevButton = document.querySelector('.prev-button') as HTMLButtonElement

    const itemWidth = carouselWrapper.offsetWidth / carouselWrapper.childElementCount
    let position = 0

    const handleNextClick = () => {
      position -= itemWidth
      position = Math.max(position, -(carouselWrapper.scrollWidth - carouselWrapper.offsetWidth))
      carouselWrapper.style.transition = "transform 0.5s ease"
      carouselWrapper.style.transform = `translateX(${position}px)`
    }

    const handlePrevClick = () => {
      position += itemWidth
      position = Math.min(position, 0)
      carouselWrapper.style.transition = "transform 0.5s ease"
      carouselWrapper.style.transform = `translateX(${position}px)`
    }

    nextButton.addEventListener('click', handleNextClick)
    prevButton.addEventListener('click', handlePrevClick)

    // Retirar los event listeners cuando el componente se desmonte
    return () => {
      nextButton.removeEventListener('click', handleNextClick)
      prevButton.removeEventListener('click', handlePrevClick)
    }
  }, []) // Se ejecuta solo una vez después de montarse el componente

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper" ref={carouselRef}>
        <div className="carousel-items">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="carousel-item">Elemento {index + 1}</div>
          ))}
        </div>
      </div>
      <button className="prev-button">&lt;</button>
      <button className="next-button">&gt;</button>
    </div>
  )
}
