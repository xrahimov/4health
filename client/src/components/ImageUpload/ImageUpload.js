import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    config.header['x-auth-token'] = props.token;
    formData.append('file', files[0]);
    //save the Image we chose inside the Node Server
    axios.post('/api/images', formData, config).then((response) => {
      if (response.status === 200) {
        setImages([...Images, response.data.image]);
        props.refreshFunction([...Images, response.data.image]);
      } else {
        alert('Failed to save the Image in Server');
      }
    });
  };

  // const onDelete = (image) => {
  //   const currentIndex = Images.indexOf(image);

  //   let newImages = [...Images];
  //   newImages.splice(currentIndex, 1);

  //   setImages(newImages);
  //   props.refreshFunction(newImages);
  // };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: '300px',
              height: '300px',
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {/* <Icon type="plus" style={{ fontSize: '3rem' }} /> */}
          </div>
        )}
      </Dropzone>

      {/* <div style={{ display: 'flex', width: '300px', height: '300px', overflowX: 'scroll' }}>
        {Images.map((image, index) => (
          <div onClick={() => onDelete(image)}>
            <img
              style={{ minWidth: '300px', width: '300px', height: '300px' }}
              src={`https://dukon.herokuapp.com/${image}`}
              alt={`productImg-${index}`}
            />
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default FileUpload;
