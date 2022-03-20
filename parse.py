import json 

openStorage = open('dataStorage.json','r')
openUser = open('studentInfo.json',"r")

storageData = json.load(openStorage)
userData = json.load(openUser)


openUser.close()

internshipData = storageData['internship']
interestData = storageData['interest']

print(internshipData)

for user in userData:
    for uIntern in user['internship']:
        if uIntern not in internshipData:
            internshipData.append(uIntern)
    for uInterest in user['interest']:
        if uInterest not in interestData:
            interestData.append(uInterest)

internshipData.sort()
interestData.sort() 

storageData['internship'] = internshipData
storageData['interest'] = interestData

openStorage = open('dataStorage.json','w+')
openStorage.write(json.dumps(storageData))
openStorage.close()