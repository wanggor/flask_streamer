"""test_1_send_images.py -- basic send images test.

A simple test program that uses imagezmq to send images to a receiving program
that will display the images.

This program requires that the image receiving program to be running first.
Brief test instructions are in that program: test_1_receive_images.py.
"""

import sys
import time
import numpy as np
import cv2
import imagezmq.imagezmq as imagezmq
from imutils.video import VideoStream



# Create 2 different test images to send
# A green square on a black background
# A red square on a black background

sender = imagezmq.ImageSender(connect_to='tcp://localhost:5555')
# sender = imagezmq.ImageSender()
i = 0
vs = VideoStream(src=0, resolution=(320, 240)).start()
time.sleep(2.0)

image_window_name = 'From Sender'
while True:  # press Ctrl-C to stop image sending program
    # Increment a counter and print it's value to console
    i = i + 1
    image = vs.read()

    sender.send_image(image_window_name, image)
    # time.sleep(1)

vs.stop()
