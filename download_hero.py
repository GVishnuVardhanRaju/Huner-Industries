import os
import urllib.request
os.makedirs('public', exist_ok=True)
urls = {
    'public/hero-bg.mp4': 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    'public/hero-bg.webm': 'https://sample-videos.com/video123/webm/720/big_buck_bunny_720p_1mb.webm',
}
for path, url in urls.items():
    print('Downloading', url, '->', path)
    urllib.request.urlretrieve(url, path)
