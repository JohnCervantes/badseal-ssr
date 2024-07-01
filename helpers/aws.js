import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  region: process.env.REACT_APP_REGION,
});

const s3 = new AWS.S3();

export async function uploadPhoto(e) {
  const file = e.target.files[0];
  const filename = encodeURIComponent(file.name);
  const res = await fetch(`/api/upload-url?file=${filename}`);
  const { url, fields } = await res.json();
  const formData = new FormData();

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const upload = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (upload.ok) {
    console.log("Uploaded successfully!");
    const url = getSignedUrl(filename);
    return JSON.stringify({ [filename]: url });
  } else {
    console.error("Upload failed.");
  }
  return;
}

export async function uploadPhotos(images) {
  let files = [];

  for (let file of Array.from(images)) {
    const filename = encodeURIComponent(file.name);
    const res = await fetch(`/api/upload-url?file=${filename}`);
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
      console.log("Uploaded successfully!");
      const url = getSignedUrl(filename);
      files.push({ [filename]: url });
    } else {
      console.error("Upload failed.");
    }
  }

  return JSON.stringify(files);
}

export function getSignedUrl(objectName) {
  var url = s3.getSignedUrl("getObject", {
    Bucket: "badseal1",
    Key: objectName,
    Expires: 600000,
  });
  return url;
}
