const uploadImg = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "un6npijz");
  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/duvryvmms/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await res.json();
    return {
      status: "success",
      data: result?.secure_url,
    };
  } catch (error) {
    return {
      status: "error",
      error,
    };
  }
};

export { uploadImg };
