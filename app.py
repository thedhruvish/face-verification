from flask import Flask, request, jsonify
from deepface import DeepFace
import os
from flask_cors import CORS
import base64

models_path = os.path.join(os.getcwd(), "models", ".deepface", "weights")
os.makedirs(models_path, exist_ok=True)  
os.environ["DEEPFACE_HOME"] = os.path.join(os.getcwd(), "models")
app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def save_base64_image(base64_string, filename):
    """Decode base64 image and save it as a file."""
    header, encoded = base64_string.split(",", 1)
    image_data = base64.b64decode(encoded)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    with open(filepath, "wb") as f:
        f.write(image_data)
    return filepath

@app.route("/")
def index():
    return jsonify({"message": "Welcome to the Face Verification API"}),201

@app.route("/compare", methods=["POST"])
def compare_faces():
    try:
        data = request.json 
        if "image1" not in data or "image2" not in data:
            return jsonify({"error": "Please upload both images"}), 400
        image1_path = save_base64_image(data["image1"], "image1.jpg")
        image2_path = save_base64_image(data["image2"], "image2.jpg")
        result = DeepFace.verify(image1_path, image2_path)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
     app.run(host="0.0.0.0", port=8000, debug=False) 
