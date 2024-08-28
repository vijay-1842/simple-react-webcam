import React, { Component } from "react";

class SimpleReactWebcam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCameraShared: false,
      videoDimensions: { width: 0, height: 0 },
    };

    this.camRef = React.createRef();
  }

  componentDidMount() {
    this.requestCameraPermission();
  }

  requestCameraPermission = async () => {
    const {
      requestDeclinedCallback = this.defaultDeclinedCallback,
      includeAudio = false,
    } = this.props;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: includeAudio,
        video: { facingMode: "user" },
      });
      this.camRef.current.srcObject = stream;

      this.camRef.current.onloadedmetadata = this.handleMetadataLoad;
    } catch (error) {
      console.error(error);
      requestDeclinedCallback(error);
    }
  };

  handleMetadataLoad = () => {
    const { videoWidth: width, videoHeight: height } = this.camRef.current;
    this.setState({ isCameraShared: true, videoDimensions: { width, height } });
  };

  getCapturedImage = () => {
    const { videoDimensions } = this.state;
    const videoElem = this.camRef.current;

    const canvas = document.createElement("canvas");
    canvas.width = videoDimensions.width;
    canvas.height = videoDimensions.height;

    const context = canvas.getContext("2d");
    context.drawImage(
      videoElem,
      0,
      0,
      videoDimensions.width,
      videoDimensions.height
    );
    const image = canvas.toDataURL("image/png");

    return image;
  };

  defaultDeclinedCallback = () => {
    alert("Please Refresh the Page and Allow Camera Permission");
  };

  render() {
    const { className = "", children } = this.props;
    const { isCameraShared } = this.state;

    return (
      <>
        <video
          ref={this.camRef}
          autoPlay
          style={isCameraShared ? {} : { display: "none" }}
          className={className}
        >
          <track kind="captions" />
        </video>
        {children && children({ getCapturedImage: this.getCapturedImage })}
      </>
    );
  }
}

export default SimpleReactWebcam;
