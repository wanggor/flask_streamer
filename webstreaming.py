# USAGE
# python webstreaming.py --ip 0.0.0.0 --port 8000

# import the necessary packages
from pyimagesearch.motion_detection import SingleMotionDetector
from imutils import build_montages
from imutils.video import VideoStream
from flask import Response
from flask import Flask
from flask import render_template
from flask import jsonify
import imagezmq.imagezmq as imagezmq
import threading
import argparse
import datetime
import imutils
import time
import cv2
import json
import random
import numpy as np

# initialize the output frame and a lock used to ensure thread-safe
# exchanges of the output frames (useful for multiple browsers/tabs
# are viewing tthe stream)
frameDict = {}
lastActive = {}
outputFrame = None
outputFrame_dic = {"0" : np.zeros((255,255), np.uint8), "1" : np.zeros((255,255), np.uint8), "2" : np.zeros((255,255), np.uint8)}
lock = threading.Lock()

# initialize a flask object
app = Flask(__name__)

# initialize the ImageHub object
imageHub = imagezmq.ImageHub()



time.sleep(2.0)

@app.route("/")
def index():
	data = {'username': 'Pang', 'site': 'stackoverflow.com'}
	cctv_list = [{
		"id" : "0",
		"name" : "CCTV 1"
	},
	{
		"id" : "1",
		"name" : "CCTV 3"
	},
	{
		"id" : "2",
		"name" : "CCTV 2"
	}]
	return render_template("cctv_index.html", data = data, cctv_list = cctv_list)

def detect_motion(frameCount):
	# grab global references to the video stream, output frame, and
	# lock variables
	global imageHub, frameDict, lock, lastActive, outputFrame, outputFrame_dic

	# initialize the dictionary which will contain  information regarding
	# when a device was last active, then store the last time the check
	# was made was now
	lastActiveCheck = datetime.datetime.now()

	# stores the estimated number of Pis, active checking period, and
	# calculates the duration seconds to wait before making a check to
	# see if a device was active
	ESTIMATED_NUM_PIS = 4
	ACTIVE_CHECK_PERIOD = 10
	ACTIVE_CHECK_SECONDS = ESTIMATED_NUM_PIS * ACTIVE_CHECK_PERIOD

	# loop over frames from the video stream
	while True:
		(rpiName, frame) = imageHub.recv_image()
		imageHub.send_reply(b'OKsdd')

		if rpiName not in lastActive.keys():
			print("[INFO] receiving data from {}...".format(rpiName))

		if rpiName not in lastActive.keys():
			print("[INFO] receiving data from {}...".format(rpiName))
			

		lastActive[rpiName] = datetime.datetime.now()

		# resize the frame to have a maximum width of 400 pixels, then
		# grab the frame dimensions and construct a blob
		frame = imutils.resize(frame, height=340)
		(h, w) = frame.shape[:2]

		# draw the sending device name on the frame
		cv2.putText(frame, rpiName, (10, 25),
			cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

		# update the new frame in the frame dictionary
		frameDict[rpiName] = frame

		# build a montage using images in the frame dictionary
		montages = build_montages(frameDict.values(), (w, h), (2, 2))
		# print(montages)

		for n, i in enumerate(frameDict):
			if n == 0:
				# acquire the lock, set the output frame, and release the
				# lock
				with lock:
					outputFrame = frame.copy()
					outputFrame_dic[str(rpiName)] = frame.copy()

		if (datetime.datetime.now() - lastActiveCheck).seconds > ACTIVE_CHECK_SECONDS:
			# loop over all previously active devices
			for (rpiName, ts) in list(lastActive.items()):
				# remove the RPi from the last active and frame
				# dictionaries if the device hasn't been active recently
				if (datetime.datetime.now() - ts).seconds > ACTIVE_CHECK_SECONDS:
					print("[INFO] lost connection to {}".format(rpiName))
					lastActive.pop(rpiName)
					frameDict.pop(rpiName)
			
			# set the last active check time as current time
			lastActiveCheck = datetime.datetime.now()

def generate(feed_id):
	# grab global references to the output frame and lock variables
	global outputFrame, lock, outputFrame_dic

	# loop over frames from the output stream
	while True:
		# wait until the lock is acquired
		with lock:
			print(feed_id, type(feed_id))
			# check if the output frame is available, otherwise skip
			# the iteration of the loop
			# if outputFrame is None:
			# 	continue
			# if outputFrame_dic == {}:
			# 	continue
			if str(feed_id) not in outputFrame_dic.keys():
				continue
		
			# # encode the frame in JPEG format
			# (flag, encodedImage) = cv2.imencode(".jpg", outputFrame)
			
			# print(feed_id, outputFrame_dic[str(feed_id)])

			# idx = list(outputFrame_dic.keys())[0]
			(flag, encodedImage) = cv2.imencode(".jpg", outputFrame_dic[str(feed_id)])


			# ensure the frame was successfully encoded
			if not flag:
				continue

		# yield the output frame in the byte format
		yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + 
			bytearray(encodedImage) + b'\r\n')

