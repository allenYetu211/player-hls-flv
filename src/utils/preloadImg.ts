const preloadImg = (url: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      resolve(img)
    }

    img.onload = () => {
      resolve(img)
    }

    img.onerror = (e) => {
      reject(e)
    }

  })
}

export default preloadImg;