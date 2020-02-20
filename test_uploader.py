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






sender = imagezmq.ImageSender(connect_to='tcp://localhost:5555')
# sender = imagezmq.ImageSender()
i = 0
vs = VideoStream(src=0, resolution=(320, 240)).start()
time.sleep(2.0)



image_window_name = 'From Sender'
while True:  
    i = i + 1
    image = vs.read()
    respon = (sender.send_image_reqrep(image_window_name, image))

vs.stop()
