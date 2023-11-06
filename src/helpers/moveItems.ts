// this code is used to append items to different divs at different breakpoints.
// it allows us to be more consistent with the development and align it to the design
// without back and forth from designers.
export function swap(breakpoint: number, element: Element | null, location: Element | null) {
    if (
        element instanceof HTMLElement &&
        location instanceof HTMLElement &&
        window.innerWidth < breakpoint
    ) {
        element.appendChild(location);
    } else {
        console.error('Invalid element or location');
    }
}
