import React, { useEffect, useState } from "react";
import { getaddAPI } from "./APIcall";

function AdvertisingComponents() {
  const [showImage, setShowImage] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [adsData, setAdsData] = useState([]);

  const fetchAdData = async () => {
    try {
      const res = await getaddAPI();
      const imageData = res.data.imageData[0];

      setAdsData(res.data.Data);
      setImageUrl(`https://admin.addtheadd.com${imageData.imageUrl}`);
      setLinkUrl(imageData.imagelink);
    } catch (e) {
      console.error("Error fetching ad data:", e);
      setImageUrl("/images/Home/Advertising.png");
    } finally {
      console.log("API call finished");
    }
  };

  useEffect(() => {
    fetchAdData();
  }, []);

  const handleClose = () => {
    setShowImage(false);
    setTimeout(() => {
      setShowImage(true);
    }, 5000);
    fetchAdData();
  };

  return (
    <div className="mx-3 container mt-2">
      {showImage && (
        <div className="w-full h-max-700px sm:h-auto relative">
          {imageUrl && (
            <>
              <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt="Advertisement"
                  style={{ objectFit: "cover" }}
                  className="h-auto w-full sm:w-full"
                />
              </a>
              <button
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: "30.5rem",
                  right: "0.5rem",
                  zIndex: 10,
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "70%",
                }}
                className="w-6 h-6 sm:w-4 sm:h-4 sm:text-xs text-base"
              >
                x
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AdvertisingComponents;
