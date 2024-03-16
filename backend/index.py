from fastapi import FastAPI, Request,UploadFile,File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import os
import model

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Test API
@app.get("/")
async def test(req: Request):
    return JSONResponse({"success": "Website Loaded Successfully"})

#Route to upload files
@app.post("/predict")
async def predict(text: str, image_file: UploadFile = File(...)):
    with open("temp_image.jpg", "wb") as buffer:
        buffer.write(await image_file.read())
    image = Image.open("temp_image.jpg")
    pred = model.predict_text_and_image(text, image)
    os.remove("temp_image.jpg")
    return pred