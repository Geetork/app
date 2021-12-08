import pytesseract
import cv2
import sys
import json
import base64
import os


pytesseract.pytesseract.tesseract_cmd = r'OCR\tesseract.exe'

sentInput = input()


def get_grayscale(image):
  return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def thresholding(image):
  return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

def get_text_from_image(data):
    base64_img_bytes = data.encode('utf-8')
    with open('ml_algorithms/image_to_text/decoded_image2.jpg', 'wb') as file_to_save:
        decoded_image_data = base64.decodebytes(base64_img_bytes)
        file_to_save.write(decoded_image_data)
    img = cv2.imread('ml_algorithms/image_to_text/decoded_image2.jpg')
    if os.path.isfile('ml_algorithms/image_to_text/decoded_image2.jpg'):
        os.remove('ml_algorithms/image_to_text/decoded_image2.jpg')
    print(img)
    pre_img = thresholding(get_grayscale(img))
    custom_config = r'-l eng+rus --psm 6 --oem 3 --tessdata-dir "OCR/tessdata"'
    text = pytesseract.image_to_string(pre_img, config=custom_config)
    print(text)


code = (sentInput[sentInput.find(",") + 1:])
get_text_from_image(code)

'''
try:
	im = 'test.jpg'
	print(get_text_from_image(im))
	print(pytesseract.get_languages())
except Exception as ex:
	print(ex)
input()
'''
