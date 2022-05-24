import os


def changePath(route):
    
    try:
        os.chdir(os.getcwd() + route)
    except FileNotFoundError:
        pass
