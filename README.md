# Bradbury Museum

Design interface for touchscreens

## Hardware
BrightSign XT1144 Expanded I/O Player  
Touchscreen (portrait display)

<br>
<hr>

## Carousel Template
The main component used throughout the WebPage.
Listed below are the currently working features listed, bug or Errors that are most jarring that need fixing, and possible improvements to simplify code or new features to add.

### Features:
- Carousel interates
- Removed timed intervals
- Correctly reads from JSON
- Removed icon span
- Carousel fixed in height

### Bugs/ Errors:
- Text overflow drags row outside carousel

### Improvements:
- add 'v-if' for missing JSON components (ex: no image)
- logic between <iframe> or <video> or <img> for media div
- option to move media div left or right side
- Remove duplicated code block for 'carousel-item active' 
