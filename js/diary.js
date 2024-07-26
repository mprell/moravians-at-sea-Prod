//Show and Hide How to Use Popup
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('overlay').addEventListener('click', function () {
        hideHTUPopup();
    });
// Prevent closing the popup when clicking inside it
document.getElementById('HTUPopup').addEventListener('click', function (event) {
        event.stopPropagation();
    });

function hideHTUPopup() {
    document.getElementById('HTUPopup').style.visibility = 'hidden';
    document.getElementById('overlay').style.display = 'none';
}
    // Enhanced ShowHTUFunction to show the popup
    window.ShowHTUFunction = function() {
        document.getElementById('HTUPopup').style.visibility = 'visible';
        document.getElementById('overlay').style.display = 'block';
    }
});

function hidegraph() {
 document.getElementById("graph").style.visibility = 'hidden';
 document.getElementById("routeOn").style.display = 'block';
 document.getElementById("routeOff").style.display = 'none';
}

function showgraph() {
 document.getElementById("graph").style.visibility = 'visible';
 document.getElementById("routeOff").style.display = 'block';
 document.getElementById("routeOn").style.display = 'none';
}

// Pan and Zoom
const mapContainer = document.querySelector('.map');
const svgContainer = document.querySelector('#map');

// Initialising
let scale = 1;
let offsetX = 0;
let offsetY = 0;

// Zoom Function on Mouse Wheel
mapContainer.addEventListener('wheel', (event) => {
    // Check if any popup is visible
    const isPopupVisible = Array.from(document.querySelectorAll('.diaryPopuptext')).some(popup => popup.style.visibility === 'visible');

    // If a popup is visible, do not zoom and allow default scroll
    if (isPopupVisible) {
        // Optionally, you can prevent the default behavior if you want to customize the scroll behavior
        // event.preventDefault();
        return; // Exit the function early
    }

    // Prevent default to stop window scroll
    event.preventDefault();
    const delta = event.deltaY;
    const zoomFactor = 0.3; // Zoom speed

    if (delta > 0) {
        // Zoom out
        scale -= zoomFactor;
    } else {
        // Zoom in
        scale += zoomFactor;
    }

    // Zoom limits
    scale = Math.max(0.5, Math.min(4, scale));

    // Apply Zoom
    svgContainer.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
});

// Pan Function
let isDragging = false;
let startX, startY;

svgContainer.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.clientX - offsetX;
    startY = event.clientY - offsetY;
});

document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const newX = event.clientX - startX;
    const newY = event.clientY - startY;

    // Apply Pan
    svgContainer.style.transform = `scale(${scale}) translate(${newX}px, ${newY}px)`;
    offsetX = newX;
    offsetY = newY;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

//Show and Hide Diary Popups
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('circle[id], path[id]').forEach(element => {
        element.addEventListener('click', function () {
            const popupId = "diaryPopup" + this.getAttribute('id').replace('graphPopup', '');
            const popup = document.getElementById(popupId);
            if (popup) {
                popup.style.visibility = 'visible';
                document.getElementById('overlay').style.display = 'block';
            }
        });
    });
    document.getElementById('overlay').addEventListener('click', function () {
        document.querySelectorAll('.diaryPopuptext').forEach(popup => {
            popup.style.visibility = 'hidden';
        });
        this.style.display = 'none';
    });
    document.querySelectorAll('.diaryPopuptext').forEach(popup => {
            popup.addEventListener('click', function (event) {
                event.stopPropagation();
            });
        });
});

//Show and Hide Position Popups
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[data-popup-id]').forEach(a => {
        a.addEventListener('click', function () {
            const popupId = this.getAttribute('data-popup-id');
            const popup = document.getElementById(popupId);
            if (popup) {
                popup.style.visibility = 'visible';
                document.getElementById('overlay2').style.display = 'block';
                }
            });
    });  
    document.getElementById('overlay2').addEventListener('click', function () {
        document.querySelectorAll('.positionPopuptext').forEach(popup => {
            popup.style.visibility = 'hidden';
        });
        this.style.display = 'none';
    });  
    document.querySelectorAll('.positionPopuptext').forEach(popup => {
        popup.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });
});

// Pagination
function setupPopupPaginationWithLeftArrow() {
    document.querySelectorAll('.rightArrow').forEach(arrow => {
        arrow.addEventListener('click', function() {
            navigatePopup('next');
        });
    });
    document.querySelectorAll('.leftArrow').forEach(arrow => {
        arrow.addEventListener('click', function() {
            navigatePopup('prev');
        });
    });
    function navigatePopup(direction) {
        // find current opened Popup
        const currentPopup = document.querySelector('.diaryPopuptext[style*="visible"]');
        if (currentPopup) {
            // extract ID
            const currentId = currentPopup.getAttribute('id');
            const baseId = currentId.replace(/[0-9]+$/, ''); // remove numbers at the end
            const currentNum = parseInt(currentId.match(/\d+$/)[0], 10); // extract number
            let nextNum = currentNum + (direction === 'next' ? 1 : -1); // calculate the next number based of the direction

            // nextNum musst not be negative
            nextNum = Math.max(nextNum, 1);

            const nextId = `${baseId}${nextNum}`;

            // find and open next popup
            const nextPopup = document.getElementById(nextId);
            if (nextPopup) {
                currentPopup.style.visibility = 'hidden'; // close current popup
                nextPopup.style.visibility = 'visible'; // open next popup
                document.getElementById('overlay').style.display = 'block'; // show overlay
            }
        }
    }
}

function resetZoom() {
    scale = 1; // Reset scale to 100%
    offsetX = 0; // Reset offsetX to initial position
    offsetY = 0; // Reset offsetY to initial position
    svgContainer.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`; // Apply reset zoom
}

// Einzeleinträge über URL aufrufbar machen
document.addEventListener('DOMContentLoaded', function() {
    // Get the current URL fragment without the '#' character
    var fragment = window.location.hash.substring(1);

    // If there is a fragment, try to find the corresponding popup
    if (fragment) {
        var popup = document.getElementById(fragment);
        // If the popup exists, make it visible
        if (popup) {
            popup.style.visibility = 'visible';
            document.getElementById('overlay').style.display = 'block';
        }
    }
});

// call the extended setup function after full loading of the DOM
document.addEventListener('DOMContentLoaded', function () {
    setupPopupPaginationWithLeftArrow();
});



