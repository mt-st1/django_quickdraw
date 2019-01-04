from django.http.response import JsonResponse
from django.shortcuts import render

from quickdraw.predict import predict
from quickdraw.preprocess import preprocess


# Create your views here.
def root(request):
    return render(request, 'root.html')


def predict_drawing(request):
    drawing_data = request.GET.get("drawing_data[]")
    input_data = preprocess(drawing_data)
    result = predict(input_data)
    print("predict_result: {}".format(result))
    return JsonResponse({"predict_result": result})
