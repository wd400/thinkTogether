FROM python:3.8-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt
RUN apt update && apt install -y libpq-dev
RUN pip3 install -r requirements.txt

COPY app.py .
COPY schema.xsd .
EXPOSE 5000

#CMD [ "python3", "app.py"]

