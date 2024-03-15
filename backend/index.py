from fastapi import FastAPI, Request,UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

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
@app.post("/upload")
async def upload(file_uploads:list[UploadFile]):
    filenames=[]
    for file_upload in file_uploads:
        data=await file_upload.read()
        save_file=file_upload.filename
        with open(save_file,"wb") as f:
            f.write(data)
        filenames.append(save_file)
        return JSONResponse({"Filenames":filenames})