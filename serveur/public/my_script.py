# script.py
import sys
import json

arg1 = sys.argv[1]

# Process the arguments (you can replace this with your logic)
result = {'arg1': arg1}

# Print the result as JSON
print(json.dumps(result))

print("Content-type: text/html\r\n\r\n")
print("<html><body>")
print("<h1>XFDF Data Received:</h1>")
print("<p>Processing complete!</p>")
print("</body></html>")