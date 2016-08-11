import json

def jslint():
    predef = ''

    first = True
    with open('globals') as f:
        for line in f:
            if not first:
                predef += ","
            first = False
            predef += line.strip()

    print(predef)

def jshint():
    with open('globals') as f:
        L = []
        for line in f:
            L.append(line.strip())
        print(json.dumps(L))
