interface FocusElementByIdProps {
  elementId: string;
  smoothScroll?: boolean;
  offset?: number;
  duration?: number;
}
/**
 * Scrolls to and focuses on an HTML element with the specified ID.
 * Includes options for scroll offset and timing the focus after scrolling.
 *
 * @param elementId - The ID of the HTML element to scroll to and focus on.
 * @param offset - The offset in pixels to adjust the final scroll position.
 * @param smoothScroll - Indicates whether to use smooth scrolling.
 * @param duration - Duration of the scroll in milliseconds.
 * @returns void
 */
export const focusElementById = ({
  elementId,
  smoothScroll = false,
  offset = 0,
  duration = 300,
}: FocusElementByIdProps): void => {
  const element = document.getElementById(elementId);

  if (element) {
    // Calculate the position to scroll to including the offset
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = window.scrollY + elementRect.top;
    const scrollToPosition = absoluteElementTop + offset;

    // Scroll to the element
    window.scrollTo({
      top: scrollToPosition,
      behavior: smoothScroll ? "smooth" : "auto",
    });

    // Set a timeout to focus the element after the scroll has finished
    setTimeout(() => {
      if ("focus" in element) {
        (element as HTMLElement).focus();
      } else {
        console.error(`The element with ID ${elementId} is not focusable.`);
      }
    }, duration);
  } else {
    console.error(`No element found with ID ${elementId}.`);
  }
};
