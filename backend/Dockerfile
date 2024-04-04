FROM python:3.9-slim

WORKDIR /app

COPY ./requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . .

RUN addgroup --system app && adduser --system --ingroup app app && chown app:app /app
USER app

CMD ["python3", "./db_connection"]