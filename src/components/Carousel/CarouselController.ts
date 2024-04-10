export interface CarouselControllerArgs {
  containerStart: number
  totalElements: number
  maxElements: number
  cardWidth: number
  gap: number
}

export class CarouselController {
  containerStart: number
  totalElements: number
  maxElements: number
  cardWidth: number
  gap: number

  constructor(args = {} as CarouselControllerArgs) {
    this.containerStart = args.containerStart ?? 0
    this.totalElements = args.totalElements ?? 0
    this.maxElements = args.maxElements ?? args.totalElements ?? 0
    this.cardWidth = args.cardWidth ?? 0
    this.gap = args.gap ?? 0
  }

  get containerEnd(): number {
    return this.containerStart + this.containerWidth
  }

  get containerWidth(): number {
    return this.cardWidth * this.totalElements + this.gap * (this.totalElements - 1)
  }

  get maskWidth(): number {
    return this.cardWidth * this.maxElements + this.gap * (this.maxElements - 1)
  }

  get step(): number {
    return this.cardWidth ? this.gap + this.cardWidth : 50
  }

  allowMovementLeft(): boolean {
    return this.containerEnd > this.maskWidth
  }

  allowMovementRight(): boolean {
    return this.containerStart < 0
  }

  moveLeft = () => {
    this.allowMovementLeft() && (this.containerStart -= this.step)
  }

  moveRight = () => {
    this.allowMovementRight() && (this.containerStart += this.step)
  }

  get showArrows(): boolean {
    return this.containerWidth > this.maskWidth
  }
}
