window.function = function(series, numberToMove, direction) {
  // Initial validation of inputs
  if (!series || !series.value || series.value.trim() === "") {
    return ""; // Exit early if the series is not properly defined
  }

  const seriesStr = series.value.trim();
  const targetNum = parseFloat(numberToMove?.value);
  const moveDir = direction?.value?.trim().toLowerCase();

  if (isNaN(targetNum) || (moveDir !== "up" && moveDir !== "down")) {
    return seriesStr; // Exit early if inputs are invalid
  }

  // Parse and validate the series
  const numbers = seriesStr.split(',')
                           .map(str => parseFloat(str))
                           .filter(num => !isNaN(num)); // Ensure all elements are valid numbers

  const currentIndex = numbers.indexOf(targetNum);
  if (currentIndex === -1) {
    return seriesStr; // Target number not found in series
  }

  // Calculate the new index for the target number
  const newIndex = moveDir === "up" ? currentIndex - 1 : currentIndex + 1;

  // Ensure the new index is within the bounds of the array
  if (newIndex < 0 || newIndex >= numbers.length) {
    return numbers.join(','); // Return the original series if the move is not possible
  }

  // Move the target number to the new index
  numbers.splice(currentIndex, 1); // Remove the target number from its current position
  numbers.splice(newIndex, 0, targetNum); // Insert the target number at the new position

  // Generate and return the modified series as a string
  return numbers.join(',');
}
