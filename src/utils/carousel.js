const SCROLL_EPSILON = 2

export function getCarouselState({ scrollLeft, clientWidth, scrollWidth }) {
  const maxScrollLeft = Math.max(0, scrollWidth - clientWidth)
  return {
    isScrollable: maxScrollLeft > SCROLL_EPSILON,
    canScrollPrev: scrollLeft > SCROLL_EPSILON,
    canScrollNext: scrollLeft < maxScrollLeft - SCROLL_EPSILON,
  }
}

export function getSnapPositions({ snapOffsets, maxScrollLeft }) {
  if (maxScrollLeft <= SCROLL_EPSILON) return []
  const positions = [0, ...snapOffsets.filter(Number.isFinite), maxScrollLeft]
    .map(position => Math.min(Math.max(0, position), maxScrollLeft))
    .sort((a, b) => a - b)
  return positions.filter((position, index) => index === 0 || position - positions[index - 1] > SCROLL_EPSILON)
}

export function getPaginationState({ snapOffsets, maxScrollLeft }) {
  const positions = getSnapPositions({ snapOffsets, maxScrollLeft })
  return {
    positions,
    isScrollable: positions.length > 0,
  }
}

export function getClosestSnapIndex(scrollLeft, snapPositions) {
  if (!snapPositions.length) return 0
  return snapPositions.reduce((closestIndex, position, index) => Math.abs(position - scrollLeft) < Math.abs(snapPositions[closestIndex] - scrollLeft) ? index : closestIndex, 0)
}
