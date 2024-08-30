# simple-react-webcam

A simple react component to access your webcam in your React Project.


## Installation

Install simple-react-webcam using NPM with the following command.

```shell
npm install simple-react-webcam
```


## Usage

```jsx
import React from 'react';
import SimpleReactWebcam from 'simple-react-webcam';

const WebcamComponent = () => {
    return (
        <SimpleReactWebcam />
    );
};
```


## Props

| Prop Name                 | Type     | Default      | Notes                                                                                   |
|---------------------------|----------|--------------|-----------------------------------------------------------------------------------------|
| className                 | string   |              | className for the underlying video tag                                                  |
| requestDeclinedCallback   | function | () => {};    | Callback function which is triggerred when camera permission denied                     |



## Methods

`getCapturedImage` - Returns a base64 encoded string of the current webcam image.

Example:

```
getCapturedImage();
```
