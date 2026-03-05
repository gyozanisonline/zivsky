import cv2
import numpy as np
import os
import glob

def get_automatic_canny(image, sigma=0.33):
    v = np.median(image)
    lower = int(max(0, (1.0 - sigma) * v))
    upper = int(min(255, (1.0 + sigma) * v))
    edged = cv2.Canny(image, lower, upper)
    return edged

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

def crop_painting_advanced(image_path, output_path):
    print(f"Processing {image_path}...")
    image = cv2.imread(image_path)
    if image is None:
        print("Failed to load image.")
        return False
        
    orig = image.copy()
    height, width = image.shape[:2]
    
    # Scale down for faster/better contour finding
    ratio = 800.0 / height
    if ratio < 1.0:
        resized = cv2.resize(image, (int(width * ratio), 800))
    else:
        resized = image.copy()
        ratio = 1.0
        
    gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
    
    # Enhance contrast 
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    gray_clahe = clahe.apply(gray)
    
    blurred = cv2.GaussianBlur(gray_clahe, (5, 5), 0)
    
    # Auto Canny edge detection
    edged = get_automatic_canny(blurred)
    
    # Dilate edges to close gaps inside the painting
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (9, 9))
    dilated = cv2.dilate(edged, kernel, iterations=4)
    # Erode a bit to not over-expand bounds
    dilated = cv2.erode(dilated, kernel, iterations=2)
    
    contours, _ = cv2.findContours(dilated.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if not contours:
        print("No contours found at all. Saving original.")
        cv2.imwrite(output_path, orig)
        return False
        
    # Sort by area, get largest
    contours = sorted(contours, key=cv2.contourArea, reverse=True)
    largest_contour = contours[0]
    
    # Check if area is too small (e.g. less than 10% of image), then maybe fallback
    image_area = resized.shape[0] * resized.shape[1]
    if cv2.contourArea(largest_contour) < 0.1 * image_area:
        print("Largest contour is too small compared to image. Saving original.")
        cv2.imwrite(output_path, orig)
        return False
    
    # Get the minimum area bounding rectangle
    rect = cv2.minAreaRect(largest_contour)
    box = cv2.boxPoints(rect)
    box = np.int0(box)
    
    # Check if the box is a better fit by trying approxPolyDP again with very loose tolerance
    peri = cv2.arcLength(largest_contour, True)
    approx = cv2.approxPolyDP(largest_contour, 0.05 * peri, True)
    
    target_pts = None
    if len(approx) == 4 and cv2.isContourConvex(approx):
        # We found a nice quad
        target_pts = approx.reshape(4, 2)
    else:
        # Fallback to the bounding box from minAreaRect
        target_pts = box
        
    # Scale points back to original size
    target_pts = target_pts * (1.0 / ratio)
    
    # Warp perspective
    warped = four_point_transform(orig, target_pts)
    
    cv2.imwrite(output_path, warped)
    print(f"Saved {output_path}")
    return True

input_dir = "/Users/gyozan/Documents/Works/Clients/Ziv Balbirsky/ZIV WEBSITE/Ziv Artwork"
output_dir = "/Users/gyozan/Documents/Works/Clients/Ziv Balbirsky/ZIV WEBSITE/Ziv Artwork/Cropped2"

os.makedirs(output_dir, exist_ok=True)

for ext in ('*.jpg', '*.jpeg', '*.png', '*.JPG'):
    for img_path in glob.glob(os.path.join(input_dir, ext)):
        filename = os.path.basename(img_path)
        out_path = os.path.join(output_dir, filename)
        crop_painting_advanced(img_path, out_path)
