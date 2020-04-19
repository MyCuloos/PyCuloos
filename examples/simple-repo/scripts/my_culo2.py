import time
import sys


def run_culo(index):
    return f"My culos NEW {index + 1}"


if __name__ == "__main__":
    for i in range(5):
        print(run_culo(i))
        time.sleep(0.5)
