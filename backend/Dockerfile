FROM python:3.9-slim

WORKDIR /app

COPY ./requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . .

RUN addgroup --system app && adduser --system --ingroup app app && chown app:app /app
USER app

# Use supervisord to run both processes
RUN pip3 install supervisor

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["/usr/local/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]