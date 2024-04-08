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

  get containerWidth(): number {
    return this.cardWidth * this.totalElements + this.gap * (this.totalElements - 1)
  }

  get maskWidth(): number {
    return this.cardWidth * this.maxElements + this.gap * (this.maxElements - 1)
  }

  get step(): number {
    return this.gap + this.cardWidth ?? 50
  }

  get containerDiff(): number {
    return Math.abs(this.maskWidth - this.containerWidth)
  }

  get halfContainerDiff(): number {
    return this.containerDiff / 2
  }

  allowMovementLeft(): boolean {
    return -1 * this.halfContainerDiff < this.containerStart
  }

  allowMovementRight(): boolean {
    return this.halfContainerDiff > this.containerStart
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
