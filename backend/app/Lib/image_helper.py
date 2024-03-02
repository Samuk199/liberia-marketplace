from datetime import datetime

def upload_image(image, extension) -> str:
    name = f'img_{datetime.utcnow().strftime("%y_%m_%d_%H_%M_%S")}.{extension}'
    image.save(f'static\\{name}',  buffer_size=163840)
    return name