import { useState, useEffect } from "react";

import { storage } from "../firebase";

const useStoragePost = (imageArr, user, date) => {
  const [progressObj, setProgressObj] = useState({});
  const [imageObjArr, setImageObjArr] = useState(null);
  const [foundError, setFoundError] = useState(null);

  useEffect(() => {
    const promises = imageArr.map((item, index) => {
      const storagePath = `posts/${user._id}/${date}/${item.image.name}`;
      const ref = storage.ref().child(storagePath);
      return new Promise((resolve, reject) =>
        ref.put(item.image.originFileObj).on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
            setProgressObj((prev) => {
              return {
                ...prev,
                [item.image.name]: progress,
              };
            });
          },
          (err) => {
            setFoundError(err);
            reject(null);
          },
          async () => {
            let url = await ref.getDownloadURL();
            resolve({
              url,
              storagePath,
              type: item.type,
              name: item.image.name,
            });
          }
        )
      );
    });
    Promise.all(promises).then((data) => {
      setImageObjArr(data);
    });
  }, [imageArr]);

  return { progressObj, imageObjArr, foundError };
};

export default useStoragePost;
