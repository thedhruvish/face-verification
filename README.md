# Face Verification App Installation and Run Guide

![Face Verification Demo](https://face.aadytech.com/og.png)

## Prerequisites

Make sure you have the following installed on your system:

- Python (>=3.8) - [Download Here](https://www.python.org/downloads/)
- pip (Python package manager) - Comes with Python installation
- Git (optional) - [Download Here](https://git-scm.com/downloads)

## Installation Methods

### Method 1: Install via Git (Recommended)

#### Clone the Repository

```sh
# Replace with your actual repository URL
git clone https://github.com/thedhruvish/face-verification.git
cd face-verification
```

### Method 2: Install via ZIP File

1. [Download ⬇️](https://codeload.github.com/thedhruvish/face-verification/zip/refs/heads/main) the ZIP file 
2. Extract the ZIP file to your desired location
3. Open a terminal/command prompt and navigate to the extracted folder

```sh
cd face-verification
```

## Create a Virtual Environment

```sh
python -m venv venv
```

### Activate Virtual Environment

- **Windows:**

  ```sh
  venv\Scripts\activate
  ```

- **Mac/Linux:**

  ```sh
  source venv/bin/activate
  ```

## Install Dependencies

```sh
pip install -r requirements.txt
```

## Run the Application

- if You are the running frist time to task the time 

```sh
python app.py
```

## Access the Application

Open your browser and [go to](https://face.aadytech.com):

```
https://face.aadytech.com
```

## Additional Notes

- Ensure `requirements.txt` includes all necessary dependencies.
- Modify `app.py` as needed for your project structure.

## Useful Links

- [Python Official Website](https://www.python.org/)
- [GitHub](https://github.com/thedhruvish)
- [Pip Documentation](https://pip.pypa.io/en/stable/)
- [AadyTech Website](https://aadytech.com/)
