FROM python:3.9.1

# Install Python and required dependencies
# RUN sudo apt-get update && \
#     sudo apt-get install -y python3 python3-pip && \
#     sudo apt-get clean

RUN apt-get update && apt-get install firefox-esr -y

RUN pip3 install python-dotenv

RUN pip3 install selenium

# Set the working directory
WORKDIR /app

# Copy the current directory into the container's working directory
COPY . .

# Run the Python script
CMD ["python3", "main.py"]