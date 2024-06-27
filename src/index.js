import React, { useEffect, useRef, useState } from 'react';

function SimpleReactWebcam(props) {
    const {
        requestDeclinedCallback = () => {
            alert("Please Refresh the Page and Allow Camera Permission");
        },
        className = '',
    } = props;

    const [isCameraShared, setCameraShared] = useState(false);
    const camRef = useRef();

    const requestCameraPermission = async () => {
        const constraints = {
            audio: false, video: { facingMode: 'user' },
        };
        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            camRef.current.srcObject = stream;
            setCameraShared(true);
        } catch (error) {
            console.error(error);
            requestDeclinedCallback(error);
        }
    };

    useEffect(() => {
        requestCameraPermission();
    }, [])

    return (
        <video
            ref={camRef}
            autoPlay
            style={isCameraShared ? {} : { display: 'none' }}
            className={className}
        >
            <track kind="captions" />
        </video>
    );
}

export default SimpleReactWebcam;
