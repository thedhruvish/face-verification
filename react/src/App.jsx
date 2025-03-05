import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import "./FaceVerification.css";
const Header = () => (
  <a href="https://aadytech.com" target="_blank" className="header-link">
    <header className="header">
      <img src={"logo.png"} alt="AadyTech Logo" className="logo" />
      <span className="header-title">AadyTech</span>
      <button className="contact-button">Contact</button>
    </header>
  </a>
);

const Footer = () => (
  <footer className="footer">
    &copy; {new Date().getFullYear()} AadyTech. All Rights Reserved.
  </footer>
);

// eslint-disable-next-line react/prop-types
const Button = ({ children, className, ...props }) => (
  <button className={`button ${className}`} {...props}>
    {children}
  </button>
);

const FaceVerification = () => {
  const [images, setImages] = useState([null, null]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [conn, setConn] = useState(false);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8000")
        .then(() => {
          setConn(true);
        })
        .catch(() => {
          setConn(false);
          setError("Failed to connect to the python. Please try again.");
        });
    } catch (err) {
      setError(
        "Failed to connect to the python. Please try again.." + err.message
      );
    }
  }, []);

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => {
          const newImages = [...prev];
          newImages[index] = e.target.result;
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => {
      if (!prev[index]) return prev;
      const newImages = [...prev];
      newImages[index] = null;
      return newImages;
    });
  };

  const handleCompareFaces = async () => {
    if (!images[0] || !images[1]) {
      setError("Please upload both images before comparing.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post("http://localhost:8000/compare", {
        image1: images[0],
        image2: images[1],
      });
      setResult(response.data);
    } catch (err) {
      setError("Can you provide a face image? " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!conn) {
    return (
      <div>
        <Header />
        <div className="container">
          <h1 className="title">Face Verification</h1>
          <br />
          <p className="no-match-text">
            <b>{error}</b>
          </p>{" "}
          <br />
          <br />
          <br />
          <h3>
            How to run the face Verification{" "}
            <a
              href="https://github.com/thedhruvish/face-verification"
              target="_blank"
            >
              Click Here
            </a>{" "}
          </h3>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="title">Face Verification</h2>
        <div className="image-container">
          {[0, 1].map((index) => (
            <div key={index} className="image-wrapper">
              {images[index] ? (
                <>
                  <img
                    src={images[index]}
                    alt={`Uploaded ${index + 1}`}
                    className="uploaded-image"
                  />
                  <div
                    className="overlay"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <FaTrash className="delete-icon" />
                  </div>
                </>
              ) : (
                <label className="upload-label">
                  <span>Upload Image {index + 1}</span>
                  <input
                    type="file"
                    className="file-input"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                  />
                </label>
              )}
            </div>
          ))}
        </div>

        {error && <p className="error-message">{error}</p>}

        {result && (
          <div className="result-container">
            {result.verified ? (
              <div className="match-box">
                <h3 className="match-text">🎉 Faces Matched! 🎉</h3>
                <p className="match-subtext">
                  These faces belong to the same person.
                </p>
              </div>
            ) : (
              <p className="no-match-text">❌ Images do not match ❌</p>
            )}
          </div>
        )}

        <Button onClick={handleCompareFaces} disabled={loading}>
          {loading ? "Comparing..." : "Compare Faces"}
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default FaceVerification;
