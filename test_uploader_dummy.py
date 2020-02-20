import sys
import time
import numpy as np
import cv2
import imagezmq.imagezmq as imagezmq
from imutils.video import VideoStream
import argparse

sender = imagezmq.ImageSender(connect_to='tcp://localhost:5555')
# sender = imagezmq.ImageSender()
i = 0

ap = argparse.ArgumentParser()
ap.add_argument("-n", "--name", type=str, required=True,
    help="name of CCTV")
args = vars(ap.parse_args())

image_window_name = args["name"]
while True:  
    i = i + 1
    image = np.zeros((350,350,3), np.uint8)

    # font 
    font = cv2.FONT_HERSHEY_SIMPLEX 
    # org 
    org = (50, 50) 
    # fontScale 
    fontScale = 1
    # Blue color in BGR 
    color = (255, 0, 0) 
    # Line thickness of 2 px 
    thickness = 2
    # Using cv2.utText() method 
    text =  image_window_name +" - " + str(i)
    
    image = cv2.putText(image,text, org, font,  
                    fontScale, color, thickness, cv2.LINE_AA)
                    

    respon = (sender.send_image_reqrep(image_window_name, image))