@app.route("/video_feed/<int:feed_id>'")
def video_feed(feed_id):
	print("index", feed_id)
	return Response(generate(feed_id),
		mimetype = "multipart/x-mixed-replace; boundary=frame")
	# return Response("")

@app.route("/_getData", methods = ['GET'])
def cctv_status():
	data_line_chart = {
		"labels": ["12.00", "12.10", "12.20", "12.30", "12.40", "12.50", "12.60"],
		"datasets": [
			{
                "label": "Jumlah Kendaraan",
                "backgroundColor": 'rgba(26,179,148,0.5)',
                "borderColor": "rgba(26,179,148,0.7)",
                # "pointBackgroundColor": "rgba(26,179,148,1)",
                # "pointBorderColor": "#fff",
                # "title": "May 2017",
                "data": [random.randint(0,100), random.randint(0,100), random.randint(0,100), random.randint(0,100), random.randint(0,100), random.randint(0,100), random.randint(0,100)]
            },
		]
	}

	data_bar_chart = {
		"labels": ["Motor", "Mobil", "Truk", "Bus"],
        "datasets": [
            {
                "label": "Data 1",
                "backgroundColor": ["#a3e1d4","#dedede","#b5b8cf", "#3291c9"],
                # "pointBorderColor": "rgba(26,179,148,0.7)",
                "data": [random.randint(0,100), random.randint(0,100), random.randint(0,100), random.randint(0,100)]
            },
        ]
	}

	data_pie_chart = {
		"labels": ["Motor","Mobil","Truk", "Bus"],
        "datasets": [{
            "data": [random.randint(0,100),random.randint(0,100),random.randint(0,100), random.randint(0,100)],
            "backgroundColor": ["#a3e1d4","#dedede","#b5b8cf", "#3291c9"]
        }]
	}

	def create_random_scatter():
			data = []
			for i in range(random.randint(0, 20)):
				data.append(
					{"x": random.randint(0, 100),
					"y": random.randint(0, 100),
					"r": 4}
				)
			return data

	data_scatter_chart = {
		"labels": ["Color 1", "Color 2", "Color 3", "Color 4"],
        "datasets": [
                    {
                    "label": 'Motor',
                    "data": create_random_scatter(),
                        "backgroundColor":"#FF6384",
                        "hoverBackgroundColor": "#FF6384",
                    },
                    {
                        "label": 'Mobil',
                        "data": create_random_scatter(),
                        "backgroundColor":"#333",
                        "hoverBackgroundColor": "#333",
                    },
                    {
                        "label": 'Truk',
                        "data": create_random_scatter(),
                    "backgroundColor":"#1ab394",
                    "hoverBackgroundColor": "#1ab394",
                }
            ]
        },
	return jsonify(data_line_chart = data_line_chart, data_bar_chart = data_bar_chart, data_pie_chart = data_pie_chart, data_scatter_chart = data_scatter_chart)


# check to see if this is the main thread of execution
if __name__ == '__main__':
	# construct the argument parser and parse command line arguments
	ap = argparse.ArgumentParser()
	ap.add_argument("-i", "--ip", type=str, required=True,
		help="ip address of the device")
	ap.add_argument("-o", "--port", type=int, required=True,
		help="ephemeral port number of the server (1024 to 65535)")
	ap.add_argument("-f", "--frame-count", type=int, default=32,
		help="# of frames used to construct the background model")
	args = vars(ap.parse_args())

	# start a thread that will perform motion detection
	t = threading.Thread(target=detect_motion, args=(
		args["frame_count"],))
	t.daemon = True
	t.start()

	# start the flask app
	app.run(host=args["ip"], port=args["port"], debug=True,
		threaded=True, use_reloader=False)
