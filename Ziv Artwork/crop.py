import cv2
import numpy as np
import os
import glob

def order_points(pts):
    rect = np.zeros((4, 2), dtype="float32")
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
    return rect

def four_point_transform(image, pts):
    rect = order_points(pts)
    (tl, tr, br, bl) = rect
    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))
    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))
    dst = np.array([
        [0, 0],
        [maxWidth - 1, 0],
        [maxWidth - 1, maxHeight - 1],
        [0, maxHeight - 1]], dtype="float32")
    M = cv2.getPerspectiveTransform(rect, dst)
    warped = cv2.warpPerspective(image, M, (maxWidth, maxHeight))
    return warped

def crop_painting(image_path, output_path):
    print(f"Processing {image_path}...")
    image = cv2.imread(image_path)
    if image is None:
        print("Failed to load image.")
        return False
        
    orig = image.copy()
    
    # Calculate ratio and resize for faster processing
    height = image.shape[0]
    width = image.shape[1]
    ratio = 500.0 / height
    resized = cv2.resize(image, (int(width * ratio), 500))
    
    # Convert to grayscale
    gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
    
    # Apply Gaussian blur
    gray = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # Edge detection
    edged = cv2.Canny(gray, 30, 200) # You can adjust these thresholds
    
    # Find contours
    contours, _ = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)[:5]
    
    screenCnt = None
    for c in contours:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)
        if len(approx) == 4:
            screenCnt = approx
            break
            
    if screenCnt is None:
        print("Could not find painting contour, falling back to central crop as last resort or saving original.")
        # Alternatively, we could just copy the file over or do nothing
        # For paintings without clear edges, maybe we don't crop or crop 10% from borders?
        
        # Let's try another method using thresh
        ret, thresh = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)
        contours, _ = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if contours:
            c = max(contours, key=cv2.contourArea)
            x, y, w, h = cv2.boundingRect(c)
            # scale back
            x = int(x / ratio)
            y = int(y / ratio)
            w = int(w / ratio)
            h = int(h / ratio)
            cropped = orig[y:y+h, x:x+w]
            cv2.imwrite(output_path, cropped)
            return True
            
        print("Failed to find any reasonable boundary.")
        return False

    # Scale the contour points back to original image size
    screenCnt = screenCnt.reshape(4, 2) * (1.0 / ratio)
    
    # Apply perspective transform to obtain top-down view
    warped = four_point_transform(orig, screenCnt)
    
    # Save the output
    cv2.imwrite(output_path, warped)
    print(f"Saved {output_path}")
    return True

input_dir = "/Users/gyozan/Documents/Works/Clients/Ziv Balbirsky/ZIV WEBSITE/Ziv Artwork"
output_dir = "/Users/gyozan/Documents/Works/Clients/Ziv Balbirsky/ZIV WEBSITE/Ziv Artwork/Cropped"

os.makedirs(output_dir, exist_ok=True)

for ext in ('*.jpg', '*.jpeg', '*.png', '*.JPG'):
    for img_path in glob.glob(os.path.join(input_dir, ext)):
        filename = os.path.basename(img_path)
        out_path = os.path.join(output_dir, filename)
        crop_painting(img_path, out_path)
