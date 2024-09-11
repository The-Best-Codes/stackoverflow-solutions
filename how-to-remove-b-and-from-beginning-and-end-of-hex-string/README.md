## Solution:

Here's your first code:

```py
import binascii
isgdtxt = open(r"ISGD.txt", "w")
filename = input("Paste the file name here:")
with open(filename, "rb") as f:
    isgdfile = f.read()
prin = binascii.hexlify(isgdfile)
isgdtxt.write(str(prin))
isgdtxt.close()
```

The `b'` at the beginning and `'` at the end are there because `binascii.hexlify` returns a bytes object, and when you convert it to a string using `str()`, it includes those markers to indicate it's a bytes object.

To remove the `b'` and `'`, decode the bytes object to a string first, using the `.decode('utf-8')` method.

Here is your updated code:

```py
import binascii

# Open the output file in write mode
isgdtxt = open(r"ISGD.txt", "w")

# Get the filename from user input
filename = input("Paste the file name here:")

# Open the input file in binary read mode
with open(filename, "rb") as f:
    isgdfile = f.read()

# Convert the file content to hex
prin = binascii.hexlify(isgdfile)

# Decode the bytes object to a string
hex_string = prin.decode('utf-8')

# Write the hex string to the output file
isgdtxt.write(hex_string)

# Close the output file
isgdtxt.close()
```

## References:

**binascii:** https://docs.python.org/3/library/binascii.html
