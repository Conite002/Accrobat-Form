#!C\Python312\python.exe


import cgi

# Get form data
form = cgi.FieldStorage()

# Retrieve values from the form
text1 = form.getvalue('Text1 2')
nature = form.getvalue('Nature de l’établissement de rattachement 2')

print(f'text1  = {text1}')
print(f'nature  = {nature}')
