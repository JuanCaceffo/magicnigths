import { CardColor } from "src/components/Card/CardStats/CardStats"

export const getColorForSales = (sales: number): CardColor => {

  if (sales <= 1000000) {
    return CardColor.RED
  } else if (sales <= 10000000) {
    return CardColor.YELLOW
  } else {
    return CardColor.GREEN
  }
}

export const getColorForRentability = (rentability: number): CardColor => {

  if (rentability <= 0) {
    return CardColor.RED
  } else if (rentability <= 50) {
    return CardColor.YELLOW
  } else {
    return CardColor.GREEN
  }
}

export const getColorForSoldOut = (soldOutDates: number, totalDates: number): CardColor => {
  const percentage = soldOutDates / totalDates * 100
  if (percentage <= 50) {
    return CardColor.RED
  } else if (percentage <= 75) {
    return CardColor.YELLOW
  } else {
    return CardColor.GREEN
  }
}

export const getColorForPending = (pending: number, lowestPrice: number, showCosts: number): CardColor => {
  const pivot = lowestPrice * pending

  if (pivot <= showCosts) {
    return CardColor.RED
  } else if (pivot <= showCosts * 1.5) { 
    return CardColor.YELLOW
  } else { 
    return CardColor.GREEN
  }
}


