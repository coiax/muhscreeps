predef = ''

first = True
with open('globals') as f:
    for line in f:
        if not first:
            predef += ","
        first = False
        predef += line.strip()

print(predef)
