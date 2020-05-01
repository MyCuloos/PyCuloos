import time
import sys


def run_culo(index, path, name):
    return f"My culos {index + 1} - {path} {name} !!!!!!!!"


if __name__ == "__main__":
    _, cycles, path, *other = sys.argv
    name = sys.argv[3] if len(sys.argv) > 3 else ""
    for i in range(int(cycles)):
        print(run_culo(i, path, name))
        time.sleep(0.2)
