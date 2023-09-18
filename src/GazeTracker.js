import React, { useEffect, useState } from 'react';
import webgazer from 'webgazer';

const GazeTracker = () => {
  const [gazeCoordinates, setGazeCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check if the browser supports the getUserMedia API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Initialize WebGazer with custom settings for mobile
      webgazer.setGazeListener((data) => {
        if (data) {
          const x = data.x;
          const y = data.y;
          setGazeCoordinates({ x, y });
        }
      });

      webgazer.setRegression('ridge'); // You can customize regression settings
      webgazer.begin();

      // Show gaze prediction points on the screen
      webgazer.showPredictionPoints(true);

      // Mobile-specific handling for camera access
      const handleCameraAccess = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' }, // Use the front camera
          });
          // Attach the camera stream to a video element (optional)
          const videoElement = document.getElementById('camera-video');
          if (videoElement) {
            videoElement.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      };

      // Call the camera access function
      handleCameraAccess();
    } else {
      console.error('getUserMedia is not supported in this browser.');
    }

    return () => {
      // Stop WebGazer and clean up
      webgazer.end();
    };
  }, []);

  return (
    <div>
      {/* Display a video element for the camera stream (optional) */}
      <video
        id="camera-video"
        autoPlay
        muted
        playsInline
        style={{ display: 'none' }}
      ></video>

      {/* Display the gaze tracking result */}
      <div
        style={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          backgroundColor: 'red',
          borderRadius: '50%',
          left: gazeCoordinates.x + 'px',
          top: gazeCoordinates.y + 'px',
        }}
      ></div>
    </div>
  );
};

export default GazeTracker;
