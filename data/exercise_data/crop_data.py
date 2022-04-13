import os

directory = 'backend/data/exercise_data/done/'
print(directory)
destination_file = open('backend/data/exercise_data/done/db_objects.txt', 'w')

for file in os.listdir(directory):
     filename = os.fsdecode(file)
     if filename.endswith(".log"): 
        file1 = open(directory+filename, 'r')
        Line = file1.readlines()[11]
        start = Line.find('{')
        string = Line[start::]
        file1.close()
        destination_file.write(string)

 
# Strips the newline character

