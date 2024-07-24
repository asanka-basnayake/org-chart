export const  getDPI = () => {
    // Create a hidden element with a known size in inches
    var div = document.createElement('div');
    div.style.width = '1in';
    div.style.height = '1in';
    div.style.position = 'absolute';
    div.style.top = '-1000px';
    div.style.left = '-1000px';
    document.body.appendChild(div);

    // Measure the size of the element in pixels
    var dpi = div.getBoundingClientRect().width;

    // Remove the element
    document.body.removeChild(div);

    return dpi;
}