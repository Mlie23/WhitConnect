import json 

openStorage = open('storedInfo.json','r')
openUser = open('users.json',"r")

storageData = json.load(openStorage)
userData = json.load(openUser)


openUser.close()

internshipData = storageData['Internship']
interestData = storageData['Interest']

print(internshipData)

for user in userData:
    for uIntern in user['Internship']:
        if uIntern not in internshipData:
            internshipData.append(uIntern)
    for uInterest in user['Interest']:
        if uInterest not in interestData:
            interestData.append(uInterest)

internshipData.sort()
interestData.sort() 

storageData['Internship'] = internshipData
storageData['Interest'] = interestData

openStorage = open('storedInfo.json','w+')
openStorage.write(json.dumps(storageData))
openStorage.close()