#importing necessary libraries
import torch 
import requests
from PIL import Image
from transformers import ViltProcessor
from transformers import ViltForQuestionAnswering 

def predict_text_and_image(text, image):
    #model fine tuned on vqa v2 dataset
    model = ViltForQuestionAnswering.from_pretrained("dandelin/vilt-b32-finetuned-vqa")

    #pre processer loaded 
    processor = ViltProcessor.from_pretrained("dandelin/vilt-b32-finetuned-vqa")

  
    encoding = processor(image, text, return_tensors="pt")

    outputs = model(**encoding)
    #predicting values
    logits = outputs.logits
    idx = torch.sigmoid(logits).argmax(-1).item()
    ans = model.config.id2label[idx]
    return ans