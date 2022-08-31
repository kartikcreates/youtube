
import '@tensorflow/tfjs-backend-webgl';

import React, { useEffect } from 'react'
import * as tf from '@tensorflow/tfjs-core';
const handpose = require('@tensorflow-models/handpose');
const fp = require('fingerpose');




function Gesture(props) {

    useEffect(() => {
        let stream;
        let vid;
        async function myfunc() {
            const model = await handpose.load();
            console.log("model loaded .....................");

            //full hand open creation
            const fullhandGesture = new fp.GestureDescription('full_hand_open');
            for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
                fullhandGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
            }
            fullhandGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);


            //single 





            //full hand close

            // const fullhandcloseGesture = new fp.GestureDescription('full_hand_close');
            // for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
            //   fullhandcloseGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
            // }


            //thumbdown creation 
            const thumbsDownGesture = new fp.GestureDescription('thumbs_down');

            thumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
            thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 0.7);
            for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
                thumbsDownGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
                thumbsDownGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
            }
            //predefined gestures 
            // add "✌🏻" and "👍" as sample gestures
            const GE = new fp.GestureEstimator([
                fp.Gestures.VictoryGesture,
                fp.Gestures.ThumbsUpGesture,
                thumbsDownGesture,
                fullhandGesture,

            ]);
            console.log(fp.GestureEstimator)



            setInterval(async () => {

                const predictions = await model.estimateHands(vid);

                if (predictions.length > 0) {
                    // console.log(predictions[0].annotations);

                    //try{}
                    try {
                        const estimatedGestures = await GE.estimate(predictions[0].landmarks, 9.5);
                        console.log(JSON.stringify(estimatedGestures.gestures));
                        console.log("getting gesture name.....", estimatedGestures?.gestures[0].name)


                        props.gesturefunc(estimatedGestures?.gestures[0]?.name);


                    } catch (err) {
                        console.log("error occured gesture", err);
                    }

                }


            }, 250);
        }
        async function videoget() {

            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                vid = document.getElementById('mvideo');
                vid.srcObject = stream;
                myfunc()
            }
            catch (e) {
                console.log(e)
            }
        }
        videoget()

    }, [])
    return (
        <div className="gesture">
            <video width="60px" id='mvideo' autoPlay={true} >

            </video>

        </div>
    );
}

export default Gesture;
