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
