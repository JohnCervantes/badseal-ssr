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
      const url = await getSignedUrl(filename);
      files.push({ [filename]: url });
    } else {
      console.error("Upload failed.");
    }
  };

  return JSON.stringify(files);
}

export async function getSignedUrl(objectName) {
  var url = await s3.getSignedUrl("getObject", {
    Bucket: "badseal",
    Key: objectName,
    Expires: 518400,
  });
  return url;
}
