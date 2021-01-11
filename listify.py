from collections import defaultdict
import json

with open("wordlist.txt", "r") as reader:
	wordlist = reader.readlines()
	my_dict = defaultdict(list)
	key = None

	for word in wordlist:
		if key == None:
			key = word.strip("\n")
		if word == "\n":
			key = None
			continue
		my_dict[key].append(word.strip('\n'))

with open("wordlist.json", "w") as file:
	json.dump(my_dict, file)
with open("keylist.json", "w") as file:
	keylist = {"keys": list(my_dict.keys())}
	#print(keylist)
	json.dump(keylist, file)

#print(my_dict) 

