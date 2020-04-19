import time


def run_culo(index):
    return f"My culos {index + 1}"


if __name__ == "__main__":
    for i in range(10):
        print(run_culo(i))
        time.sleep(1)
