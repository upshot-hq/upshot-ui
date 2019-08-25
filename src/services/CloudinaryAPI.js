import axios from 'axios';
// import cloudinary from 'cloudinary';

const baseUrl = process.env.REACT_APP_API_URL;
// const cloudinaryV2 = cloudinary.v2;
// const {
//   REACT_APP_CLOUNDINARY_CLOUD_NAME,
//   REACT_APP_CLOUNDINARY_API_KEY,
//   REACT_APP_CLOUNDINARY_API_SECRET,
// } = process.env;

// cloudinaryV2.config({
//   cloud_name: REACT_APP_CLOUNDINARY_CLOUD_NAME,
//   api_key: REACT_APP_CLOUNDINARY_API_KEY,
//   api_secret: REACT_APP_CLOUNDINARY_API_SECRET,
// });

const cloudinaryBaseUrl = `https://api.cloudinary.com/v1_1/dysmmi6yi/image/upload`; //eslint-disable-line


class CloudinaryAPI {
  static upload(imageFile) {
    const fileData = new FormData(); // eslint-disable-line
    fileData.append('file', imageFile);
    fileData.append('upload_preset', 'upshot_ui_user_profile');
    delete axios.defaults.headers.common.authorization;
    return axios({
      url: cloudinaryBaseUrl,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      data: fileData,
    });
  }

  static updateUserProfile(userData) {
    return axios.put(`${baseUrl}/users/profile`, userData);
  }
}

export default CloudinaryAPI;
